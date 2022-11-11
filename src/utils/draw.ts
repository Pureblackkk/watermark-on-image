import { isBrowser, isNode } from 'utils/env';

export function getTextWidth(text: string, font: string) {
    if (isBrowser()) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas Context not found');
        ctx.font = font;
        return ctx.measureText(text).width;
    }
}

export function getImageWidth(img: HTMLImageElement) {
    return img.width;
}