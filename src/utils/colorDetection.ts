import { ColorResult, ColorInfo } from '../types';

export const detectColors = async (file: File): Promise<ColorResult> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/color-detect', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    const data = await response.json();
    const color = data.color;
    
    // Parse the RGB values from the response
    let r, g, b;
    if (color.startsWith('RGB')) {
      const match = color.match(/RGB\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        [, r, g, b] = match.map(Number);
      }
    }

    const hex = r !== undefined ? rgbToHex(r, g, b) : '#000000';
    
    return {
      dominant: {
        hex,
        rgb: color
      },
      palette: generatePalette(hex)
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

function generatePalette(baseHex: string): ColorInfo[] {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];

  // Generate a simple palette by adjusting brightness and saturation
  const palette: ColorInfo[] = [];
  const variations = [
    { s: 0.7, v: 0.9 },
    { s: 0.8, v: 0.7 },
    { s: 0.6, v: 0.8 },
    { s: 0.9, v: 0.6 },
  ];

  for (const variation of variations) {
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    hsv.s *= variation.s;
    hsv.v *= variation.v;
    const newRgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    palette.push({
      hex,
      rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`
    });
  }

  return palette;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, v };
}

function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  let r = 0, g = 0, b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v; g = t; b = p;
      break;
    case 1:
      r = q; g = v; b = p;
      break;
    case 2:
      r = p; g = v; b = t;
      break;
    case 3:
      r = p; g = q; b = v;
      break;
    case 4:
      r = t; g = p; b = v;
      break;
    case 5:
      r = v; g = p; b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}