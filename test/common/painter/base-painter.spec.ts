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
            [0, 2, 0],
            [3, 2, 1],
            [8, 2, 2],
            [0, 4, 3],
            [9, 4, 0],
            [0, 6, 1],
            [5, 6, 2],
            [0, 8, 3],
            [9, 8, 0],
        ].map(([x, y, itemIndex]) => generatePositionArrayObject(x, y, itemIndex));

        //@ts-ignore
        const positionArray = testBasePainer.generateDrawPositionsArray(mockMetaInfo, mockItemsWidth, painterOptions);
        console.log(positionArray);
        positionArray.forEach(({x, y, itemIndex}, index) => {
            const { x: expectedX, y: expectedY, itemIndex: expectedItemIndex } = expectedPositionArray[index];
            expect(x).toEqual(expectedX);
            expect(y).toEqual(expectedY);
            expect(itemIndex).toEqual(expectedItemIndex);
        });
    });
})