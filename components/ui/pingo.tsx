import { brand } from "@/config/brand";

/* Pingo — YouthPay penguin mascot.
   - Drop a real image in /public and set brand.pingoImage to use it.
   - `silhouette` = white cutout for the navy card. */
export function Pingo({
  size = 64,
  silhouette = false,
  className,
}: {
  size?: number;
  silhouette?: boolean;
  className?: string;
}) {
  // real image override (only for the full-color mascot, not the card silhouette)
  if (brand.pingoImage && !silhouette) {
    // width drives size; height auto keeps the image's real aspect ratio (no squish)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={brand.pingoImage} alt="Pingo" width={size} className={className} style={{ width: size, height: "auto" }} />;
  }

  if (silhouette) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
        <path d="M32 6c-8 0-13 6-13 15 0 3 .5 5 .5 7-3 2-6 6-7 12-.5 3 1 5 3.5 4.5 2-.4 3.5-2 4.5-4 .8 3 4.5 6 11.5 6s10.7-3 11.5-6c1 2 2.5 3.6 4.5 4 2.5.5 4-1.5 3.5-4.5-1-6-4-10-7-12 0-2 .5-4 .5-7 0-9-5-15-13-15z" fill="#fff" />
        <circle cx="26.5" cy="24" r="2.4" fill="#1b2a4a" />
        <circle cx="37.5" cy="24" r="2.4" fill="#1b2a4a" />
        <path d="M29 29h6l-3 4z" fill="#1b2a4a" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      {/* feet */}
      <ellipse cx="25" cy="59" rx="6" ry="3" fill="#f5a524" stroke="#1b2a4a" strokeWidth="2" />
      <ellipse cx="39" cy="59" rx="6" ry="3" fill="#f5a524" stroke="#1b2a4a" strokeWidth="2" />
      {/* body */}
      <path d="M32 5C21 5 15.5 14 15.5 29.5S22 58 32 58s16.5-13 16.5-28.5S43 5 32 5Z" fill="#1b2a4a" stroke="#1b2a4a" strokeWidth="2.2" />
      {/* flippers */}
      <path d="M15.8 27c-4 1.5-5 8-2.6 12.5 1 1.8 2.6 1.2 3-.6l1.5-9.6Z" fill="#1b2a4a" stroke="#1b2a4a" strokeWidth="2" strokeLinejoin="round" />
      <path d="M48.2 27c4 1.5 5 8 2.6 12.5-1 1.8-2.6 1.2-3-.6l-1.5-9.6Z" fill="#1b2a4a" stroke="#1b2a4a" strokeWidth="2" strokeLinejoin="round" />
      {/* belly */}
      <ellipse cx="32" cy="34" rx="10.5" ry="16" fill="#faf7ef" />
      {/* cheeks */}
      <circle cx="22.5" cy="29" r="2.4" fill="#f18aa8" opacity="0.85" />
      <circle cx="41.5" cy="29" r="2.4" fill="#f18aa8" opacity="0.85" />
      {/* eyes */}
      <circle cx="26.5" cy="24" r="4" fill="#fff" />
      <circle cx="37.5" cy="24" r="4" fill="#fff" />
      <circle cx="27.2" cy="24.6" r="2.1" fill="#1b2a4a" />
      <circle cx="36.8" cy="24.6" r="2.1" fill="#1b2a4a" />
      <circle cx="28" cy="23.8" r="0.7" fill="#fff" />
      <circle cx="37.6" cy="23.8" r="0.7" fill="#fff" />
      {/* beak */}
      <path d="M29 28.5h6l-3 4.2z" fill="#f5a524" stroke="#1b2a4a" strokeWidth="1.4" strokeLinejoin="round" />
      {/* scarf — brand red */}
      <path d="M23 39c5.5 2.6 12.5 2.6 18 0l-1.3 4.6c-4.8 2-10.6 2-15.4 0z" fill="#d62828" stroke="#1b2a4a" strokeWidth="2" strokeLinejoin="round" />
      <path d="M39.7 43.6l3.3 6-4.6 1z" fill="#d62828" stroke="#1b2a4a" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
