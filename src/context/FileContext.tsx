import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface FileObject {
  id: string;
  file: File;
  preview?: string;
}

interface FileContextType {
  files: FileObject[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  reorderFiles: (startIndex: number, endIndex: number) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const addFiles = (newFiles: File[]) => {
    const fileObjects = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));
    setFiles((prevFiles) => [...prevFiles, ...fileObjects]);
  };

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const clearFiles = () => {
    // Clean up any object URLs to prevent memory leaks
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
  };

  const reorderFiles = (startIndex: number, endIndex: number) => {
    const result = Array.from(files);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setFiles(result);
  };

  return (
    <FileContext.Provider
      value={{
        files,
        addFiles,
        removeFile,
        clearFiles,
        reorderFiles,
        isProcessing,
        setIsProcessing,
        progress,
        setProgress,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = (): FileContextType => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};