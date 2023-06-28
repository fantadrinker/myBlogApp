import Image from "next/image";
import { add } from "ramda"
import { useState } from "react";
import Chevron from "./Chevron";

export default function ImageGallery({ images }) {
  const [activeSlide, setActiveSlide] = useState(0);
  // probably best to use cdn for image urls here
  return (
    <div data-cy="image-gallery" className="h-96 overflow-hidden flex flex-row justify-center items-center">
      <Chevron
        classNames="mr-2" 
        direction="left" 
        onClick={() => setActiveSlide(add(-1))} 
        disabled={activeSlide === 0}
      />
      {images.map((image, index) => {
        return (
          <div key={index} className={index === activeSlide? '': 'hidden'}>
            <Image
              src={`/images/${image}`}
              width={400}
              height={400}
              alt={image}
            />
          </div>
        );
      })}
      <Chevron 
        classNames="ml-2"
        direction="right" 
        onClick={() => setActiveSlide(add(1))} 
        disabled={activeSlide === images.length - 1}
      />
    </div>
  );
}