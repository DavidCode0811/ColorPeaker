import express, { Request, Response } from 'express';
import multer from 'multer';
import { analyzeColor } from './components/ColorAnalyzer';

const app = express();
const upload = multer(); // Use memory storage

app.post('/api/color-detect', upload.single('image'), async (req: Request, res: Response): Promise<void> => {

  const imageBuffer = req.file?.buffer;
  if (!imageBuffer) {
    res.status(400).json({ error: 'No image uploaded' });
    return;
  }

    const detectedColor = await analyzeColor(imageBuffer);
    res.json({ color: detectedColor });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API server running on port ${PORT}`);
});
