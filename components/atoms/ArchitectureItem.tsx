type ArchitectureItemProps = {
  label: string;
  value: string;
  className: string;
  labelClassName: string;
  valueClassName: string;
};

export function ArchitectureItem({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}: ArchitectureItemProps) {
  return (
    <div className={className}>
      <p className={labelClassName}>{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
}
