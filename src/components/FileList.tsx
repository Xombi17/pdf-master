import React from 'react';
import { useFiles, FileObject } from '../context/FileContext';
import { File, X, ChevronUp, ChevronDown } from 'lucide-react';

const FileList: React.FC = () => {
  const { files, removeFile, reorderFiles } = useFiles();
  
  if (files.length === 0) {
    return null;
  }
  
  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderFiles(index, index - 1);
    }
  };
  
  const handleMoveDown = (index: number) => {
    if (index < files.length - 1) {
      reorderFiles(index, index + 1);
    }
  };
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Selected Files ({files.length})</h3>
      <div className="bg-white rounded-lg shadow divide-y">
        {files.map((file, index) => (
          <FileItem
            key={file.id}
            file={file}
            index={index}
            total={files.length}
            onRemove={() => removeFile(file.id)}
            onMoveUp={() => handleMoveUp(index)}
            onMoveDown={() => handleMoveDown(index)}
          />
        ))}
      </div>
    </div>
  );
};

interface FileItemProps {
  file: FileObject;
  index: number;
  total: number;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  index,
  total,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="flex items-center p-4 hover:bg-gray-50">
      <div className="flex-shrink-0">
        <File className="h-8 w-8 text-blue-500" />
      </div>
      <div className="ml-3 flex-grow">
        <p className="font-medium text-gray-900 truncate" title={file.file.name}>
          {file.file.name}
        </p>
        <p className="text-sm text-gray-500">{formatFileSize(file.file.size)}</p>
      </div>
      <div className="flex items-center space-x-2">
        {total > 1 && (
          <div className="flex flex-col">
            <button
              onClick={onMoveUp}
              disabled={index === 0}
              className={`p-1 rounded hover:bg-gray-200 ${
                index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
              }`}
            >
              <ChevronUp size={16} />
            </button>
            <button
              onClick={onMoveDown}
              disabled={index === total - 1}
              className={`p-1 rounded hover:bg-gray-200 ${
                index === total - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
              }`}
            >
              <ChevronDown size={16} />
            </button>
          </div>
        )}
        <button
          onClick={onRemove}
          className="p-1 rounded text-gray-600 hover:bg-gray-200 hover:text-red-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default FileList;