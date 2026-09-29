import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage = "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=80",
  afterImage = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=80",
  beforeLabel = "Raw Unstitched Fabric & Thread",
  afterLabel = "Finished Bridal Maggam Blouse",
  title = "Bridal Blouse Transformation",
  service = "Maggam Work & Custom Tailoring",
  description = "See how raw mulberry silk fabric transforms into a royal bridal blouse with intricate gold zardozi peacock embroidery and master princess-cut tailoring."
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div className="w-full bg-stone-100 dark:bg-stone-900/60 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual Slider Column */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            className="relative h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-stone-200 dark:border-stone-700 shadow-lg"
            onMouseDown={() => setIsDragging(true)}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full width background) */}
            <img
              src={afterImage}
              alt="After Tailoring"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-10 bg-amber-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
              {afterLabel}
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={beforeImage}
                alt="Before Tailoring"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
              />
              <div className="absolute top-4 left-4 z-10 bg-stone-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                {beforeLabel}
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-2xl"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white shadow-xl flex items-center justify-center border-2 border-white -ml-0.5 hover:scale-110 active:scale-95 transition-transform">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-stone-400 mt-2">
            Drag the slider to compare before & after stitching
          </p>
        </div>

        {/* Text Information Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{service}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white leading-snug">
            {title}
          </h3>

          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            {description}
          </p>

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-stone-400">Time Taken</p>
              <p className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">8 Days</p>
            </div>
            <div>
              <p className="text-stone-400">Craft Technique</p>
              <p className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">Aari & Zardozi Needlework</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
