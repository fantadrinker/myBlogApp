'use client'
import Image from 'next/image'

import Slider from 'react-slick'

export default function ImageCarousel({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    dotsClass: 'slick-dots slick-thumb',
  }

  return (
    <Slider {...settings}>
      {images.map((image, index) => {
        return (
          <div key={index} className="">
            <Image
              src={image}
              width={400}
              height={400}
              alt={image}
              unoptimized
              className="m-auto"
            />
          </div>
        )
      })}
    </Slider>
  )
}