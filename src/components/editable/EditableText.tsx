import React from 'react';
import { useSiteEditor } from '../../context/SiteEditorContext';
import { Edit2, Check, X } from 'lucide-react';

interface EditableTextProps {
  path: string;
  value: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  path, 
  value, 
  className = '', 
  as: Component = 'span' 
}) => {
  const { isEditMode, updateData } = useSiteEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  if (!isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  const handleSave = () => {
    updateData(path, tempValue);
    setIsEditing(false);
  };

  return (
    <div className={`relative group ${className}`}>
      {isEditing ? (
        <div className="flex items-center gap-2 w-full">
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="flex-1 p-1 bg-white border border-caramel rounded shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-caramel"
            rows={tempValue.includes('\n') ? 3 : 1}
            autoFocus
          />
          <div className="flex flex-col gap-1">
            <button onClick={handleSave} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 shadow-sm"><Check size={14} /></button>
            <button onClick={() => setIsEditing(false)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 shadow-sm"><X size={14} /></button>
          </div>
        </div>
      ) : (
        <div className="relative inline-block w-full">
          <Component className="w-full">{value}</Component>
          <button onClick={() => setIsEditing(true)} className="absolute -top-4 -right-4 p-1.5 bg-caramel text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"><Edit2 size={12} /></button>
        </div>
      )}
    </div>
  );
};