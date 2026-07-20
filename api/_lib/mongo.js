import { MongoClient } from 'mongodb'
import { defaultData } from '../../src/data.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'omar_logistics'
const COLLECTION_NAME = 'site_content'
const DOCUMENT_ID = 'main'

let clientPromise

function getClient() {
  if (!clientPromise) {
    const client = new MongoClient(MONGODB_URI)
    clientPromise = client.connect()
  }
  return clientPromise
}

export async function getCollection() {
  const client = await getClient()
  return client.db(MONGODB_DB_NAME).collection(COLLECTION_NAME)
}

export async function ensureDocument() {
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

export async function saveDocument(data) {
  const collection = await getCollection()
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
}

export { MONGODB_DB_NAME }
