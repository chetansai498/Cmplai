import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt } = req.body

  try {
    const response = await fetch("http://65.1.84.196:8080/completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from model server" })
  }
}
