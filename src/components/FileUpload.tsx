import React, { useCallback, useRef } from 'react';
import { useFiles } from '../context/FileContext';
import { Upload, File, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  title: string;
  subtitle: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = 'application/pdf',
  multiple = true,
  maxSize = 10,
  title,
  subtitle,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addFiles } = useFiles();
  const [error, setError] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  
  const handleFileChange = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      
      // Convert FileList to array for processing
      const fileArray = Array.from(files);
      
      // Validate file size
      const oversizedFiles = fileArray.filter(file => file.size > maxSize * 1024 * 1024);
      
      if (oversizedFiles.length > 0) {
        setError(`Some files exceed the ${maxSize}MB limit.`);
        return;
      }
      
      // Check file types if accept is specified
      if (accept !== '*') {
        const acceptedTypes = accept.split(',').map(type => type.trim());
        const invalidFiles = fileArray.filter(file => 
          !acceptedTypes.some(type => {
            // Handle wildcards like 'image/*'
            if (type.endsWith('/*')) {
              const category = type.split('/')[0];
              return file.type.startsWith(`${category}/`);
            }
            return file.type === type;
          })
        );
        
        if (invalidFiles.length > 0) {
          setError('Some files have invalid format.');
          return;
        }
      }
      
      setError(null);
      addFiles(fileArray);
    },
    [addFiles, accept, maxSize]
  );
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);
  
  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={e => handleFileChange(e.target.files)}
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        {isDragging ? (
          <File className="h-16 w-16 text-blue-500" />
        ) : (
          <Upload className="h-16 w-16 text-blue-500" />
        )}
        
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>
        
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Choose Files
        </button>
        
        {error && (
          <div className="flex items-center text-red-500 mt-2">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;