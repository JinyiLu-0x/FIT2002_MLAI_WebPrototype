import brandReference from "../imports/image.png";

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-lg bg-accent-mint ${
        compact ? "h-[34px] w-[68px]" : "h-[68px] w-[136px]"
      }`}
      aria-hidden="true"
    >
      <img
        src={brandReference}
        alt=""
        className={`absolute max-w-none ${
          compact
            ? "w-[392px] -translate-x-[5px] -translate-y-[7px]"
            : "w-[784px] -translate-x-[10px] -translate-y-[14px]"
        }`}
      />
    </span>
  );
}
