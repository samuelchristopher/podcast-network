import express from 'express'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import podcastController from './controllers/podcastController'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import path from 'path'

let compiler = webpack({
  entry: [ 'babel-polyfill', path.join(__dirname, '../js/app.js')],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      }
    ]
  },
  output: {filename: 'app.js', path: '/'}
});

let front = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/js/',
  stats: {colors: true}
});
front.use(express.static('public'));

(async function () {
  try {
    const MONGO_URL = process.env.MONGO_URL
    let db = await MongoClient.connect(MONGO_URL)
    const app = express()
    const APP_PORT = process.env.PORT || 3000

    app.set('database', db)
    app.use(bodyParser.json())
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
      res.header('Access-Control-Allow-Headers', 'Content-Type')
      next()
    })

    app.get('/api/all-podcasts', podcastController.handleGet)
    app.post('/api/podcast', podcastController.handlePost)
    app.get('/api/podcast/:podcastSlug', podcastController.findPodcast)

    front.listen(8080, () => {
      console.log('Listening on port 8080, front')
    })

    app.listen(APP_PORT, () => {
      console.log(`Listening on port ${APP_PORT}`)
    })

  } catch(err) {
    console.log(`an error occured: ${err}`)
  }
})()
