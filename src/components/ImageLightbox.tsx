import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox = ({ images, selectedIndex, onClose, onNavigate }: ImageLightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && selectedIndex > 0) onNavigate(selectedIndex - 1);
      if (e.key === "ArrowRight" && selectedIndex < images.length - 1) onNavigate(selectedIndex + 1);
    },
    [selectedIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    if (selectedIndex !== null) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, selectedIndex]);

  return (
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <button className="absolute top-4 right-4 text-primary-foreground hover:text-primary transition-colors z-10" onClick={onClose} aria-label="Close">
            <X className="w-8 h-8" />
          </button>

          {selectedIndex > 0 && (
            <button
              className="absolute left-4 text-primary-foreground hover:text-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); onNavigate(selectedIndex - 1); }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}

          {selectedIndex < images.length - 1 && (
            <button
              className="absolute right-4 text-primary-foreground hover:text-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); onNavigate(selectedIndex + 1); }}
              aria-label="Next"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

          <motion.img
            key={selectedIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 text-primary-foreground/70 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
