type TechTagProps = {
  label: string;
};

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-xs font-medium text-neutral-300">
      {label}
    </span>
  );
}
