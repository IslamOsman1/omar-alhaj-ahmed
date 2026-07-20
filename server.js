import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import { defaultData } from './src/data.js'

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'omar_logistics'
const COLLECTION_NAME = 'site_content'
const DOCUMENT_ID = 'main'

app.use(cors())
app.use(express.json({ limit: '10mb' }))

let clientPromise

function getClient() {
  if (!clientPromise) {
    const client = new MongoClient(MONGODB_URI)
    clientPromise = client.connect()
  }
  return clientPromise
}

async function getCollection() {
  const client = await getClient()
  return client.db(MONGODB_DB_NAME).collection(COLLECTION_NAME)
}

async function ensureDocument() {
  const collection = await getCollection()
  const existing = await collection.findOne({ _id: DOCUMENT_ID })
  if (!existing) {
    await collection.insertOne({
      _id: DOCUMENT_ID,
      data: defaultData,
      updatedAt: new Date()
    })
    return defaultData
  }
  return existing.data
}

app.get('/api/health', async (_req, res) => {
  try {
    await getClient()
    res.json({ ok: true, database: MONGODB_DB_NAME })
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

app.get('/api/site-data', async (_req, res) => {
  try {
    const data = await ensureDocument()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/api/site-data', async (req, res) => {
  try {
    const collection = await getCollection()
    const data = req.body
    await collection.updateOne(
      { _id: DOCUMENT_ID },
      {
        $set: {
          data,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Mongo API running on http://localhost:${PORT}`)
})
