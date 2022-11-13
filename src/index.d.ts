declare class BaseToolChains<T> {
    private functionChainsArray;
    protected addIntoFuncArray(type: T, func: (() => void)): this;
    protected runNext(): void;
}

declare enum OptionType {
    LoadSrc = 0,
    MarkImage = 1,
    MarkText = 2,
    MarkCrossAxis = 3,
    MarkOpicity = 4,
    MarkSpacing = 5,
    MarkFill = 6,
    Scale = 7,
    GetImage = 8
}
declare type ExportType = 'canvas' | 'png' | 'jpeg' | 'webp';
interface IMarkTextOptions {
    color?: string;
    font?: string;
}

interface IToolChain {
    loadSrc: (src: string | HTMLImageElement | (string | HTMLImageElement)[]) => IToolChain;
    markImage: (mark: string | HTMLImageElement | (string | HTMLImageElement)[]) => IToolChain;
    markText: (mark: string | string[], textOptions?: IMarkTextOptions) => IToolChain;
    markRotation: (rotation: number | string) => IToolChain;
    markOpicity: (opicity: number) => IToolChain;
    markSpacing: (vertical: string | number, horizontal: string | number) => IToolChain;
    getImage: (type?: ExportType, quality?: number, size?: {
        width?: number;
        height?: number;
    }) => Promise<string[] | HTMLCanvasElement[]>;
}

declare class WaterMarkkk extends BaseToolChains<OptionType> implements IToolChain {
    private recievedOptions;
    /**
     * Set source image
     * Recieve a single source image or a array of images
     */
    loadSrc(src: string | HTMLImageElement | (string | HTMLImageElement)[]): this;
    markImage(mark: string | HTMLImageElement | (string | HTMLImageElement)[]): this;
    markText(mark: string | string[], textOptions?: IMarkTextOptions): this;
    markRotation(markRotation: number | string): this;
    markOpicity(opicity: number): this;
    markSpacing(vertical: number | string, horizontal: number | string): this;
    getImage(type?: ExportType, quality?: number, size?: {
        width?: number;
        height?: number;
    }): Promise<string[] | HTMLCanvasElement[]>;
}

export { WaterMarkkk };
