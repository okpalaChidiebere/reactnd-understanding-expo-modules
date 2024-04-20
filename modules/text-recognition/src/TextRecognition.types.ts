export type Line = {
  lineText: string;
  lineFrame: {
    width: number;
    height: number;
    top: number;
    left: number;
  } | null;
};

export type RecognizeImageResponse = {
  height: number;
  width: number;
  blocks: Array<{
    blockText: string;
    blockFrame: {
      width: number;
      height: number;
      top: number;
      left: number;
    } | null;
    lines: Array<Line>;
  }>;
};
