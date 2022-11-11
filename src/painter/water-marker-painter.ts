import { IWaterMarkOptions } from 'tool-chain/options';
import { BasePainter } from 'painter/base-painter';
import { getTextWidth, getImageWidth } from 'utils/draw';

export type IPainterOptions = Omit<
    IWaterMarkOptions,
    'srcImage' | 'markImage' | 'markText'
> & {
    maxMarkerHeight?: number
};

interface IWaterMarkPainter {
    markText: (texts: string[]) => HTMLCanvasElement[];
    markImage: (images: HTMLImageElement[]) => HTMLCanvasElement[];
}

export class WaterMarkerPainter extends BasePainter implements IWaterMarkPainter  {
    private srcArray: HTMLImageElement[];
    private painterOptions: IPainterOptions;

    constructor(srcArray: HTMLImageElement[], painterOptions: IPainterOptions) {
        super();
        this.srcArray = srcArray;
        this.painterOptions = painterOptions;
    }

    public markText(texts: string[]) {
        // Add the max height property into options
        this.setMaxHeightForText();
        
        // Set general mark callback
        const getItemWidthFunc = getTextWidth;
        const args = [this.painterOptions.markTextOptions.font!];

        // Go into general mark
        return this.generalMark<string>(
            texts,
            { getItemWidthFunc, args },
            this.drawTextAtPosition,
        );
    }

    public markImage(images: HTMLImageElement[]) {
        // Add the max height property into options
        this.setMaxHeightForImage(images);

        // Set general mark callback
        const getItemWidthFunc = getImageWidth;
        const args: any[] = [];

        // Go into general mark
        return this.generalMark<HTMLImageElement>(
            images,
            { getItemWidthFunc, args },
            this.drawImageAtPosition,
        );
    }

    private setMaxHeightForText() {
        const { font } = this.painterOptions.markTextOptions;
        const fontMatchResult = font?.match(/(\d+)(\s*)?px/i);
        if (!fontMatchResult) throw new Error('Font Size Not Found');
        this.painterOptions.maxMarkerHeight = Number(fontMatchResult[1]);
    }

    private setMaxHeightForImage(images: HTMLImageElement[]) {
        let maxHeight = 0;
        images.forEach((image) => {
            image.height > maxHeight && (maxHeight = image.height);
        });
        this.painterOptions.maxMarkerHeight = maxHeight
    }

    private generalMark<T>(
        items: T[], 
        getItemWidth: {
            getItemWidthFunc: (item: T, ...args: any) => number | undefined,
            args: any[],
        },
        drawItemFunc: any,
    ) {
        // Get meta info array
        const metaInfoArray = this.srcArray.map((src) => {
            return this.generateMetaInfo(src, this.painterOptions);
        });

        // Get item width array
        const { getItemWidthFunc, args } = getItemWidth;
        const undefinedItemIndexMap = new Set();
        const itemWidthArray = items.map((item) => {
            return getItemWidthFunc(item, ...args);
        }).filter((val, index) => {
            if (val === undefined) {
                undefinedItemIndexMap.add(index);
                return false;
            }
            return true;
        }) as number[];
        items = items.filter((val, index) => !undefinedItemIndexMap.has(index));

        // Mark Item
        metaInfoArray.forEach((metaInfo, index) => {
            // Prepare for mark
            const drawPositionsArray = this.generateDrawPositionsArray(
                metaInfo,
                itemWidthArray,
                this.painterOptions,
            );

            // Set context
            this.setContextProperty(metaInfo.ctx, this.painterOptions);

            // Mark text
            drawPositionsArray.forEach(({ x, y, itemIndex }) => {
                drawItemFunc(
                    metaInfo.ctx,
                    items[itemIndex],
                    { x , y }
                );
            });
        });

        // Return canvas list
        return metaInfoArray.map(({ canvas }) => canvas);
    }
}