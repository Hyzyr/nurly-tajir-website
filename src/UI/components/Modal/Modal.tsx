'use client';

import styles from './styles.module.scss';

import { createPortal } from 'react-dom';
import React, { PropsWithChildren, RefObject, useEffect, useImperativeHandle, useRef } from 'react';
import useModalAnimations from './useModalAnimations';
import { useLenisScroll } from '@/hooks/useLenisScroll';

type Props = {
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  foldable?: boolean;
};

export type ModalRef = {
  show: () => void;
  hide: () => void;
  isVisible: () => boolean;
  wrapperRef: RefObject<HTMLDivElement | null>;
};

const Modal = React.forwardRef<ModalRef, Props>(
  ({ title = 'title', children, onClose, foldable = false }, ref) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { stopScroll, startScroll } = useLenisScroll();

    const { hide, show, shake, isVisible } = useModalAnimations({
      ref: wrapperRef,
    });

    // handle on fog click
    const handleClose = React.useCallback(() => {
      if (onClose) onClose();
      startScroll();

      hide();
    }, [hide, onClose, startScroll]);

    useEffect(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const closeListener = (e: MouseEvent) => {
        if (e.target === wrapper) {
          if (foldable) handleClose();
          else shake();
        }
      };

      wrapper.addEventListener('click', closeListener);
      return () => wrapper.removeEventListener('click', closeListener);
    }, [handleClose, foldable]);

    useImperativeHandle(
      ref,
      () => ({
        show: () => {
          stopScroll();
          show();
        },
        hide: () => {
          startScroll();
          hide();
        },
        isVisible: () => isVisible(),
        wrapperRef: wrapperRef,
      }),
      [show, hide, stopScroll, startScroll]
    );

    return createPortal(
      <div ref={wrapperRef} style={{ display: 'none' }} className={`${styles.modal__wrapper} `}>
        <div className={styles.modal}>
          <div className={styles.modal__header}>
            <h5 className="h6">{title}</h5>
            <button className={styles.modal__header__close} onClick={handleClose} />
          </div>
          <div className={styles.modal__body}>{children}</div>
        </div>
      </div>,
      document.getElementById('main') as HTMLElement
    );
  }
);

export const ModalCTA = ({ children }: PropsWithChildren) => {
  return <div className={styles.modal__cta}>{children}</div>;
};

Modal.displayName = 'Modal';
export default Modal;
