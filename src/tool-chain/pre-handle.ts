import { IMarkSpacingOptions, ExportType } from 'tool-chain/options';
import { rangeNumValue } from 'utils/math';

/**
 * Convert rotation into the unit of Math.PI
 */
export function preHandleRotation(rotation: string | number): number {
    // Process for string type
    if (typeof rotation === 'string') {
        const degRegx = /^(-?)((\d+)(\.\d+)?)(\s*)deg$/i;
        const piRegx = /^(-?)((\d+)(\.\d+)?)(\s*)pi$/i;
        const numRegx = /^(-?)((\d+)(\.\d+)?)$/i;
        let matchRes;
        let numericalRotation;

        if (matchRes = rotation.match(degRegx)) {
            // Match for 'xxx.xxx deg'
            const numericalVal = parseFloat(matchRes[2]);
            numericalRotation = numericalVal * Math.PI / 180;
            (matchRes[1] === '-') && (numericalRotation *= -1);
            return numericalRotation;
        } else if (matchRes = rotation.match(piRegx)) {
            // Match for 'xxx.xxx pi'
            const numericalVal = parseFloat(matchRes[2]);
            numericalRotation = numericalVal * Math.PI;
            (matchRes[1] === '-') && (numericalRotation *= -1);
            return numericalRotation;
        } else if (matchRes = rotation.match(numRegx)) {
            // Match for pure string number
            numericalRotation = parseFloat(matchRes[2]);
            (matchRes[1] === '-') && (numericalRotation *= -1);
            return numericalRotation;
        } else {
            throw new Error('Mark Rotation Set Failed');
        }
    } else if (typeof rotation === 'number') {
        return rotation;
    } else {
        throw new Error('Mark Rotation Set Failed');
    }
}

/**
 * Regulate opicity to 0 - 1
 */
export function preHandleOpicity(opicity: number) {
    return rangeNumValue(0, 1, opicity);
}

/**
 * Regulate mark spacing
 */
export function preHandleMarkSpacing(
    markSpacing: {
        v?: string | number,
        h?: string | number,
    }
): IMarkSpacingOptions {
    const { h, v } = markSpacing;
    const generalSpacingHandle = (spacing: string | number | undefined) => {
        if (spacing === undefined) return spacing;

        if (typeof spacing === 'string') {
            const matchRegx = /^(-?)((\d+)(\.\d+)?)(\s*)?px$/i;
            if (!matchRegx.test(spacing)) throw new Error('Mark Spacing Set Failed');
            const matchRes = spacing.match(matchRegx)!;
            return matchRes[1] === '-' ? (-Number(matchRes[2])) : Number(matchRes[2]);
        }
        
        return spacing;
    };

    return {
        h: generalSpacingHandle(h),
        v: generalSpacingHandle(v),
    };
}

/**
 * Form recieved arguments into array
 */
export function preHandleArrayForm<T>(arg: T | T[]) {
    if (Array.isArray(arg)) {
        return arg;
    } else {
        return [arg];
    }
}

/**
 * Prehandle export options
 */
export function preHandleExport(options: {
        type?: ExportType, 
        quality?: number, 
        size?: { width?: number, height?: number }
}) {
    const { type, quality } = options;
    return {
        type: type ?? 'png',
        quality: (quality === undefined) ? 1.0 : rangeNumValue(0, 1, quality),
    };
}