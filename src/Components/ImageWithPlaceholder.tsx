import { useState } from "react";
import { motion } from "framer-motion";


interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  shape?: "rounded" | "circle" | "rect";
  onLoad?: () => void;
}


export default function ImageWithPlaceholder({
  src,
  alt,
  className = "",
  placeholder = "/placeholder.svg",
  shape = "rect",
  onLoad,
}: ImageWithPlaceholderProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  let shapeClass = "";
  if (shape === "circle") shapeClass = "rounded-full";
  else if (shape === "rounded") shapeClass = "rounded-lg";

  const handleImgLoad = () => {
    setImgLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div className={`relative ${className} ${shapeClass}`.trim()}>
      {!imgLoaded && (
        <img
          src={placeholder}
          alt="Loading..."
          className={`absolute top-0 left-0 w-full h-full object-cover z-0 ${shapeClass}`}
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        className={`absolute top-0 left-0 w-full h-full object-cover z-10 ${shapeClass}`}
        initial={{ opacity: 0 }}
        animate={imgLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        onLoad={handleImgLoad}
      />
    </div>
  );
}
