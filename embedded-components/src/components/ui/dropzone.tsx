import React, { useState } from 'react';
import {
  useDropzone,
  type DropzoneProps as _DropzoneProps,
  type DropzoneState as _DropzoneState,
} from 'react-dropzone';
import truncate from 'truncate';

import { cn } from '@/lib/utils';
import { Box } from '@/components/ui/box';

export interface DropzoneState extends _DropzoneState {}

export interface DropzoneProps extends Omit<_DropzoneProps, 'children'> {
  containerClassName?: string;
  dropZoneClassName?: string;
  children?: (dropzone: DropzoneState) => React.ReactNode;
  showFilesList?: boolean;
  showErrorMessage?: boolean;
}

// Functions:

const Upload = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('lucide lucide-upload', className)}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const PDF = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('lucide lucide-file-text', className)}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

const Image = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('lucide lucide-image', className)}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const Trash = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('lucide lucide-trash', className)}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const Dropzone = ({
  containerClassName,
  dropZoneClassName,
  children,
  showFilesList = true,
  showErrorMessage = true,
  ...props
}: DropzoneProps) => {
  // Constants:
  const dropzone = useDropzone({
    ...props,
    onDrop(acceptedFiles, fileRejections, event) {
      props.onDrop?.(acceptedFiles, fileRejections, event);
      setFilesUploaded((_filesUploaded) => [
        ..._filesUploaded,
        ...acceptedFiles,
      ]);
      if (fileRejections.length > 0) {
        let _errorMessage = `Could not upload ${fileRejections[0].file.name}`;
        if (fileRejections.length > 1)
          _errorMessage += `, and ${fileRejections.length - 1} other files.`;
        setErrorMessage(_errorMessage);
      } else {
        setErrorMessage('');
      }
    },
  });

  // State:
  const [filesUploaded, setFilesUploaded] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  // Functions:
  const deleteUploadedFile = (index: number) => {
    setFilesUploaded((_uploadedFiles) => [
      ..._uploadedFiles.slice(0, index),
      ..._uploadedFiles.slice(index + 1),
    ]);
  };

  // Return:
  return (
    <div className={cn('eb-flex eb-flex-col eb-gap-2', containerClassName)}>
      {!(props.multiple === false && filesUploaded.length > 0) && (
        <div
          {...dropzone.getRootProps()}
          className={cn(
            'eb-flex eb-h-32 eb-w-full eb-cursor-pointer eb-select-none eb-items-center eb-justify-center eb-rounded-lg eb-border-2 eb-border-dashed eb-border-gray-200 eb-transition-all hover:eb-bg-accent hover:eb-text-accent-foreground',
            dropZoneClassName
          )}
        >
          <input {...dropzone.getInputProps()} />
          {children ? (
            children(dropzone)
          ) : dropzone.isDragAccept ? (
            <div className="eb-text-sm eb-font-medium">
              Drop your files here!
            </div>
          ) : (
            <div className="eb-flex eb-flex-col eb-items-center eb-gap-1.5">
              <div className="eb-flex eb-flex-row eb-items-center eb-gap-0.5 eb-text-sm eb-font-medium">
                <Upload className="eb-mr-2 eb-h-4 eb-w-4" /> Drag and drop a
                file or click to browse
              </div>
              {props.maxSize && (
                <div className="eb-text-xs eb-font-medium eb-text-gray-400">
                  Max. file size: {(props.maxSize / (1024 * 1024)).toFixed(2)}{' '}
                  MB
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {showErrorMessage && errorMessage && (
        <span className="eb-mt-3 eb-text-xs eb-text-red-600">
          {errorMessage}
        </span>
      )}
      {showFilesList && filesUploaded.length > 0 && (
        <div
          className={`eb-flex eb-w-full eb-flex-col eb-gap-2 ${filesUploaded.length > 2 ? 'eb-h-48' : 'eb-h-fit'} ${filesUploaded.length > 0 ? 'eb-pb-2' : ''}`}
        >
          <div className="eb-w-full">
            {filesUploaded.map((fileUploaded, index) => (
              <div
                key={index}
                className="eb-mt-2 eb-flex eb-h-16 eb-w-full eb-flex-row eb-items-center eb-justify-between eb-rounded-lg eb-border-2 eb-border-solid eb-border-gray-200 eb-px-4 eb-shadow-sm"
              >
                <div className="eb-flex eb-h-full eb-flex-row eb-items-center eb-gap-4">
                  {fileUploaded.type === 'application/pdf' ? (
                    <PDF className="eb-h-6 eb-w-6 eb-text-rose-700" />
                  ) : (
                    <Image className="eb-h-6 eb-w-6 eb-text-rose-700" />
                  )}
                  <div className="eb-flex eb-flex-col eb-gap-0">
                    <div className="eb-text-[0.85rem] eb-font-medium eb-leading-snug">
                      {truncate(
                        fileUploaded.name.split('.').slice(0, -1).join('.'),
                        30
                      )}
                    </div>
                    <div className="eb-text-[0.7rem] eb-leading-tight eb-text-gray-500">
                      .{fileUploaded.name.split('.').pop()} •{' '}
                      {(fileUploaded.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <Box
                  className="eb-cursor-pointer eb-select-none eb-rounded-full eb-border-2 eb-border-solid eb-border-gray-100 eb-p-2 eb-shadow-sm eb-transition-all hover:eb-bg-accent"
                  onClick={() => deleteUploadedFile(index)}
                >
                  <Trash className="eb-h-4 eb-w-4" />
                </Box>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Exports:
export default Dropzone;
