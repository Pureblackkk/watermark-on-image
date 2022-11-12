import { isBrowser, isNode } from 'utils/env';

export class ImageLoader {
    public static async loadImage(src: (string | HTMLImageElement)[] | undefined) {
        if (src === undefined) throw Error('No Image Input for Load');

        const loadArray = Array.isArray(src) ? src : [src];
        if (isBrowser()) {
            return await ImageLoader.browserLoad(loadArray);
        }

        if (isNode()) {
            return await ImageLoader.nodeLoad(loadArray);
        }

        throw Error('Unknown Environment');
    }

    private static async browserLoad(src: (string | HTMLImageElement)[]) {
        const loadPromiseArray: Promise<HTMLImageElement>[] = [];

        for (let urlPath of src) {
            loadPromiseArray.push(new Promise((res, rej) => {
                if (urlPath instanceof Image) {
                    res(urlPath);
                } else {
                    const img = new Image();
                    img.onload = () => res(img);
                    img.onerror = () => rej(new Error('Load Image Failed'));
                    img.src = urlPath;
                }
            }));
        }

        return Promise.all<HTMLImageElement>(loadPromiseArray);
    }

    // TODO: load under node environment
    private static async nodeLoad(src: (string | HTMLImageElement)[]) {
        return [];
    }
}