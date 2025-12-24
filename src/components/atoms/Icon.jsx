import React, { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';

const sizeMap = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
};

export const Icon = ({
  name,
  className = '',
  size = 'md',
  loading = false,
  ...props
}) => {
  const IconComponent = useMemo(() => {
    return LucideIcons[name];
  }, [name]);

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return <LucideIcons.AlertCircle className={`${sizeMap[size]} ${className}`} {...props} />;
  }

  const classes = `${sizeMap[size]} ${loading ? 'animate-spin' : ''} ${className}`.trim();

  return <IconComponent className={classes} {...props} />;
};

export default Icon;
