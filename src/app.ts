import { CameraScanner } from './components/CameraScanner';
import { ColorAnalyzer } from './components/ColorAnalyzer';
import { VoiceFeedback } from './components/VoiceFeedback';

class ColorBlindAssistApp {
    private cameraScanner: CameraScanner;
    private colorAnalyzer: ColorAnalyzer;
    private voiceFeedback: VoiceFeedback;

    constructor() {
        this.cameraScanner = new CameraScanner();
        this.colorAnalyzer = new ColorAnalyzer();
        this.voiceFeedback = new VoiceFeedback();
    }

    public start() {
        this.cameraScanner.startScanning();
        this.cameraScanner.onScan((image) => {
            const color = this.colorAnalyzer.analyzeColor(image);
            this.voiceFeedback.speakColor(color);
        });
    }

    public stop() {
        this.cameraScanner.stopScanning();
    }
}

const app = new ColorBlindAssistApp();
app.start();