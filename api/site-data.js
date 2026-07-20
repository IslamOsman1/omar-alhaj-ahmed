import { ensureDocument, saveDocument } from './_lib/mongo.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await ensureDocument()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message })
    }
  }

  if (req.method === 'PUT') {
    try {
      await saveDocument(req.body)
      return res.status(200).json({ ok: true })
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message })
    }
  }

  return res.status(405).json({ ok: false, message: 'Method Not Allowed' })
}
