'use client';
import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import styles from './styles.module.scss';
import Icon from '../Icon';

export type UploadProgressItem = {
  /** file name used to match against selected files */
  name: string;
  /** 0-100 during upload, 100 when done, -1 on error */
  progress: number;
  url?: string;
};

export type MultiImageUploaderRef = {
  getFiles: () => File[];
  clear: () => void;
};

type Props = {
  /** Already-saved URLs to display alongside new picks */
  existingUrls?: string[];
  onRemoveExisting?: (url: string) => void;
  /** Pass upload-progress info from parent during save */
  uploadProgress?: UploadProgressItem[];
};

const MultiImageUploader = React.forwardRef<MultiImageUploaderRef, Props>(
  ({ existingUrls = [], onRemoveExisting, uploadProgress = [] }, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addFiles = useCallback((incoming: FileList | File[]) => {
      const arr = Array.from(incoming).filter((f) => f.type.startsWith('image/'));
      if (!arr.length) return;

      setFiles((prev) => [...prev, ...arr]);
      arr.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }, []);

    const removeFile = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
      setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
      },
      [addFiles]
    );

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    useImperativeHandle(
      ref,
      () => ({
        getFiles: () => files,
        clear: () => {
          setFiles([]);
          setPreviews([]);
        },
      }),
      [files]
    );

    const hasItems = existingUrls.length > 0 || files.length > 0;

    return (
      <div className={styles.multiUploader}>
        <div
          className={`${styles.multiUploader__zone} ${isDragging ? styles.dragging : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
          <Icon name="imageSVG" />
          <span>Drag &amp; drop or click to select</span>
          <small>Multiple images supported</small>
        </div>

        {hasItems && (
          <div className={styles.multiUploader__grid}>
            {existingUrls.map((url, i) => (
              <div key={`ex-${i}`} className={styles.multiUploader__item}>
                <img src={url} alt="" />
                {onRemoveExisting && (
                  <button
                    type="button"
                    className={styles.multiUploader__remove}
                    onClick={() => onRemoveExisting(url)}
                    title="Remove"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {files.map((file, i) => {
              const prog = uploadProgress.find((p) => p.name === file.name);
              const isUploading = prog !== undefined;
              const isDone = prog && prog.progress === 100;
              const isError = prog && prog.progress === -1;

              return (
                <div
                  key={`new-${i}`}
                  className={`${styles.multiUploader__item} ${isUploading ? styles.uploading : ''}`}
                >
                  {previews[i] && <img src={previews[i]} alt={file.name} />}

                  {isUploading ? (
                    <div className={styles.multiUploader__overlay}>
                      <div
                        className={`${styles.multiUploader__bar} ${isError ? styles.barError : ''} ${isDone ? styles.barDone : ''}`}
                        style={{ width: isError ? '100%' : `${Math.max(5, prog.progress)}%` }}
                      />
                      <span className={styles.multiUploader__label}>
                        {isError ? 'Error' : isDone ? '✓' : `${prog.progress}%`}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={styles.multiUploader__remove}
                      onClick={() => removeFile(i)}
                      title="Remove"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

MultiImageUploader.displayName = 'MultiImageUploader';
export default MultiImageUploader;
