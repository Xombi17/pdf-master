import React, { useState, useEffect } from 'react';
import { useFiles } from '../../context/FileContext';
import FileUpload from '../../components/FileUpload';
import FileList from '../../components/FileList';
import ProcessingIndicator from '../../components/ProcessingIndicator';
import { Scissors, Download, RefreshCcw } from 'lucide-react';

const SplitPDF: React.FC = () => {
  const { files, clearFiles, isProcessing, setIsProcessing, setProgress } = useFiles();
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [splitOption, setSplitOption] = useState<'all' | 'range' | 'extract'>('all');
  const [pageRange, setPageRange] = useState<string>('');
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [resultUrl]);
  
  const handleSplit = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file to split.');
      return;
    }
    
    // Validate page range if applicable
    if (splitOption !== 'all' && !pageRange.trim()) {
      alert('Please specify page numbers.');
      return;
    }
    
    // In a real app, we would send the file to a backend service
    // For demonstration, we'll simulate processing
    setIsProcessing(true);
    
    try {
      // Simulate processing time with progress updates
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setProgress(i);
      }
      
      // For demo purposes, we'll just create a "split" file ZIP by using the first file
      // In a real app, you would use a PDF library to actually split the file
      const firstFile = files[0].file;
      const fakeResultBlob = new Blob([await firstFile.arrayBuffer()], { type: 'application/pdf' });
      const fakeResultUrl = URL.createObjectURL(fakeResultBlob);
      
      setResultUrl(fakeResultUrl);
      setIsProcessing(false);
      setProgress(0);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      setIsProcessing(false);
      setProgress(0);
      alert('An error occurred while splitting your PDF. Please try again.');
    }
  };
  
  const handleReset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }
    clearFiles();
    setSplitOption('all');
    setPageRange('');
  };
  
  const handleDownload = () => {
    if (!resultUrl) return;
    
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = 'split_pages.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div>
      <ProcessingIndicator />
      
      <div className="mb-8 text-center">
        <Scissors className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Split PDF</h1>
        <p className="text-gray-600">
          Extract pages from your PDF or split it into multiple documents.
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
          <h2 className="text-2xl font-semibold mb-2">PDF Successfully Split!</h2>
          <p className="text-gray-600 mb-6">
            Your PDF has been split according to your preferences.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download ZIP
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RefreshCcw className="h-5 w-5 mr-2" />
              Split Another PDF
            </button>
          </div>
        </div>
      ) : (
        <>
          <FileUpload
            accept="application/pdf"
            multiple={false}
            title="Upload PDF File"
            subtitle="Select a PDF file you want to split"
          />
          
          <FileList />
          
          {files.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Split Options</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="split-all"
                    name="split-option"
                    className="mt-1"
                    checked={splitOption === 'all'}
                    onChange={() => setSplitOption('all')}
                  />
                  <label htmlFor="split-all" className="ml-3">
                    <div className="font-medium">Split into separate pages</div>
                    <div className="text-sm text-gray-600">
                      Each page will become a separate PDF file.
                    </div>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="split-range"
                    name="split-option"
                    className="mt-1"
                    checked={splitOption === 'range'}
                    onChange={() => setSplitOption('range')}
                  />
                  <label htmlFor="split-range" className="ml-3">
                    <div className="font-medium">Split by page ranges</div>
                    <div className="text-sm text-gray-600">
                      Divide the document into custom ranges (e.g., 1-5, 6-10).
                    </div>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="split-extract"
                    name="split-option"
                    className="mt-1"
                    checked={splitOption === 'extract'}
                    onChange={() => setSplitOption('extract')}
                  />
                  <label htmlFor="split-extract" className="ml-3">
                    <div className="font-medium">Extract specific pages</div>
                    <div className="text-sm text-gray-600">
                      Extract individual pages (e.g., 1, 3, 5-7).
                    </div>
                  </label>
                </div>
                
                {splitOption !== 'all' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {splitOption === 'range' ? 'Page Ranges' : 'Pages to Extract'}
                    </label>
                    <input
                      type="text"
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                      placeholder={splitOption === 'range' ? 'e.g., 1-3, 4-8' : 'e.g., 1, 3, 5-7'}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {splitOption === 'range'
                        ? 'Separate ranges with commas. Each range will create one PDF.'
                        : 'Separate page numbers with commas. Ranges like 5-7 are supported.'}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSplit}
                  disabled={isProcessing}
                  className={`px-6 py-3 flex items-center rounded-md ${
                    isProcessing
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white transition-colors`}
                >
                  <Scissors className="h-5 w-5 mr-2" />
                  Split PDF
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">How to Split PDF Files</h3>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Upload the PDF file you want to split.</li>
                <li>Choose your preferred splitting method.</li>
                <li>If necessary, specify page numbers or ranges.</li>
                <li>Click "Split PDF" to process your file.</li>
                <li>Download the resulting files in a ZIP archive.</li>
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SplitPDF;