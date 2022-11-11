import { getTextWidth, getImageWidth } from 'src/utils/draw'; 

describe('Draw Utils Test', () => {
    it.each([
        { text: 'Hi', font: '', expected: 2 },
        { text: 'this is test', font: 'italic 5px', expected: 12 },
        { text: 'word for test', font: 'serif 10px', expected: 13 },
        { text: 'to calculate its', font: 'sans-serif 2px', expected: 16 },
        { text: 'width if you want', font: 'Arial 8px', expected: 17 },
    ])('Get text width under browser %j', ({ text, font, expected }) => {
        // Note here the width is not the actual width
        expect(getTextWidth(text, font)).toEqual(expected);
    });

    it.each([
        { imgWidth: 2, expectd: 2 },
    ])('Get image width', ({ imgWidth, expectd }) => {
        const testImg = new Image();
        testImg.width = imgWidth;
        expect(getImageWidth(testImg)).toEqual(expectd);
    });
});