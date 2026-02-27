'use client';
import React, { RefObject, useRef, useState } from 'react';
import Button from '@/UI/components/Button';
import Modal from '@/UI/components/Modal';
import { ModalCTA, ModalRef } from '@/UI/components/Modal/Modal';
import { createRow } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/supabase/storage';
import ProjectForm, { ProjectFormHandle } from './ProjectForm';
import formStyles from '@/UI/components/form/styles.module.scss';

type SaveStatus = 'idle' | 'validating' | 'uploading-image' | 'saving' | 'done' | 'error';

type Props = {
  onClose?: () => void;
  disabled?: boolean;
  onRefresh?: () => void;
};

const LABELS: Record<SaveStatus, string> = {
  idle: 'Save',
  validating: 'Validating…',
  'uploading-image': 'Uploading image…',
  saving: 'Saving…',
  done: 'Saved!',
  error: 'Error – retry',
};

const ProjectCreateModal = React.forwardRef<ModalRef, Props>(({ onClose, onRefresh }, ref) => {
  const formHandle = useRef<ProjectFormHandle | null>(null);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const busy = !['idle', 'done', 'error'].includes(status);

  const onSave = async () => {
    if (!formHandle.current || busy) return;

    /* 1 ── validate */
    setStatus('validating');
    const { valid } = formHandle.current.validate();
    if (!valid) { setStatus('idle'); return; }

    const { formData, imageFile } = formHandle.current.getData();

    try {
      /* 2 ── upload image */
      let imagePath = formData.image;
      if (imageFile) {
        setStatus('uploading-image');
        const ts = Date.now();
        const url = await uploadImage('projects', `image-${ts}-${imageFile.name}`, imageFile);
        if (!url) { setStatus('error'); return; }
        imagePath = url;
      }

      /* 3 ── save to DB */
      setStatus('saving');
      await createRow('projects', { ...formData, image: imagePath });

      setStatus('done');
      setTimeout(() => {
        const controller = (ref as RefObject<ModalRef> | null)?.current;
        if (controller) controller.hide();
        onClose?.();
        onRefresh?.();
      }, 600);
    } catch (error) {
      console.error('Error creating project:', error);
      setStatus('error');
    }
  };

  return (
    <Modal title="Create Project" onClose={onClose} ref={ref}>
      <ProjectForm ref={formHandle} data={null} />

      {status !== 'idle' && status !== 'done' && status !== 'error' && (
        <div className={formStyles.saveProgress}>
          <div className={formStyles.saveProgressBar} style={{ width: status === 'validating' ? '20%' : status === 'uploading-image' ? '55%' : '85%' }} />
          <span>{LABELS[status]}</span>
        </div>
      )}

      <ModalCTA>
        <Button size="sm" icon="crossSVG" style="secondary" text="Close" disabled={busy}
          onClick={() => { const c = (ref as RefObject<ModalRef> | null)?.current; c?.hide(); }} />
        <Button size="sm" icon="tickSVG" text={LABELS[status]} disabled={busy}
          inlineCSS={{ minWidth: '110px', justifyContent: 'flex-start' }} onClick={onSave} />
      </ModalCTA>
    </Modal>
  );
});

ProjectCreateModal.displayName = 'ProjectCreateModal';
export default ProjectCreateModal;
