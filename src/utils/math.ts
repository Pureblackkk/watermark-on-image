export function getRowLenArray(
    width: number,
    height: number,
    rotation: number,
    maxHeight: number,
    verticalSpacing: number,
) {
    // Reduce rotation within 0 - 90 due to symmetry
    let over90Flag = false;
    let symmetryRotation: number = rotation;
    if (rotation > Math.PI / 2) { 
        symmetryRotation = Math.PI - rotation;
        over90Flag = true;
    }

    const cosRotation = Math.cos(symmetryRotation);
    const sinRotation = Math.sin(symmetryRotation);
    const tanRotation = Math.tan(symmetryRotation);
    const diagonalTan = height / width;
    const rotatedYMin = - width * sinRotation;
    const rotatedYMax = height * cosRotation;
    const isDiagonalLargerThanRotation = diagonalTan >= tanRotation;
    const rotatedMiddleLow = isDiagonalLargerThanRotation ? 0 : (-sinRotation * width + cosRotation * height);
    const rotatedMiddleHigh = isDiagonalLargerThanRotation ? (-sinRotation * width + cosRotation * height) : 0;
    const realVerticalSpacing = maxHeight + verticalSpacing;

    // Loop find row array length
    let rowLenArray = [];
    let currentY = rotatedYMin + verticalSpacing;

    while (currentY < rotatedYMax) {
        let distance: number;
        let startX: number;

        if (rotation === (Math.PI / 2)) {
            distance = height;
            startX = 0;
        } else if (rotation === 0) {
            distance = width;
            startX = 0;
        } else if (rotation === Math.PI) {
            distance = width;
            startX = -width;
        } else if (currentY >= rotatedYMin && currentY < rotatedMiddleLow) {
            distance = (currentY - rotatedYMin) / tanRotation + (currentY - rotatedYMin) * tanRotation;
            startX = over90Flag ? 
            (-(currentY - rotatedYMin) / tanRotation) 
            : Math.abs(currentY) / tanRotation;
        } else if (currentY >= rotatedMiddleLow && currentY <= rotatedMiddleHigh) {
            distance = width / cosRotation;
            startX = over90Flag ?
            ((currentY - rotatedYMin) * tanRotation - distance)
            : (currentY * tanRotation);
        } else {
            distance = (rotatedYMax - currentY) / tanRotation + (rotatedYMax - currentY) * tanRotation;
            const correspondRotatedMiddle = isDiagonalLargerThanRotation ? rotatedMiddleHigh : rotatedMiddleLow;
            startX = over90Flag ?
            -(distance + ((currentY - correspondRotatedMiddle) / tanRotation) - height * sinRotation)
            : (currentY * tanRotation); 
        }

        rowLenArray.push({ 
            distance,
            startX,
            currentY: over90Flag ? - (currentY - rotatedYMin) : currentY,
        });

        currentY += realVerticalSpacing;
    }

    return rowLenArray;
}

export function rangeNumValue(min: number, max: number, value: number) {
    if (value <= min) return min;
    if (value >= max) return max;
    return value;
}