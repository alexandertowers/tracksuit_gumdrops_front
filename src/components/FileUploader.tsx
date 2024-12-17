import React from 'react'
import { Button } from "../components/ui/button"

interface FileUploaderProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  isLoading: boolean;
}

export function FileUploader({ onFileChange, onUpload, isLoading }: FileUploaderProps) {
  return (
    <div className="p-4 border-2 border-dashed border-[#8979bf] rounded-xl flex flex-col items-center justify-center w-full">
      <input type="file" onChange={onFileChange} className="mb-2" />
      <Button onClick={onUpload}>
        {isLoading ? 'Analyzing...' : 'Upload & Analyze'}
      </Button>
    </div>
  )
}
