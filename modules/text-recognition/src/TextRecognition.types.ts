export type RecognizeImageResponse = {
  height: number;
  width: number;
  blocks: Array<{
    blockText: string;
    blockFrame: {
      width: number;
      height: number;
      top: number;
      bottom: number;
    } | null;
    lines: Array<{
      lineText: string;
      lineFrame: {
        width: number;
        height: number;
        top: number;
        bottom: number;
      } | null;
    }>;
  }>;
};
