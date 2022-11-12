import { BasePainter } from 'src/painter/base-painter';
import { getRowLenArray } from 'src/utils/math';

const generatePositionArrayObject = (x: number, y: number, itemIndex: number) => {
    return {
        x, 
        y,
        itemIndex
    };
}

describe('Base Painter Class Test', () => {
    const testBasePainer = new BasePainter();

    it('Generate draw position based on meta info', () => {
        const mockMetaInfo = {
            rowLenArray: getRowLenArray(10, 10, 0, 1, 1),
        };
        const mockItemsWidth = [ 2, 4, 6, 8 ];
        const painterOptions = {
            markSpacing: { v: 1, h: 1, },
        };
        const expectedPositionArray = [
            [0, 1, 0],
            [3, 1, 1],
            [8, 1, 2],
            [0, 3, 3],
            [9, 3, 0],
            [0, 5, 1],
            [5, 5, 2],
            [0, 7, 3],
            [9, 7, 0],
            [0, 9, 1],
            [5, 9, 2],
        ].map(([x, y, itemIndex]) => generatePositionArrayObject(x, y, itemIndex));

        //@ts-ignore
        const positionArray = testBasePainer.generateDrawPositionsArray(mockMetaInfo, mockItemsWidth, painterOptions);
        positionArray.forEach(({x, y, itemIndex}, index) => {
            const { x: expectedX, y: expectedY, itemIndex: expectedItemIndex } = expectedPositionArray[index];
            expect(x).toEqual(expectedX);
            expect(y).toEqual(expectedY);
            expect(itemIndex).toEqual(expectedItemIndex);
        });
    });
})