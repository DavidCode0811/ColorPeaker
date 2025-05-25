export function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getColorName(rgb: { r: number; g: number; b: number }): string {
    // This is a simple implementation. A more comprehensive approach would involve a color database.
    const colors: { [key: string]: { r: number; g: number; b: number } } = {
        red: { r: 255, g: 0, b: 0 },
        green: { r: 0, g: 255, b: 0 },
        blue: { r: 0, g: 0, b: 255 },
        // Add more colors as needed
    };

    let closestColor = '';
    let closestDistance = Infinity;

    for (const [colorName, colorValue] of Object.entries(colors)) {
        const distance = Math.sqrt(
            Math.pow(rgb.r - colorValue.r, 2) +
            Math.pow(rgb.g - colorValue.g, 2) +
            Math.pow(rgb.b - colorValue.b, 2)
        );

        if (distance < closestDistance) {
            closestDistance = distance;
            closestColor = colorName;
        }
    }

    return closestColor || 'unknown';
}