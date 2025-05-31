// Color names mapping for common colors
const COLOR_NAMES: { [key: string]: string } = {
  '#FF0000': 'Red',
  '#00FF00': 'Green',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#00FFFF': 'Cyan',
  '#FF00FF': 'Magenta',
  '#FFFFFF': 'White',
  '#000000': 'Black',
  '#FFA500': 'Orange',
  '#800080': 'Purple',
  '#FFC0CB': 'Pink',
  '#A52A2A': 'Brown',
  '#808080': 'Gray',
  '#F0E68C': 'Khaki',
  '#E6E6FA': 'Lavender',
  '#FFFACD': 'Lemon',
  '#98FB98': 'Mint',
  '#D3D3D3': 'Light gray',
  '#CD853F': 'Peru',
  '#800000': 'Maroon',
  '#008080': 'Teal',
  '#000080': 'Navy',
  '#32CD32': 'Lime green',
  '#7FFFD4': 'Aquamarine',
  '#B0E0E6': 'Powder blue',
  '#FF4500': 'Orange red',
  '#4B0082': 'Indigo',
  '#FFD700': 'Gold',
  '#FA8072': 'Salmon',
  '#E0FFFF': 'Light cyan',
  '#DDA0DD': 'Plum'
};

/**
 * Finds the nearest color name from a hex color
 * @param hex Hex color code
 * @returns Name of the nearest color
 */
export const getNearestColorName = (hex: string): string => {
  if (COLOR_NAMES[hex.toUpperCase()]) {
    return COLOR_NAMES[hex.toUpperCase()];
  }
  
  let nearestColor = '';
  let minDistance = Number.MAX_VALUE;
  
  const rgb1 = hexToRgb(hex);
  if (!rgb1) return hex;
  
  for (const [colorHex, colorName] of Object.entries(COLOR_NAMES)) {
    const rgb2 = hexToRgb(colorHex);
    if (!rgb2) continue;
    
    const distance = Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestColor = colorName;
    }
  }
  
  if (minDistance > 150) {
    // If no close match, return the hex code
    return hex;
  }
  
  return nearestColor;
};

/**
 * Determines the best contrasting color (black or white) for text on a given background
 * @param hex Background color in hex
 * @returns '#FFFFFF' or '#000000' depending on contrast
 */
export const contrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';
  
  // Calculate luminance using perceived brightness formula
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  
  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Handle shorthand form (e.g. "FFF")
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}