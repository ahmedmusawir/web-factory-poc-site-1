'use client';
import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';

export function Artwork(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (image.current?.complete && !image.current.naturalWidth) setFailed(true);
  }, []);
  if (failed) return <div className="image-fallback" role="img" aria-label={props.alt || ''} style={{aspectRatio: `${props.width || 1200} / ${props.height || 760}`}}><span aria-hidden="true">↗</span></div>;
  // The approved local illustrations are intentionally delivered at their original proportions.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} ref={image} alt={props.alt ?? ''} onError={() => setFailed(true)} />;
}
