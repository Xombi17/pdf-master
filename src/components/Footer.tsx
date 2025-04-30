import { FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">PDFMaster</span>
            </div>
            <p className="text-sm">
              Your complete solution for working with PDF files online.
              Edit, convert, merge and split PDF files with ease.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">PDF Tools</h3>
            <ul className="space-y-2">
              <li><a href="/merge-pdf" className="hover:text-white transition-colors">Merge PDF</a></li>
              <li><a href="/split-pdf" className="hover:text-white transition-colors">Split PDF</a></li>
              <li><a href="/compress-pdf" className="hover:text-white transition-colors">Compress PDF</a></li>
              <li><a href="/convert-pdf" className="hover:text-white transition-colors">Convert PDF</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} PDFMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;