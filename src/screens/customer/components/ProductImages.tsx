import React, { useRef, useState } from "react"
import { Card, Image, Carousel } from "antd"

interface ProductImagesProps {
  images: string[]
  productName: string
}

const ProductImages = ({ images, productName }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const carouselRef = useRef<any>(null)

  return (
    <Card className="overflow-hidden">
      <Carousel
        ref={carouselRef}
        slidesToShow={1}
        slidesToScroll={1}
        draggable
        infinite
        afterChange={(slide) => setSelectedImage(slide)}
      >
        {images?.map((img: string, idx: number) => (
          <Image
            key={idx}
            src={img}
            alt={`${productName} ${idx + 1}`}
            className="w-20 h-20 object-cover !select-none"
            preview={false}
            fallback="/static/fallback-img.png"
          />
        ))}
      </Carousel>
      <Carousel
        className="mt-4"
        arrows
        dots={false}
        slidesToShow={5}
        slidesToScroll={1}
        draggable
        infinite={false}
      >
        {images?.map((img: string, idx: number) => (
          <div
            key={idx}
            className={`cursor-pointer border-2 rounded overflow-hidden ${
              selectedImage === idx
                ? "border-[var(--primary)]"
                : "border-transparent"
            }`}
            onClick={() => {
              setSelectedImage(idx)
              carouselRef.current?.goTo(idx)
            }}
          >
            <Image
              src={img}
              alt={`${productName} ${idx + 1}`}
              className="object-cover !select-none"
              preview={false}
              fallback="/static/fallback-img.png"
            />
          </div>
        ))}
      </Carousel>
    </Card>
  )
}

export default ProductImages
