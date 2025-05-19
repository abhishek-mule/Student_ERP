import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export function generateAvatarUrl(seed: string): string {
  return `https://api.multiavatar.com/${seed}.svg`;
}

export const roles = ['admin', 'teacher', 'student'] as const;
export type UserRole = typeof roles[number];

export function isValidRole(role: string): role is UserRole {
  return roles.includes(role as UserRole);
}