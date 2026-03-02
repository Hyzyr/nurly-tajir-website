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
      if (!yellow.current || !blue.current) return;
      if (!active) return;

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Auto-animated floating on mobile
        const maxMoveX = window.innerWidth * 0.3;
        const maxMoveY = window.innerHeight * 0.6;

        const tlYellow = gsap.timeline({ repeat: -1, yoyo: true });
        tlYellow.to(yellow.current, {
          y: maxMoveY * 0.6,
          duration: 4,
          ease: 'sine.inOut',
        });
        tlYellow.to(yellow.current, {
          y: maxMoveY * 0.2,
          duration: 3.5,
          ease: 'sine.inOut',
        });

        const tlBlue = gsap.timeline({ repeat: -1, yoyo: true });
        tlBlue.to(blue.current, {
          x: maxMoveX * 0.7,
          y: maxMoveY * 0.5,
          duration: 5,
          ease: 'sine.inOut',
        });
        tlBlue.to(blue.current, {
          x: maxMoveX * 0.3,
          y: maxMoveY * 0.3,
          duration: 4,
          ease: 'sine.inOut',
        });

        return () => {
          tlYellow.kill();
          tlBlue.kill();
        };
      }

      // Desktop: mouse-move based animation
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const percentX = (clientX / innerWidth - 0.5) * 2;
        const percentY = (clientY / innerHeight - 0.5) * 2;
        const maxMoveX = innerWidth * 0.3;
        const maxMoveY = innerHeight * 0.6;

        if (yellow.current) {
          gsap.to(yellow.current, {
            y: -percentY * 50 * (maxMoveY / 100) + maxMoveY / 2,
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
