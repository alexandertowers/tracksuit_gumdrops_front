import React, { useEffect, useState } from 'react'
import { useAnalyzeFile } from './hooks/useAnalyzeFile'
import Navbar from './components/Navbar'
import { BarchartComponent } from './components/charts/BarchartComponent'
import PlaceHolder from './components/PlaceHolder'
import { useAnalyzeSentiment } from './hooks/useAnalyzeSentiment'
import { DonutchartComponent } from './components/charts/DonutChartComponent'
import { useAnalyzeLLM } from './hooks/useAnalyzeWithLLM'
import { FileUploader } from './components/FileUploader'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { mutate: analyzeMutate, data: analyzeData, isPending: analyzeLoading, isError: analyzeError, error } = useAnalyzeFile()
  const { mutate: sentimentMutate, data: sentimentData, isPending: sentimentLoading, isError: sentimentError } = useAnalyzeSentiment()
  const { mutate: llmMutate, data: llmData, isPending: llmLoading, isError: llmError, isError: llmErrorMsg } = useAnalyzeLLM()

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      analyzeMutate(selectedFile)
      sentimentMutate(selectedFile)
    }
  }

  useEffect(() => {
    if (analyzeData && sentimentData) {
      llmMutate({
        terms: analyzeData.terms,
        sentiment: sentimentData.sentiment_proportions
      })
    }
  }, [analyzeData, sentimentData, llmMutate])

  return (
    <>
      <Navbar/>
      <div className="flex flex-col m-5 p-5 space-y-5">
        <FileUploader 
          onFileChange={handleFileChange} 
          onUpload={handleUpload} 
          isLoading={analyzeLoading} 
        />
        <div className="flex flex-row justify-center items-center space-x-5">
          <div className="rounded-xl bg-tracksuitPurpleLight w-full p-5">
            
            <h2 className="text-2xl font-semibold text-tracksuitPurpleDark mb-2">Your Tracksuit Gumdrop</h2>
            {llmError && <div className="text-red-600">Error: {String(llmErrorMsg)}</div>}
            {
            llmData ? (
              <div className="whitespace-pre-wrap">
                {llmData.summary.content}
              </div>
            ) : (
              <PlaceHolder text={llmLoading ? "Analyzing..." : "Upload a file for insights" } color="#8979bf"/>
            )  
            }
          </div>
        </div>
        <div className="flex flex-row justify-center items-center space-x-5">
        <div className="rounded-xl bg-tracksuitPurpleLight w-full p-5">
          <h2 className="text-2xl font-semibold text-tracksuitPurpleDark mb-2">Topics</h2>
          <div className="flex flex-row justify-center items-center space-x-20 w-full h-96">
            {analyzeError && <div className="text-red-600">Error: {String(error)}</div>}
            {
              analyzeData ? (
                <BarchartComponent data={analyzeData.terms}/>   
              ) :
              <PlaceHolder text={analyzeLoading ? "Analyzing..." : "Upload a file for insights"} color="#8979bf"/>
            }
          </div>
        </div>
          <div className="flex flex-col rounded-xl bg-[#d0eedb] h-full w-full p-5">
            <h2 className="text-2xl font-semibold text-tracksuitGreenDark mb-2">Sentiment</h2>
            <div className="flex flex-row justify-center items-center space-x-20 w-full h-96">
              {sentimentError && <div className="text-red-600">Error: {String(sentimentError)}</div>}
            {sentimentData ? (
              <div className="text-tracksuitGreenDark">
                {sentimentData.sentiment_proportions.positive > sentimentData.sentiment_proportions.negative ? (
                  <h3 className="text-xl font-semibold text-tracksuitGreenDark">Overall Positive Sentiment</h3>
                ) : (
                  <h3 className="text-xl font-semibold text-tracksuitGreenDark">Overall Negative Sentiment</h3>
                )}
                <DonutchartComponent 
                  data={[
                    { key: "positive", value: sentimentData.sentiment_proportions.positive },
                    { key: "neutral", value: sentimentData.sentiment_proportions.neutral },
                    { key: "negative", value: sentimentData.sentiment_proportions.negative }
                  ]}
                />
              <div>
              </div>
              </div>
            ) : (
              <PlaceHolder text={sentimentLoading? "Analyzing..." : "Upload a file for sentiment breakdown"} color="#2c7873"/>
            )}
            </div>
          </div>
        </div>
      </div>

      
    </>
  )
}

export default App
