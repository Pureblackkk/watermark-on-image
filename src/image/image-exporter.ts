import { IExportOptions} from 'tool-chain/options';

export class ImageExporter {
    public static export(src: HTMLCanvasElement[], exportOptions: IExportOptions) {
        const { type, quality } = exportOptions;
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