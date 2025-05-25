class CameraScanner {
    private videoElement: HTMLVideoElement;
    private isScanning: boolean;

    constructor(videoElementId: string) {
        this.videoElement = document.getElementById(videoElementId) as HTMLVideoElement;
        this.isScanning = false;
    }

    public startScanning(): void {
        if (this.isScanning) return;

        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                this.videoElement.srcObject = stream;
                this.videoElement.play();
                this.isScanning = true;
            })
            .catch((error) => {
                console.error("Error accessing the camera: ", error);
            });
    }

    public stopScanning(): void {
        if (!this.isScanning) return;

        const stream = this.videoElement.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());
        this.videoElement.srcObject = null;
        this.isScanning = false;
    }
}

export default CameraScanner;