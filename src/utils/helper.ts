import { twMerge } from 'tailwind-merge';

export const isClient = () => typeof window !== 'undefined';

export const body = (isClient() && document.body) as HTMLElement;

/**
 * Concatenates truthy classes into a space-separated string.
 *
 * @param classes - The classes to concatenate.
 * @returns The concatenated classes.
 */
export const clx = (...classes: (string | boolean | undefined)[]): string => {
  return twMerge(classes.filter(Boolean).join(' '));
};

/**
 * Returns a memoized function that will only call the passed function when it hasn't been
 * called for the wait period.
 *
 * @param {Function} func - The function to be debounced.
 * @param {number} wait - The amount of time in milliseconds to wait before invoking the
 * debounced function.
 * @return A memoized function that is debounced
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
