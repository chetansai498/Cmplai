import { NextRequest, NextResponse } from 'next/server'

const MODEL = 'gemini-1.5-flash-latest'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body || {}

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const apiKey = 'AIzaSyBJEYyK76IosoofagpsETW9Q_NqjyxLiZ8'
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GOOGLE_GEMINI_API_KEY' }, { status: 500 })
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      throw new Error(`Upstream error ${resp.status}: ${text}`)
    }

    const data = await resp.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      throw new Error('Unexpected response format from Gemini API')
    }

    return NextResponse.json({ success: true, response: text })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}