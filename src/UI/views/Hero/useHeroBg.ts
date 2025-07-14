import { useGSAP } from '@gsap/react';
import { RefObject } from 'react';
import gsap from 'gsap';

type Props = {
  active?: boolean;
  yellow: RefObject<HTMLSpanElement | null>;
  blue: RefObject<HTMLSpanElement | null>;
};

export function useHeroBg({ active = true, yellow, blue }: Props) {
  useGSAP(
    () => {
      if (window.innerWidth < 768) return;
      if (!yellow.current || !blue.current) return;
      if (!active) return;
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const percentX = (clientX / innerWidth - 0.5) * 2; // from -1 to 1
        const percentY = (clientY / innerHeight - 0.5) * 2; // from -1 to 1
        const maxMoveX = innerWidth * 0.3;
        const maxMoveY = innerHeight * 0.6;

        if (yellow.current) {
          gsap.to(yellow.current, {
            // xPercent: percentX * 50, // move left-right up to ±50%
            y: -percentY * 50 * (maxMoveY / 100) + maxMoveY / 2, // move up-down up to ±50%
            duration: 0.6,
            ease: 'power3.out',
          });
        }

        if (blue.current) {
          gsap.to(blue.current, {
            x: percentX * 25 * (maxMoveX / 100) + maxMoveX / 2,
            y: percentY * 25 * (maxMoveY / 100) + maxMoveY / 2,
            duration: 0.26,
            ease: 'power3.out',
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    },
    { dependencies: [active] }
  );
}
