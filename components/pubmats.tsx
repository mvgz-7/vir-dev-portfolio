'use client';

import Image from 'next/image';

export default function PubmatsSection() {
  return (
    <section
      id="pubmats"
      /* 1. bg-transparent: Removes the solid white block so the global gradient shows through.
         2. overflow-visible: Ensures the pointer isn't 'cut off' at the top/bottom edges.
      */
      className="relative w-full flex flex-col items-center justify-center bg-transparent overflow-visible box-border"
    >
      {/* The 1-inch margin remains to provide the spacing you requested earlier */}
      <div className="relative w-full h-auto m-[1in] flex justify-center items-center">
        <img
          src="/pubmats.png" 
          alt="Publication Materials"
          /* The purple border stays directly on the image, 
             creating a clean look against the flowing background.
          */
          className="max-w-[80%] h-auto block mx-auto border-[10px] border-[#D4C4E9]"
          loading="lazy"
        />
      </div>
    </section>
  );
}