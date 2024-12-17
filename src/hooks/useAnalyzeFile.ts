import { useMutation } from '@tanstack/react-query'
import { AnalyzeData } from '../../types'

async function analyzeFile(file: File): Promise<AnalyzeData> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('http://127.0.0.1:8000/analyze', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to analyze file')
  }

  return response.json() as Promise<AnalyzeData>
}

export function useAnalyzeFile(
) {
  return useMutation<AnalyzeData, Error, File>({
    mutationFn: analyzeFile,
  })
}