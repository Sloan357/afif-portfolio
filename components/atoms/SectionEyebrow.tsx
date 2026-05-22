type SectionEyebrowProps = {
  children: React.ReactNode;
};

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="text-xs font-semibold tracking-[0.24em] text-neutral-500 uppercase">
      {children}
    </p>
  );
}
