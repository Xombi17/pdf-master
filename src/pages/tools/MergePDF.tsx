import React, { useEffect, useState } from 'react';
import { useFiles } from '../../context/FileContext';
import FileUpload from '../../components/FileUpload';
import FileList from '../../components/FileList';
import ProcessingIndicator from '../../components/ProcessingIndicator';
import { Combine, Download, RefreshCcw } from 'lucide-react';
import { mergePDFs, downloadPDF } from '../../utils/pdfUtils';

const MergePDF: React.FC = () => {
  const { files, clearFiles, isProcessing, setIsProcessing, setProgress } = useFiles();
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  
  useEffect(() => {
    return () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [resultUrl]);
  
  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files to merge.');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const fileObjects = files.map(f => f.file);
      let progress = 0;
      const progressStep = 100 / fileObjects.length;
      
      setProgress(progress);
      const mergedPdfBytes = await mergePDFs(fileObjects);
      
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResultUrl(url);
      setIsProcessing(false);
      setProgress(100);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      setIsProcessing(false);
      setProgress(0);
      alert('An error occurred while merging your PDFs. Please try again.');
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
    
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = 'merged_document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div>
      <ProcessingIndicator />
      
      <div className="mb-8 text-center">
        <Combine className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Merge PDF</h1>
        <p className="text-gray-600">
          Combine multiple PDF files into a single document. Arrange them in any order.
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
          <h2 className="text-2xl font-semibold mb-2">PDF Successfully Merged!</h2>
          <p className="text-gray-600 mb-6">
            Your files have been combined into a single PDF document.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RefreshCcw className="h-5 w-5 mr-2" />
              Merge New Files
            </button>
          </div>
        </div>
      ) : (
        <>
          <FileUpload
            accept="application/pdf"
            multiple={true}
            title="Upload PDF Files"
            subtitle="Drag and drop PDF files here or click to browse"
          />
          
          <FileList />
          
          {files.length > 0 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleMerge}
                disabled={files.length < 2 || isProcessing}
                className={`px-6 py-3 flex items-center rounded-md ${
                  files.length < 2 || isProcessing
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors`}
              >
                <Combine className="h-5 w-5 mr-2" />
                Merge {files.length} PDF Files
              </button>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">How to Merge PDF Files</h3>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Upload two or more PDF files that you want to combine.</li>
                <li>Rearrange the files in the desired order by using the up and down arrows.</li>
                <li>Click "Merge PDF Files" to combine them into a single document.</li>
                <li>Download your merged PDF.</li>
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MergePDF;