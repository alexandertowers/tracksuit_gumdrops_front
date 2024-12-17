import { useMutation } from '@tanstack/react-query'
import { LlmRequest, LLMData } from '../../types'


async function analyzeWithLLM(data: LlmRequest): Promise<LLMData> {
  const response = await fetch('http://127.0.0.1:8000/llm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Failed to analyze with LLM')
  }
  return response.json() as Promise<LLMData>
}

export function useAnalyzeLLM() {
  return useMutation<LLMData, Error, LlmRequest>(
    {
      mutationFn: (data: LlmRequest) => analyzeWithLLM(data)
    }
  )
}
