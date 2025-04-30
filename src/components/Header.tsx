import { Link, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">PDFMaster</span>
          </Link>
          
          {!isHome && (
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              All Tools
            </Link>
          )}
          
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign Up Free
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;