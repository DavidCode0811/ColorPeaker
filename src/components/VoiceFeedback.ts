export class VoiceFeedback {
    speakColor(color: string): void {
        const utterance = new SpeechSynthesisUtterance(`The color is ${color}`);
        window.speechSynthesis.speak(utterance);
    }
}