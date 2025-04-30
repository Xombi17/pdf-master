import React, { useState, useEffect } from 'react';
import { useFiles } from '../../context/FileContext';
import FileUpload from '../../components/FileUpload';
import FileList from '../../components/FileList';
import ProcessingIndicator from '../../components/ProcessingIndicator';
import { FileUp, Download, RefreshCcw } from 'lucide-react';

const ConvertPDF: React.FC = () => {
  const { files, clearFiles, isProcessing, setIsProcessing, setProgress } = useFiles();
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [convertDirection, setConvertDirection] = useState<'to-pdf' | 'from-pdf'>('to-pdf');
  const [outputFormat, setOutputFormat] = useState<string>('jpg');
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [resultUrl]);
  
  const handleConvert = async () => {
    if (files.length === 0) {
      alert('Please select a file to convert.');
      return;
    }
    
    // In a real app, we would send the file to a backend service
    // For demonstration, we'll simulate processing
    setIsProcessing(true);
    
    try {
      // Simulate processing time with progress updates
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }
      
      // For demo purposes, we'll just create a "converted" file by using the first file
      // In a real app, you would use a conversion library
      const firstFile = files[0].file;
      const fakeResultBlob = new Blob([await firstFile.arrayBuffer()], { 
        type: convertDirection === 'to-pdf' ? 'application/pdf' : `image/${outputFormat}` 
      });
      const fakeResultUrl = URL.createObjectURL(fakeResultBlob);
      
      setResultUrl(fakeResultUrl);
      setIsProcessing(false);
      setProgress(0);
    } catch (error) {
      console.error('Error converting file:', error);
      setIsProcessing(false);
      setProgress(0);
      alert('An error occurred while converting your file. Please try again.');
    }
  };
  
  const handleReset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
    clearFiles();
  };
  
  const handleDownload = () => {
    if (!resultUrl) return;
    
    const extension = convertDirection === 'to-pdf' ? 'pdf' : outputFormat;
    const filename = `converted.${extension}`;
    
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const getAcceptedFileTypes = () => {
    if (convertDirection === 'to-pdf') {
      return 'image/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';
    } else {
      return 'application/pdf';
    }
  };
  
  return (
    <div>
      <ProcessingIndicator />
      
      <div className="mb-8 text-center">
        <FileUp className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Convert PDF</h1>
        <p className="text-gray-600">
          Convert files to PDF or extract content from PDF to other formats.
        </p>
      </div>
      
      {resultUrl ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="flex items-center justify-center bg-green-100 text-green-600 h-16 w-16 rounded-full mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Conversion Complete!</h2>
          <p className="text-gray-600 mb-6">
            Your file has been successfully converted and is ready for download.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download {convertDirection === 'to-pdf' ? 'PDF' : outputFormat.toUpperCase()}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RefreshCcw className="h-5 w-5 mr-2" />
              Convert Another File
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Conversion Direction</h3>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setConvertDirection('to-pdf')}
                className={`flex-1 p-4 rounded-lg border-2 text-center transition-colors ${
                  convertDirection === 'to-pdf'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="font-medium mb-1">Convert to PDF</div>
                <div className="text-sm text-gray-600">
                  Turn images, documents, or spreadsheets into PDF
                </div>
              </button>
              
              <button
                onClick={() => setConvertDirection('from-pdf')}
                className={`flex-1 p-4 rounded-lg border-2 text-center transition-colors ${
                  convertDirection === 'from-pdf'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="font-medium mb-1">Convert from PDF</div>
                <div className="text-sm text-gray-600">
                  Extract PDF content to other file formats
                </div>
              </button>
            </div>
          </div>
          
          <FileUpload
            accept={getAcceptedFileTypes()}
            multiple={false}
            title={`Upload ${convertDirection === 'to-pdf' ? 'File' : 'PDF'}`}
            subtitle={convertDirection === 'to-pdf' 
              ? 'Select a file to convert to PDF' 
              : 'Select a PDF to convert to another format'
            }
          />
          
          <FileList />
          
          {files.length > 0 && convertDirection === 'from-pdf' && (
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Output Format</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['jpg', 'png', 'txt', 'docx'].map((format) => (
                  <button
                    key={format}
                    onClick={() => setOutputFormat(format)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      outputFormat === format
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-medium uppercase">{format}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {files.length > 0 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className={`px-6 py-3 flex items-center rounded-md ${
                  isProcessing
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white transition-colors`}
              >
                <FileUp className="h-5 w-5 mr-2" />
                {convertDirection === 'to-pdf' ? 'Convert to PDF' : `Convert to ${outputFormat.toUpperCase()}`}
              </button>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Supported Formats</h3>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Convert to PDF</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Images (JPG, PNG, GIF, BMP, TIFF)</li>
                    <li>Microsoft Office (DOC, DOCX, XLS, XLSX, PPT, PPTX)</li>
                    <li>Text files (TXT)</li>
                    <li>And more...</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Convert from PDF</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Images (JPG, PNG)</li>
                    <li>Microsoft Word (DOCX)</li>
                    <li>Text files (TXT)</li>
                    <li>And more...</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConvertPDF;