'use client';

import Image from 'next/image';

interface CuteDividerProps {
  src?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function CuteDivider({ 
  src = "/cute-divider.png",
  width = 250, 
  height = 250,
  className = "" 
}: CuteDividerProps) {
  return (
    <div className={`flex items-center justify-center w-full py-16 bg-transparent overflow-visible ${className}`}>
      <div className="relative z-10">
        <Image
          src={src}
          alt="Divider Decor"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}