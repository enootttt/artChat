import type { UploadProps } from 'element-plus';

import type { Attachment } from '../attachment/interface';

import type { CSSProperties } from 'vue';

export interface FileListCardProps {
  item: {
    file?: Attachment;
    percent?: number;
    thumbUrl?: string;
  } & Attachment;
  onRemove?: (item: Attachment) => void;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

export interface fileListProps {
  items: Attachment[];
  onRemove: (item: Attachment) => void;
  overflow?: 'scrollX' | 'scrollY' | 'wrap';
  upload: Partial<UploadProps>;
  disabled?: boolean;

  // Semantic
  listClassName?: string;
  listStyle?: CSSProperties;
  itemClassName?: string;
  itemStyle?: CSSProperties;
}

export interface ProgressProps {
  percent: number;
}
