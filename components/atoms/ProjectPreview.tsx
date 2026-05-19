type PreviewImage = {
  src: string | null;
  alt: string;
  variants?: {
    mobile?: string | null;
    desktop?: string | null;
  };
} | null;

type ProjectPreviewProps = {
  image: PreviewImage;
  label: string;
};

export function ProjectPreview({ image, label }: ProjectPreviewProps) {
  const imageSrc = image?.variants?.desktop ?? image?.src;

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-black/20">
      {image && imageSrc ? (
        <div
          role="img"
          aria-label={image.alt}
          className="aspect-[16/10] bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden bg-[#07080b]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.12),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.045),transparent_45%)]" />
          <div className="absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Preview
            </p>
            <p className="mt-2 text-sm font-medium text-neutral-300">
              {label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
