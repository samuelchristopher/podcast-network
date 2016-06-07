const podcastController = {}

let db;

podcastController.handleGet = async function (req, res, next) {
  db = req.app.get('database')
  const obj = await db.collection('podcasts').find({}).toArray()
  res.json({podcasts: obj})
  next()
}

podcastController.handlePost = function (req, res, next) {
  db = req.app.get('database')
  const { title, author, url, date, imgUrl, slug } = req.body
  db.collection('podcasts').insertOne({
    slug,
    url,
    date,
    imgUrl,
    author,
    title
  })

  res.status(201).json({ createdPodcastSlug: slug })
  next()
}

podcastController.findPodcast = async function (req, res, next) {
  db = req.app.get('database')
  const { podcastSlug: slug } = req.params
  let podcast = await db.collection('podcasts').findOne({ slug })
  res.json({ podcast })
  next()
}

export default podcastController
