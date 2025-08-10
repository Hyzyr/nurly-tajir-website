import Icon from '../Icon';
import styles from './styles.module.scss';
import React, {
  ChangeEvent,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type ImageInputProps = {
  id?: string | number;
  url?: string | null;
  ratioPercent?: number; // from 0 - 1
};
export type ImageInputRef = {
  selectedFile: () => File | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

const ImageInput = React.forwardRef<ImageInputRef, ImageInputProps>(
  ({ id, url = null, ratioPercent = 0.9 }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(url);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const fileList = e.target.files;
      const file: File | null =
        fileList && fileList.length > 0 ? fileList[0] : null;
      setSelectedFile(file);
      setPreviewUrl(null);

      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreviewUrl(result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl('');
      }
    };

    const onClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };
    useImperativeHandle(
      ref,
      () => ({
        selectedFile: () => selectedFile,
        inputRef,
      }),
      [selectedFile]
    );

    useEffect(() => {
      setPreviewUrl(url);
      setSelectedFile(null);
    }, [url]);

    return (
      <div className={styles.inputFile}>
        <div
          className={styles.inputFile__body}
          style={{
            paddingBottom: `${ratioPercent * 100}%`,
          }}>
          <input
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            className="block mb-4 w-full text-sm text-gray-700 border border-gray-300 rounded p-2"
            accept="*/*"
            id={id ? '' + id : ''}
          />
          <div className={styles.inputFile__placeholder}>
            <Icon name="imageSVG" />
          </div>
          <div
            className={`${styles.inputFile__preview} ${
              previewUrl ? styles.active : ''
            }`}>
            {previewUrl && <img src={previewUrl} alt="preview-file" />}
          </div>
          <span className={styles.inputFile__updatebtn} onClick={onClick}>
            <Icon name="imageUploadsSVG" />
          </span>
        </div>
      </div>
    );
  }
);

type LabeledInputProps = ImageInputProps & {
  label: string;
  wrapperClassName?: string;
};

const LabeledImageInput = ({
  wrapperClassName,
  label,
  ...restProps
}: LabeledInputProps) => {
  const id = useId();

  return (
    <div className={`${styles.input__group} ${wrapperClassName ?? ''}`}>
      <label htmlFor={id}>{label}</label>
      <ImageInput {...restProps} id={id} />
    </div>
  );
};

export { LabeledImageInput };
ImageInput.displayName = 'ImageInput'; 
export default ImageInput;
