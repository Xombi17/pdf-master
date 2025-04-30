import { DivideIcon as LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color: string;
}

const ToolCard = ({ title, description, icon: Icon, to, color }: ToolCardProps) => {
  return (
    <Link 
      to={to}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 flex flex-col h-full"
    >
      <div className={`${color} p-6 flex justify-center`}>
        <Icon size={48} className="text-white" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default ToolCard;