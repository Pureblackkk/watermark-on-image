import { ExportType, IMarkTextOptions } from 'tool-chain/options';

export interface IToolChain {
    loadSrc: (src: string | HTMLImageElement | (string | HTMLImageElement)[]) => IToolChain;
    markImage: (mark: string | HTMLImageElement | (string | HTMLImageElement)[]) => IToolChain;
    markText: (mark: string | string[], textOptions?: IMarkTextOptions) => IToolChain;
    markRotation: (rotation: number | string) => IToolChain;
    markOpicity: (opicity: number) => IToolChain;
    markSpacing: (vertical: string | number, horizontal: string | number) => IToolChain;
    getImage: (
        type?: ExportType, 
        quality?: number, 
        size?: {width?: number, height?: number}
    ) => Promise<string[] | HTMLCanvasElement[]>;
}

