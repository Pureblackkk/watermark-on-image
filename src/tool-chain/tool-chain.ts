import { BaseToolChains } from 'tool-chain/base-tool-chains';
import { IToolChain } from 'tool-chain/tool-chain.interface';
import { mergeOptions } from 'utils/merge-options';
import { ImageLoader } from 'image/image-loader';
import { ImageExporter } from 'image/image-exporter';
import { WaterMarkerPainter } from 'painter/water-marker-painter';
import { 
    preHandleRotation,
    preHandleMarkSpacing,
    preHandleArrayForm,
    preHandleOpicity,
    preHandleExport,
} from 'tool-chain/pre-handle';
import {
    OptionType,
    ExportType,
    IWaterMarkOptions,
    IMarkTextOptions,
    defaultWaterMarkOptions,
} from 'tool-chain/options';

export class WaterMarkkk extends BaseToolChains<OptionType> implements IToolChain {
    private recievedOptions: Partial<IWaterMarkOptions> = {};

    /**
     * Set source image
     * Recieve a single source image or a array of images
     */
    public loadSrc(src: string | string[]) {
        const runFunc = () => {
            this.recievedOptions['srcImage'] = preHandleArrayForm(src);
        }
        return this.addIntoFuncArray(OptionType.LoadSrc, runFunc);
    }

    public markImage(mark: string | HTMLImageElement | (string | HTMLImageElement)[]) {
        const runFunc = () => {
            this.recievedOptions['markImage'] = preHandleArrayForm(mark);
        }
        return this.addIntoFuncArray(OptionType.MarkImage, runFunc);
    }

    public markText(mark: string | string[], textOptions?: IMarkTextOptions) {
        const runFunc = () => {
            this.recievedOptions['markText'] = preHandleArrayForm(mark);
            this.recievedOptions['markTextOptions'] = textOptions;
        }
        return this.addIntoFuncArray(OptionType.MarkText, runFunc);
    }

    public markRotation(markRotation: number | string) {
        const runFunc = () => {
            this.recievedOptions['markRotation'] = preHandleRotation(markRotation);
        }
        return this.addIntoFuncArray(OptionType.MarkCrossAxis, runFunc);
    }

    public markOpicity(opicity: number) {
        const runFunc = () => {
            this.recievedOptions['markOpicity'] = preHandleOpicity(opicity);
        }
        return this.addIntoFuncArray(OptionType.MarkOpicity, runFunc);
    }

    public markSpacing(vertical: number | string, horizontal: number | string) {
        const runFunc = () => {
            this.recievedOptions['markSpacing'] = preHandleMarkSpacing({
                v: vertical,
                h: horizontal,
            });
        }
        return this.addIntoFuncArray(OptionType.MarkSpacing, runFunc);
    }

    public async getImage(
        type?: ExportType, 
        quality?: number, 
        size?: { width?: number, height?: number}
    ) {
        // Handle recieved property
        this.addIntoFuncArray(OptionType.MarkSpacing, () => {
            this.recievedOptions['exportOptions'] = preHandleExport({
                type,
                quality,
                size,
            });
        });

        // Start load options and merge them with default options
        this.runNext();
        const mergedOptions = mergeOptions(defaultWaterMarkOptions, this.recievedOptions);

        // Load source image
        const sourceImageArray = await ImageLoader.loadImage(mergedOptions.srcImage);

        // Init water mark painter
        const canvasPainter = new WaterMarkerPainter(
            sourceImageArray,
            mergedOptions,
        );

        // Priority image > text
        let outputRes;
        if (mergedOptions.markImage.length > 0) {
            const markImageArray = await ImageLoader.loadImage(mergedOptions.markImage);
            outputRes = canvasPainter.markImage(markImageArray);
        } else {
            outputRes = canvasPainter.markText(mergedOptions.markText);
        }

        return ImageExporter.export(outputRes, mergedOptions.exportOptions);
    }
}