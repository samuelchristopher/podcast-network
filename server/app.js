import express from 'express'
import { MongoClient } from 'mongodb'


async function connect () {
  const MONGO_URL = process.env.MONGO_URL
  await MongoClient.connect(MONGO_URL, (err, db) => {
    console.log('Connected to server')
  })
}

(async function () {
  await connect()

  const app = express()
  const APP_PORT = process.env.PORT || 3000
  
  app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`)
  })
})()
