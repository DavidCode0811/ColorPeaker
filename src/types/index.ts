export interface Color {
    name: string;
    hex: string;
    rgb: {
        r: number;
        g: number;
        b: number;
    };
}

export interface ScanResult {
    color: Color;
    timestamp: Date;
    imageUrl: string;
}