import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  className?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  className = '',
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`relative flex flex-col items-center justify-center p-6 bg-zinc-900 border border-zinc-800 text-center ${className}`}>
        <ImageIcon className="w-6 h-6 text-zinc-600 mb-2" />
        <span className="text-xs font-medium text-zinc-400">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
}
