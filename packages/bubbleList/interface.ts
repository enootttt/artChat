import type { BubbleProps } from '../bubble/interface';

export type BubbleDataType = {
  key?: number | string;
  role?: string;
} & BubbleProps;
export type RoleType = Partial<Omit<BubbleProps, 'content'>>;
export interface BubbleListProps {
  autoScroll?: boolean;
  className?: string;
  items: BubbleDataType[];
  roles?:
    | ((bubbleDataP: BubbleDataType) => RoleType)
    | Record<string, RoleType>;
  rootClassName?: string;
}

export interface scrollTopParameters {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  key?: number | string;
  offset?: number;
}
