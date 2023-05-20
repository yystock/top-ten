'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label
}) => {
  return ( 
    <div 
      onClick={onClick} 
      className="
        px-4 
        py-3 
        hover:bg-slate-300
        transition
        font-semibold
        
        dark:text-slate-100
      "
    >
      {label}
    </div>
   );
}
 
export default MenuItem;