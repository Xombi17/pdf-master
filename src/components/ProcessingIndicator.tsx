import React from 'react';
import { useFiles } from '../context/FileContext';
import { Loader2 } from 'lucide-react';

const ProcessingIndicator: React.FC = () => {
  const { isProcessing, progress } = useFiles();
  
  if (!isProcessing) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
          <h3 className="text-lg font-medium mb-2">Processing Your Files</h3>
          <p className="text-gray-600 mb-4 text-center">
            Please wait while we process your PDF files. This may take a moment.
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{progress}% Complete</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;