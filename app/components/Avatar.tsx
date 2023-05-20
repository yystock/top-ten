'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined
  height: number | undefined;
  width: number | undefined;
  bordered?: boolean 
}

const Avatar: React.FC<AvatarProps> = ({ src, height, width, bordered }) => {
  return ( 
    <Image 
      className={`rounded-full ${bordered? "border-2": "border-0"}`}
      height={height} 
      width={width} 
      alt="Avatar" 
      src={src || '/images/placeholder.jpg'}
      
    />
   );
}
 
export default Avatar;