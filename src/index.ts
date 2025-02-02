/* eslint-disable @typescript-eslint/no-base-to-string */
import { Router } from './router.js'
import { PrismaClient } from '@prisma/client'
import { WebSocketServer } from 'ws'
import { BaseError, InternalServerError } from './domain/entities/errors.js'
import { BuyHandler } from './handlers/buy.handler.js'
import { CategoryRepository } from './infra/category.repository.js'
import { TransactionRepository } from './infra/transaction.repository.js'

function setupRouter(): Router {
  const db = new PrismaClient()
  const categoryRepository = new CategoryRepository(db)
  const transactionRepository = new TransactionRepository(db)

  const buyHandler = new BuyHandler(categoryRepository, transactionRepository)

  const router = new Router()
  router.register('buy', buyHandler)

  return router
}

const PORT = 4000

async function bootstrap(): Promise<void> {
  return new Promise((resolve, reject) => {
    const router = setupRouter()

    const wss = new WebSocketServer({ port: PORT }, () => {
      process.stdout.write(
        `WebSocket server is running on ws://localhost:${PORT}\n`
      )
    })

    wss.on('connection', ws => {
      process.stdout.write('New client connected\n')

      ws.on('message', message => {
        const messageString = message.toString()
        const action = messageString.slice(0, messageString.indexOf('\n'))

        process.stdout.write(`Received: ${messageString}\n`)

        router
          .handle(action, messageString, response => {
            ws.send(response)
          })
          .catch(error => {
            if (error instanceof BaseError) {
              ws.send(error.message)

              return
            }

            ws.send(new InternalServerError().message)
          })
      })

      ws.on('close', () => {
        process.stdout.write('Client disconnected\n')
      })

      ws.on('error', error => {
        console.error(`WebSocket error: ${error}\n`)
      })
    })

    wss.on('error', reject)
    wss.on('close', resolve)
  })
}

bootstrap().catch(console.error)
