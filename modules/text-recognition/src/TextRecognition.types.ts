type Frame = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type Line = {
  lineText: string;
  lineFrame: Frame | null;
};

export type RecognizeImageResponse = {
  height: number;
  width: number;
  blocks: Array<{
    blockText: string;
    blockFrame: Frame | null;
    lines: Array<Line>;
  }>;
};
