export interface Section {
  title: string;
  content: string[];
}

export interface PDFStyles {
  fontSize?: number;
  fontStyle?: string;
  marginTop?: number;
  marginBottom?: number;
  color?: number[];
  lineHeight?: number;
}