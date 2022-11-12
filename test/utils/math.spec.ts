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
                [1, 10, 0],
                [3, 10, 0],
                [5, 10, 0],
                [7, 10, 0],
                [9, 10, 0],
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
                [-1, 10, -10],
                [-3, 10, -10],
                [-5, 10, -10],
                [-7, 10, -10],
                [-9, 10, -10],
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
                [-9, 10, 0],
                [-7, 10, 0],
                [-5, 10, 0],
                [-3, 10, 0],
                [-1, 10, 0],
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
                [-halfDaigLen + 1, 2, -1 + halfDaigLen],
                [-halfDaigLen + 3, 6, -3 + halfDaigLen],
                [-halfDaigLen + 5, 10, -5 + halfDaigLen],
                [-halfDaigLen + 7, 14, -7 + halfDaigLen],
                [-halfDaigLen + 9, 2 * (diagLen - 9), 9 - halfDaigLen],
                [-halfDaigLen + 11, 2 * (diagLen - 11), 11 - halfDaigLen],
                [-halfDaigLen + 13, 2 * (diagLen - 13), 13 - halfDaigLen],
            ].map(([y, distance, x]) => getRowLenObject(y, distance, x)); 

            rowLenRes.forEach(({currentY, startX, distance}, index) => {
                const { currentY: expectedY, startX: expectedStartX, distance: expectDistance } = expectRowLenRes[index];
                expect(Math.abs(expectedY - currentY) < 1e-5).toEqual(true);
                expect(Math.abs(expectedStartX - startX) < 1e-5).toEqual(true);
                expect(Math.abs(expectDistance - distance) < 1e-5).toEqual(true);
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
                [-1, 2, -1],
                [-3, 6, -3],
                [-5, 10, -5],
                [-7, 14, -7],
                [-9, 2 * (diagLen - 9), 9 - diagLen],
                [-11, 2 * (diagLen - 11), 11 - diagLen],
                [-13, 2 * (diagLen - 13), 13 - diagLen],
            ].map(([y, distance, x]) => getRowLenObject(y, distance, x));

            rowLenRes.forEach(({currentY, startX, distance}, index) => {
                const { currentY: expectedY, startX: expectedStartX, distance: expectDistance } = expectRowLenRes[index];
                expect(Math.abs(expectedY - currentY) < 1e-5).toEqual(true);
                expect(Math.abs(expectedStartX - startX) < 1e-5).toEqual(true);
                expect(Math.abs(expectDistance - distance) < 1e-5).toEqual(true);
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