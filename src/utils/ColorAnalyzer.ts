import Jimp from 'jimp';

export async function analyzeColor(imageBuffer: Buffer): Promise<string> {
  const image = await Jimp.read(imageBuffer);
  const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(0, 0)); // top-left pixel

  // Simple logic: return basic color
  if (r > 200 && g < 100 && b < 100) return 'Red';
  if (g > 200 && r < 100 && b < 100) return 'Green';
  if (b > 200 && r < 100 && g < 100) return 'Blue';

  return `RGB(${r}, ${g}, ${b})`;
}
