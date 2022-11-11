import { getRowLenArray, rangeNumValue } from 'src/utils/math';

const getPIFromDeg = (deg: number) => {
    return deg * Math.PI / 180;
}

const getRowLenObject = (currentY: number, distance: number, startX: number) => {
    return {
        currentY,
        distance,
        startX,
    };
}

describe('Math Utils Test', () => {
    describe('Get Row Length Array Function', () => {
        const width = 10;
        const height = 10
        const maxHeight = 1;
        const verticalSpacing = 1;
        const diagLen = width * Math.sqrt(2);
        const halfDaigLen = diagLen / 2;

        it('Rotation 0 deg', () => {
            expect(getRowLenArray(
                width,
                height,
                getPIFromDeg(0),
                maxHeight,
                verticalSpacing,
            )).toEqual([
                [2, 10, 0],
                [4, 10, 0],
                [6, 10, 0],
                [8, 10, 0],
            ].map(([y, distance, x]) => getRowLenObject(y, distance, x)));
        });

        it('Rotation 180 deg', () => {
            expect(getRowLenArray(
                width,
                height,
                getPIFromDeg(180),
                maxHeight,
                verticalSpacing,
            )).toEqual([
                [-2, 10, -10],
                [-4, 10, -10],
                [-6, 10, -10],
                [-8, 10, -10],
            ].map(([y, distance, x]) => getRowLenObject(y, distance, x)));
        });

        it('Rotation 90 deg', () => {
            expect(getRowLenArray(
                width,
                height,
                getPIFromDeg(90),
                maxHeight,
                verticalSpacing,
            )).toEqual([
                [-8, 10, 0],
                [-6, 10, 0],
                [-4, 10, 0],
                [-2, 10, 0],
                [0, 10, 0],
            ].map(([y, distance, x]) => getRowLenObject(y, distance, x)));
        });

        it('Rotation 45 deg', () => {
            const rowLenRes = getRowLenArray(
                width,
                height,
                getPIFromDeg(45),
                maxHeight,
                verticalSpacing,
            );

            const expectRowLenRes = [
                [-halfDaigLen + 2, 4, -2 + halfDaigLen],
                [-halfDaigLen + 4, 8, -4 + halfDaigLen],
                [-halfDaigLen + 6, 12, -6 + halfDaigLen],
                [-halfDaigLen + 8, 2 * (diagLen - 8), -8 + halfDaigLen],
                [-halfDaigLen + 10, 2 * (diagLen - 10), -10 + halfDaigLen],
                [-halfDaigLen + 12, 2 * (diagLen - 12), -12 + halfDaigLen],
                [-halfDaigLen + 14, 2 * (diagLen - 14), -14 + halfDaigLen],
            ].map(([y, distance, x]) => getRowLenObject(y, distance, x)); 

            rowLenRes.forEach(({currentY, startX, distance}, index) => {
                const { currentY: expectedY, startX: expectedStartX, distance: expectDistance } = expectRowLenRes[index];
                expect((expectedY - currentY) < 1e-5).toEqual(true);
                expect((expectedStartX - startX) < 1e-5).toEqual(true);
                expect((expectDistance - distance) < 1e-5).toEqual(true);
            });
        });

        it('Rotation 135 deg', () => {
            const rowLenRes = getRowLenArray(
                width,
                height,
                getPIFromDeg(135),
                maxHeight,
                verticalSpacing,
            );

            const expectRowLenRes = [
                [-2, 4, -2],
                [-4, 8, -4],
                [-6, 12, -6],
                [-8, 2 * (diagLen - 8), 8 - diagLen],
                [-10, 2 * (diagLen - 10), 10 - diagLen],
                [-12, 2 * (diagLen - 12), 12 - diagLen],
                [-14, 2 * (diagLen - 14), 14 - diagLen],
            ].map(([y, distance, x]) => getRowLenObject(y, distance, x)); 
            
            rowLenRes.forEach(({currentY, startX, distance}, index) => {
                const { currentY: expectedY, startX: expectedStartX, distance: expectDistance } = expectRowLenRes[index];
                expect((expectedY - currentY) < 1e-5).toEqual(true);
                expect((expectedStartX - startX) < 1e-5).toEqual(true);
                expect((expectDistance - distance) < 1e-5).toEqual(true);
            });
        });
    });

    describe('Get Ranged Value Function', () => {
        it.each([
            { min: 1, max: 2, val: 5, expect: 2 },
            { min: -1, max: 2, val: -5, expect: -1 },
            { min: 1, max: 2, val: 1.5, expect: 1.5 },
            { min: 1, max: 2, val: 2, expect: 2 },
            { min: 1, max: 2, val: 1, expect: 1 },
        ])('%j', ({ min, max, val, expect: expectVal }) => {
            expect(rangeNumValue(min, max, val)).toEqual(expectVal);
        })
    });
});