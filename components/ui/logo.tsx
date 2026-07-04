import { brand } from "@/config/brand";

/** Reusable wordmark. `light` = cream text for dark backgrounds. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 font-display text-[20px] font-extrabold ${light ? "text-cream" : "text-navy"}`}>
      <span
        className="grid h-8 w-8 place-items-center rounded-[8px] border-2 border-navy bg-red font-display text-[15px] font-black text-cream hard-sm-navy"
      >
        {brand.name.charAt(0)}
      </span>
      {brand.name}
    </span>
  );
}
