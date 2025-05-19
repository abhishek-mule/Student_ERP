import React from 'react';
import { cn, getInitials, generateAvatarUrl } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  seed?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className,
  seed,
}) => {
  const [imgError, setImgError] = React.useState(false);
  
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  // Determine the source of the avatar
  let imgSrc = src;
  
  // If seed is provided and no src or src has error, use Multiavatar
  if ((!src || imgError) && seed) {
    imgSrc = generateAvatarUrl(seed);
  }

  return (
    <div
      className={cn(
        'relative rounded-full flex items-center justify-center overflow-hidden bg-primary-100 text-primary-800 font-medium',
        sizeClasses[size],
        className
      )}
    >
      {imgSrc && !imgError ? (
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        getInitials(alt)
      )}
    </div>
  );
};

export default Avatar;