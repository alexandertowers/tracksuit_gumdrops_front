export interface AnalyzeData {
    terms: Array<[string, number]>;
}

export interface SentimentData {
    sentiment_proportions: {
        positive: number;
        neutral: number;
        negative: number;
    };
}

export interface LLMData {
    summary: {
        content: string;
    };
}

export interface LlmRequest {
    terms: Array<[string, number]>
    sentiment: {
      positive: number
      neutral: number
      negative: number
    }
  }
  