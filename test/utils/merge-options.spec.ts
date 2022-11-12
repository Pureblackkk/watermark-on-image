import { mergeOptions } from 'src/utils/merge-options';

const mockDefault = {
    a: 'this is a',
    b: 'this is b',
    c: {
        c1: 'this is c1',
        c2: 'this is c2',
    },
    d: undefined,
};

describe('Merge Option Test', () => {
    it('Megre target with undefined value', () => {
        const testTarget = {
            a: 'this is mock a',
            b: undefined,
            c: {
                c1: undefined,
                c2: 'this is mock c2',
            },
            d: undefined,
        };

        //@ts-ignore
        expect(mergeOptions(mockDefault, testTarget)).toEqual({
            a: 'this is mock a',
            b: 'this is b',
            c: {
                c1: 'this is c1',
                c2: 'this is mock c2',
            },
            d: undefined,
        });
    });

    it('Merge target without undefined value', () => {
        const testTarget = {
            a: 'this is mock a',
            b: 'this is mock b',
            c: {
                c1: 'this is mock c1',
                c2: 'this is mock c2',
            },
            d: {
                d1: 'this is mock d1',
                d2: 'this is mock d2',
            }
        };

        //@ts-ignore
        expect(mergeOptions(mockDefault, testTarget)).toEqual({
            a: 'this is mock a',
            b: 'this is mock b',
            c: {
                c1: 'this is mock c1',
                c2: 'this is mock c2',
            },
            d: {
                d1: 'this is mock d1',
                d2: 'this is mock d2',
            },
        });
    });
});