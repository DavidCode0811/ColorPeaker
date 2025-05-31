/**
 * Color information with hex and RGB representation
 */
export interface ColorInfo {
  hex: string;
  rgb: string;
}

/**
 * Result of color detection process
 */
export interface ColorResult {
  dominant: ColorInfo;
  palette: ColorInfo[];
}