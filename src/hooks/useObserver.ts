import { useEffect, useRef, useState } from 'react';

type Props = {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onChange?: (state: boolean) => void;
};

export function useObserver<T extends HTMLDivElement = HTMLDivElement>({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  onChange,
}: Props = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (onChange) onChange(entry.isIntersecting);
        else setIsVisible(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    if (node) {
      const rect = node.getBoundingClientRect();
      const isInitiallyVisible =
        rect.top < window.innerHeight && rect.bottom >= 0;

      if (onChange) onChange(isInitiallyVisible);
      else setIsVisible(isInitiallyVisible);
    }

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, root, rootMargin]);

  return { ref, isVisible };
}
