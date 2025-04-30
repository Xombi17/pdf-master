import React from 'react';
import ToolCard from '../components/ToolCard';
import { Combine, Scissors, FileDown, FileUp } from 'lucide-react';

const Home: React.FC = () => {
  const tools = [
    {
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into a single document.',
      icon: Combine,
      to: '/merge-pdf',
      color: 'bg-blue-600',
    },
    {
      title: 'Split PDF',
      description: 'Separate PDF pages into individual documents.',
      icon: Scissors,
      to: '/split-pdf',
      color: 'bg-indigo-600',
    },
    {
      title: 'Compress PDF',
      description: 'Reduce file size while preserving quality.',
      icon: FileDown,
      to: '/compress-pdf',
      color: 'bg-green-600',
    },
    {
      title: 'Convert PDF',
      description: 'Convert PDFs to different formats and vice versa.',
      icon: FileUp,
      to: '/convert-pdf',
      color: 'bg-purple-600',
    },
  ];

  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Your Complete PDF Solution
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Edit, convert, merge and split PDF files with ease. Free, secure and entirely online.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </section>

      <section className="bg-blue-50 rounded-xl p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Why Choose PDFMaster?</h2>
          <p className="text-gray-600">Simple, secure, and feature-rich PDF tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">100% Secure</h3>
            <p className="text-gray-600 text-center">
              Your files are encrypted in transit and automatically deleted after processing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 6v16h-7V6ZM16 16H1V1h15Z" />
                <path d="M16 16v5l-4-4-4 4v-5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Works Anywhere</h3>
            <p className="text-gray-600 text-center">
              Our cloud-based tools work on any platform, no downloads required.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13.8 22H5a2 2 0 0 1-2-2V10c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v5" />
                <path d="M22 19.5V19a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v.5" />
                <path d="M7 10V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6" />
                <path d="M18.1 19.5h3.8a.6.6 0 0 0 .6-.6v-.9a.6.6 0 0 0-.6-.6h-3.8a.6.6 0 0 0-.6.6v.9a.6.6 0 0 0 .6.6Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Free to Use</h3>
            <p className="text-gray-600 text-center">
              Most of our tools are free to use for basic needs, with premium options available.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;