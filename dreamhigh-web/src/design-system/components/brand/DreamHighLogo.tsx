import { cn } from '../../utils/cn';

/**
 * Logo DreamHigh (PNG nền trong suốt — `public/brand/dreamhigh-logo.png`).
 * `variant` giữ để tương thích; có thể dùng để tinh chỉnh contrast sau này.
 */
export type DreamHighLogoVariant = 'onDark' | 'onLight';

const LOGO_SRC = '/brand/dreamhigh-logo.png';

interface DreamHighLogoProps {
  variant?: DreamHighLogoVariant;
  className?: string;
  heightClass?: string;
}

export function DreamHighLogo({
  variant = 'onLight',
  className,
  heightClass = 'h-9',
}: DreamHighLogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="Dream High English Management System"
      className={cn(
        'w-auto object-contain object-left',
        heightClass,
        // Trên nền sáng: giữ độ đậm vàng; trên nền tối: logo vàng gốc rõ nét
        variant === 'onLight' && 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)]',
        variant === 'onDark' && 'opacity-95',
        className,
      )}
      loading="lazy"
    />
  );
}
