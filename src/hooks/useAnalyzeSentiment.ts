import { useMutation } from '@tanstack/react-query'
import { SentimentData } from '../../types'

async function analyzeSentiment(file: File): Promise<SentimentData> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('http://127.0.0.1:8000/sentiment', {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) {
    throw new Error('Failed to analyze sentiment')
  }

  return response.json() as Promise<SentimentData>
}

export function useAnalyzeSentiment() {
  return useMutation<SentimentData, Error, File>(
    {mutationFn: analyzeSentiment}
  )
}
