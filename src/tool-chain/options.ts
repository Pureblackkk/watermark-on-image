export enum OptionType {
    LoadSrc,
    MarkImage,
    MarkText,
    MarkCrossAxis,
    MarkOpicity,
    MarkSpacing,
    MarkFill,
    Scale,
    GetImage,
}

export type ExportType = 'canvas' | 'png' | 'jpeg' | 'webp';

export interface IMarkTextOptions {
    color?: string,
    font?: string,
}

export interface IMarkSpacingOptions {
    v?: number;
    h?: number;
}

export interface IExportOptions {
    type: ExportType;
    quality: number;
    size?: {
        width?: number,
        height?: number,
    },
}

export interface IWaterMarkOptions {
    srcImage: (string | HTMLImageElement)[],
    markImage: (string | HTMLImageElement)[],
    markText: string[],
    markTextOptions: IMarkTextOptions,
    markRotation: number,
    markOpicity: number,
    markSpacing: IMarkSpacingOptions,
    exportOptions: IExportOptions
}

export const defaultWaterMarkOptions: IWaterMarkOptions = {
    srcImage: [],
    markImage: [],
    markText: ['WaterMarkkk'],
    markTextOptions: {
        color: 'black',
        font: 'bold 24px serif'
    },
    markRotation: 0,
    markOpicity: 1.0,
    markSpacing: {
        v: 20,
        h: 20,
    },
    exportOptions: {
        type: 'png',
        quality: 1,
    },
};