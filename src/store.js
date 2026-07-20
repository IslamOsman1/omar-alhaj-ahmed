import { defaultData } from './data'

const KEY = 'omar-logistics-data-v1'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const SITE_DATA_URL = `${API_BASE_URL}/api/site-data`

export function getData() {
  try { return JSON.parse(localStorage.getItem(KEY)) || defaultData } catch { return defaultData }
}

export function saveData(data) { localStorage.setItem(KEY, JSON.stringify(data)) }
export function resetData() { localStorage.setItem(KEY, JSON.stringify(defaultData)); return defaultData }

export async function fetchRemoteData() {
  try {
    const response = await fetch(SITE_DATA_URL)
    if (!response.ok) throw new Error('Failed to load remote data')
    const data = await response.json()
    saveData(data)
    return data
  } catch {
    return getData()
  }
}

export async function saveRemoteData(data) {
  saveData(data)
  try {
    await fetch(SITE_DATA_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } catch {}
}

export async function resetRemoteData() {
  const data = resetData()
  await saveRemoteData(data)
  return data
}
