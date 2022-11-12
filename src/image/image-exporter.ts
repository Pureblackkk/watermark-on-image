import { IExportOptions } from 'tool-chain/options';

export class ImageExporter {
    public static export(src: HTMLCanvasElement[], exportOptions: IExportOptions) {
        const { type, quality, size } = exportOptions;

        if (!!size) {
            const { width, height } = size;
            src = src.map((canvas) => ImageExporter.reSize(canvas, width, height));
        }

        switch (type) {
            case 'canvas':
                return ImageExporter.toCanvas(src);
            case 'jpeg':
                return ImageExporter.toJPG(src, quality);
            case 'webp':
                return ImageExporter.toWEBP(src, quality);
            case 'png':
            default:
                return ImageExporter.toPNG(src, quality);
        }
    }

    private static reSize(canvas: HTMLCanvasElement, width?: number, height?: number) {
        if (width === undefined && height === undefined) return canvas;
        const newWidth = width ?? canvas.width;
        const newHeight = height ?? canvas.height;
        const newCanvas = document.createElement('canvas');
        newCanvas.width = newWidth;
        newCanvas.height = newHeight;
        const newCtx = newCanvas.getContext('2d');
        newCtx?.drawImage(canvas, 
            0, 0,
            canvas.width, canvas.height,
            0, 0,
            newWidth, newHeight,
        );
        return newCanvas;
    }

    private static toCanvas(src: HTMLCanvasElement[]) {
        return src;
    }

    private static toPNG(src: HTMLCanvasElement[], quality: number) {
        return src.map((canvas) => canvas.toDataURL(
            'image/png',
            quality,
        ));
    }

    private static toJPG(src: HTMLCanvasElement[], quality: number) {
        return src.map((canvas) => canvas.toDataURL(
            'image/jpg',
            quality,
        ));
    }

    private static toWEBP(src: HTMLCanvasElement[], quality: number) {
        return src.map((canvas) => canvas.toDataURL(
            'image/webp',
            quality,
        ));
    }
}