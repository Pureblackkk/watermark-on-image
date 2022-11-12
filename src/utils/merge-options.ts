function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeOptions<T>(deafult: T, target: Partial<T>): T {
    if (isObject(deafult) && isObject(target)) {
        let res = { ...deafult };
        for (const key in target) {
            if (isObject(target[key])) {
                res[key] = mergeOptions(deafult[key], target[key]!);
            } else if (target[key] !== undefined) {
                // When target is undefined, use default value
                Object.assign(res as {}, { [key]: target[key] });
            }
        }
        return res;
    } else {
        if (target === undefined) {
            return deafult;
        } else {
            return target as T;
        }
    }
}