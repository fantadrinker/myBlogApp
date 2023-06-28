import Image from "next/image";
import { useState } from "react";

export default function ImageGallery({ images }) {
  const [activeSlide, setActiveSlide] = useState(0);
  // probably best to use cdn for image urls here
  return (
    <div className="h-96 overflow-hidden flex flex-row justify-center items-center">
      <div>
        <button onClick={() => setActiveSlide(activeSlide - 1)} disabled={activeSlide === 0}>Previous</button>
      </div>
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
      <div>
        <button onClick={() => setActiveSlide(activeSlide + 1)} disabled={activeSlide === images.length - 1}>Next</button>
      </div>
    </div>
  );
}