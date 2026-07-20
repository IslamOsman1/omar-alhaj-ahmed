import { MONGODB_DB_NAME, getCollection } from './_lib/mongo.js'

export default async function handler(_req, res) {
  try {
    await getCollection()
    return res.status(200).json({ ok: true, database: MONGODB_DB_NAME })
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message })
  }
}
