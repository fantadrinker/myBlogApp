'use client'
import Image from "next/image";
import { add } from "ramda"
import { useState } from "react";
import Chevron from "./Chevron";

export default function ImageGallery({ images }) {
  const [activeSlide, setActiveSlide] = useState(0);
  // probably best to use cdn for image urls here
  return (
    <div data-cy="image-gallery" className="h-96 flex flex-row justify-center items-center">
      <Chevron
        classNames="mr-2"
        direction="left"
        onClick={() => setActiveSlide(add(-1))}
        disabled={activeSlide === 0}
      />
      <div className="overflow-hidden" style={{ width: '400px', height: '384px' }}>
        <div
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${activeSlide * 400}px)`, width: `${images.length * 400}px` }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex items-center justify-center" style={{ minWidth: '400px', height: '384px' }}>
              <Image
                src={image}
                width={400}
                height={400}
                alt={image}
                unoptimized
                style={{ objectFit: 'contain', maxHeight: '384px', width: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
      <Chevron
        classNames="ml-2"
        direction="right"
        onClick={() => setActiveSlide(add(1))}
        disabled={activeSlide === images.length - 1}
      />
    </div>
  );
}