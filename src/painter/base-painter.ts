import { IPainterOptions } from 'painter/water-marker-painter';
import { getRowLenArray } from 'utils/math';

interface IPainterMetaInfo {
    width: number;
    height: number;
    rowLenArray: {
        distance: number,
        currentY: number,
        startX: number,
    }[],
    img: HTMLImageElement,
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D,
}

interface IPosition {
    x: number;
    y: number;
}

export class BasePainter {
    protected generateMetaInfo(src: HTMLImageElement, painterOptions: IPainterOptions): IPainterMetaInfo {
        // Get options
        const { markRotation, maxMarkerHeight, markSpacing } = painterOptions;

        // Get canvas and context
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas Context Create Failed');

        // Get width and height
        const { height, width } = src;
        canvas.width = width;
        canvas.height = height;

        // Draw the image on canvas
        ctx.drawImage(src, 0, 0);

        // Get row length array based on the image size and cross axis
        // TODO: handle string and number problem
        const rowLenArray = getRowLenArray(
            width,
            height,
            markRotation,
            maxMarkerHeight || 0,
            markSpacing.v as number,
        );

        // Return meta info
        return {
            width,
            height,
            img: src,
            canvas,
            ctx,
            rowLenArray,
        };
    }

    protected generateDrawPositionsArray(metaInfo: IPainterMetaInfo, itemsWidth: number[], painterOptions: IPainterOptions) {
        const { rowLenArray } = metaInfo;
        const horizontalSpacing = (painterOptions.markSpacing.h ?? 0) as number;

        // Loop to find exact position
        const positionsArray: (IPosition & { itemIndex: number })[] = [];
        let markItemIndex = 0;

        rowLenArray.forEach(({ distance, currentY, startX }) => {
            let itemStartX = startX;
            let currentRelativePosition = 0;
            
            while (currentRelativePosition < distance) {
                positionsArray.push({
                    x: itemStartX,
                    y: currentY,
                    itemIndex: markItemIndex,
                });

                // Update
                const currentTotalWidth = itemsWidth[markItemIndex] + horizontalSpacing;
                itemStartX += currentTotalWidth;
                currentRelativePosition += currentTotalWidth;
                markItemIndex = (markItemIndex + 1) % itemsWidth.length;
            }
        });

        return positionsArray;
    }

    protected drawTextAtPosition(
        ctx: CanvasRenderingContext2D,
        text: string,
        position: IPosition
    ) {
        const { x, y } = position;
        ctx.fillText(text, x, y);
    }

    protected drawImageAtPosition(
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        position: IPosition
    ) {
        const { x, y } = position;
        ctx.drawImage(image, x, y);
    }

    protected setContextProperty(ctx: CanvasRenderingContext2D, options: IPainterOptions) {
        const { markOpicity, markTextOptions, markRotation } = options;
        const { color, font } = markTextOptions;

        // Rotate
        ctx.rotate(markRotation);

        // Set opicity
        ctx.globalAlpha = markOpicity;

        // Set color and font
        ctx.fillStyle = color!;
        ctx.font = font!;
    }
}