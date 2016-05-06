import express from 'express'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import podcastController from './controllers/podcastController'

(async function () {
  try {
    const MONGO_URL = process.env.MONGO_URL
    let db = await MongoClient.connect(MONGO_URL)
    const app = express()
    const APP_PORT = process.env.PORT || 3000

    app.set('database', db)
    app.use(bodyParser.json())

    app.get('/api/all-podcasts', podcastController.handleGet)
    app.post('/api/podcast', podcastController.handlePost)
    app.get('/api/podcast/:podcastSlug', podcastController.findPodcast)

    app.listen(APP_PORT, () => {
      console.log(`Listening on port ${APP_PORT}`)
    })
  } catch(err) {
    console.log(`an error occured: ${err}`)
  }
})()
