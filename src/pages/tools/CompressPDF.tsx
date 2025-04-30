import React, { useState, useEffect } from 'react';
import { useFiles } from '../../context/FileContext';
import FileUpload from '../../components/FileUpload';
import FileList from '../../components/FileList';
import ProcessingIndicator from '../../components/ProcessingIndicator';
import { FileDown, Download, RefreshCcw } from 'lucide-react';

const CompressPDF: React.FC = () => {
  const { files, clearFiles, isProcessing, setIsProcessing, setProgress } = useFiles();
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [resultUrl]);
  
  const handleCompress = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file to compress.');
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
      
      // For demo purposes, we'll just create a "compressed" file by using the first file
      // In a real app, you would use a PDF library to actually compress the file
      const firstFile = files[0].file;
      const fakeResultBlob = new Blob([await firstFile.arrayBuffer()], { type: 'application/pdf' });
      const fakeResultUrl = URL.createObjectURL(fakeResultBlob);
      
      setResultUrl(fakeResultUrl);
      setIsProcessing(false);
      setProgress(0);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      setIsProcessing(false);
      setProgress(0);
      alert('An error occurred while compressing your PDF. Please try again.');
    }
  };
  
  const handleReset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
    clearFiles();
    setCompressionLevel('medium');
  };
  
  const handleDownload = () => {
    if (!resultUrl) return;
    
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = 'compressed_document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div>
      <ProcessingIndicator />
      
      <div className="mb-8 text-center">
        <FileDown className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Compress PDF</h1>
        <p className="text-gray-600">
          Reduce the size of your PDF files while preserving quality.
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
          <h2 className="text-2xl font-semibold mb-2">PDF Successfully Compressed!</h2>
          <p className="text-gray-600 mb-6">
            Your PDF file has been compressed and is ready for download.
          </p>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Original size:</span>
              <span className="font-medium">{(files[0].file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Compressed size:</span>
              <span className="font-medium">{(files[0].file.size * 0.7 / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Reduction:</span>
              <span className="font-medium text-green-600">30%</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RefreshCcw className="h-5 w-5 mr-2" />
              Compress Another PDF
            </button>
          </div>
        </div>
      ) : (
        <>
          <FileUpload
            accept="application/pdf"
            multiple={false}
            title="Upload PDF File"
            subtitle="Select a PDF file you want to compress"
          />
          
          <FileList />
          
          {files.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Compression Options</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="compress-low"
                    name="compression-level"
                    className="mt-1"
                    checked={compressionLevel === 'low'}
                    onChange={() => setCompressionLevel('low')}
                  />
                  <label htmlFor="compress-low" className="ml-3">
                    <div className="font-medium">Low Compression</div>
                    <div className="text-sm text-gray-600">
                      Minimal reduction with highest quality.
                    </div>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="compress-medium"
                    name="compression-level"
                    className="mt-1"
                    checked={compressionLevel === 'medium'}
                    onChange={() => setCompressionLevel('medium')}
                  />
                  <label htmlFor="compress-medium" className="ml-3">
                    <div className="font-medium">Medium Compression (Recommended)</div>
                    <div className="text-sm text-gray-600">
                      Good balance between quality and file size.
                    </div>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="compress-high"
                    name="compression-level"
                    className="mt-1"
                    checked={compressionLevel === 'high'}
                    onChange={() => setCompressionLevel('high')}
                  />
                  <label htmlFor="compress-high" className="ml-3">
                    <div className="font-medium">High Compression</div>
                    <div className="text-sm text-gray-600">
                      Maximum size reduction with acceptable quality.
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className={`px-6 py-3 flex items-center rounded-md ${
                    isProcessing
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white transition-colors`}
                >
                  <FileDown className="h-5 w-5 mr-2" />
                  Compress PDF
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">How to Compress PDF Files</h3>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Upload the PDF file you want to compress.</li>
                <li>Choose your preferred compression level.</li>
                <li>Click "Compress PDF" to process your file.</li>
                <li>Compare the original and compressed file sizes.</li>
                <li>Download your compressed PDF.</li>
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompressPDF;