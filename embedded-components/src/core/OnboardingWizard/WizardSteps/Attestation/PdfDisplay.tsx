/* eslint import/no-unresolved: 0 */ // --> OFF
import React, { UIEvent, useState } from 'react';
import { useResizeObserver } from '@mantine/hooks';
import { Document, Page, pdfjs } from 'react-pdf';

import { Box } from '@/components/ui';

import { useContentData } from '../../utils/useContentData';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// const options = {
//   cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
// };
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).toString();

interface PdfDisplayProps {
  file: any;
  onLoad: VoidFunction;
  onScrolledToBottom: VoidFunction;
}

export const PdfDisplay = ({
  file,
  onLoad,
  onScrolledToBottom,
  ...rest
}: PdfDisplayProps) => {
  const pdfMaxWidth = 800;
  const pdfMaxHeight = 800;

  const [ref, rect] = useResizeObserver();
  const [numPages, setNumPages] = useState(0);

  const checkIfScrolledToBottom = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop - target.clientHeight < 1) {
      onScrolledToBottom();
    }
  };
  const { getContentToken } = useContentData('steps.PdfDisplay');

  return (
    <Box
      ref={ref}
      className="eb-component eb-overflow-y-scroll"
      style={{
        height:
          rect.width * 1.3 > pdfMaxHeight ? pdfMaxHeight : rect.width * 1.3,
      }}
      onScroll={checkIfScrolledToBottom}
      onMouseEnter={checkIfScrolledToBottom}
      {...rest}
    >
      <Document
        file={file}
        onLoadSuccess={(pdf) => {
          setNumPages(pdf.numPages);
          onLoad();
        }}
        noData={getContentToken(`Document`)}
      >
        {[...Array(numPages)].map((_value, index) => (
          <Box className="" key={index} tabIndex={0}>
            <Page
              pageNumber={index + 1}
              className="eb-flex eb-justify-center"
              width={rect.width > pdfMaxWidth ? pdfMaxWidth : rect.width}
              renderAnnotationLayer={false}
            />
          </Box>
        ))}
      </Document>
    </Box>
  );
};
