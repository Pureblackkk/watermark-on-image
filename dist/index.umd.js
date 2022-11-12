(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["watermark-on-image"] = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var BaseToolChains = /** @class */ (function () {
        function BaseToolChains() {
            this.functionChainsArray = [];
        }
        BaseToolChains.prototype.addIntoFuncArray = function (type, func) {
            var _this = this;
            this.functionChainsArray.push({ type: type, func: function () {
                    func();
                    _this.runNext();
                } });
            return this;
        };
        BaseToolChains.prototype.runNext = function () {
            if (this.functionChainsArray.length === 0)
                return;
            var currentFuncForApply = this.functionChainsArray.shift().func;
            currentFuncForApply();
        };
        return BaseToolChains;
    }());

    function isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    function mergeOptions(deafult, target) {
        var _a;
        if (isObject(deafult) && isObject(target)) {
            var res = __assign({}, deafult);
            for (var key in target) {
                if (isObject(target[key])) {
                    res[key] = mergeOptions(deafult[key], target[key]);
                }
                else if (target[key] !== undefined) {
                    // When target is undefined, use default value
                    Object.assign(res, (_a = {}, _a[key] = target[key], _a));
                }
            }
            return res;
        }
        else {
            if (target === undefined) {
                return deafult;
            }
            else {
                return target;
            }
        }
    }

    function isBrowser() {
        return !!(typeof window !== 'undefined'
            && document);
    }
    function isNode() {
        return !!(typeof module !== 'undefined'
            && module.exports
            && typeof process === 'object'
            && typeof process.versions === 'object');
    }

    var ImageLoader = /** @class */ (function () {
        function ImageLoader() {
        }
        ImageLoader.loadImage = function (src) {
            return __awaiter(this, void 0, void 0, function () {
                var loadArray;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (src === undefined)
                                throw Error('No Image Input for Load');
                            loadArray = Array.isArray(src) ? src : [src];
                            if (!isBrowser()) return [3 /*break*/, 2];
                            return [4 /*yield*/, ImageLoader.browserLoad(loadArray)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            if (!isNode()) return [3 /*break*/, 4];
                            return [4 /*yield*/, ImageLoader.nodeLoad(loadArray)];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4: throw Error('Unknown Environment');
                    }
                });
            });
        };
        ImageLoader.browserLoad = function (src) {
            return __awaiter(this, void 0, void 0, function () {
                var loadPromiseArray, _loop_1, _i, src_1, urlPath;
                return __generator(this, function (_a) {
                    loadPromiseArray = [];
                    _loop_1 = function (urlPath) {
                        loadPromiseArray.push(new Promise(function (res, rej) {
                            if (urlPath instanceof Image) {
                                res(urlPath);
                            }
                            else {
                                var img_1 = new Image();
                                img_1.onload = function () { return res(img_1); };
                                img_1.onerror = function () { return rej(new Error('Load Image Failed')); };
                                img_1.src = urlPath;
                            }
                        }));
                    };
                    for (_i = 0, src_1 = src; _i < src_1.length; _i++) {
                        urlPath = src_1[_i];
                        _loop_1(urlPath);
                    }
                    return [2 /*return*/, Promise.all(loadPromiseArray)];
                });
            });
        };
        // TODO: load under node environment
        ImageLoader.nodeLoad = function (src) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, []];
                });
            });
        };
        return ImageLoader;
    }());

    var ImageExporter = /** @class */ (function () {
        function ImageExporter() {
        }
        ImageExporter.export = function (src, exportOptions) {
            var type = exportOptions.type, quality = exportOptions.quality, size = exportOptions.size;
            if (!!size) {
                var width_1 = size.width, height_1 = size.height;
                src = src.map(function (canvas) { return ImageExporter.reSize(canvas, width_1, height_1); });
            }
            switch (type) {
                case 'canvas':
                    return ImageExporter.toCanvas(src);
                case 'jpeg':
                    return ImageExporter.toJPG(src, quality);
                case 'webp':
                    return ImageExporter.toWEBP(src, quality);
                case 'png':
                default:
                    return ImageExporter.toPNG(src, quality);
            }
        };
        ImageExporter.reSize = function (canvas, width, height) {
            if (width === undefined && height === undefined)
                return canvas;
            var newWidth = width !== null && width !== void 0 ? width : canvas.width;
            var newHeight = height !== null && height !== void 0 ? height : canvas.height;
            var newCanvas = document.createElement('canvas');
            newCanvas.width = newWidth;
            newCanvas.height = newHeight;
            var newCtx = newCanvas.getContext('2d');
            newCtx === null || newCtx === void 0 ? void 0 : newCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);
            return newCanvas;
        };
        ImageExporter.toCanvas = function (src) {
            return src;
        };
        ImageExporter.toPNG = function (src, quality) {
            return src.map(function (canvas) { return canvas.toDataURL('image/png', quality); });
        };
        ImageExporter.toJPG = function (src, quality) {
            return src.map(function (canvas) { return canvas.toDataURL('image/jpg', quality); });
        };
        ImageExporter.toWEBP = function (src, quality) {
            return src.map(function (canvas) { return canvas.toDataURL('image/webp', quality); });
        };
        return ImageExporter;
    }());

    function getRowLenArray(width, height, rotation, maxHeight, verticalSpacing) {
        // Reduce rotation within 0 - 90 due to symmetry
        var over90Flag = false;
        var symmetryRotation = rotation;
        if (rotation > Math.PI / 2) {
            symmetryRotation = Math.PI - rotation;
            over90Flag = true;
        }
        var cosRotation = Math.cos(symmetryRotation);
        var sinRotation = Math.sin(symmetryRotation);
        var tanRotation = Math.tan(symmetryRotation);
        var diagonalTan = height / width;
        var rotatedYMin = -width * sinRotation;
        var rotatedYMax = height * cosRotation;
        var isDiagonalLargerThanRotation = diagonalTan >= tanRotation;
        var rotatedMiddleLow = isDiagonalLargerThanRotation ? 0 : (-sinRotation * width + cosRotation * height);
        var rotatedMiddleHigh = isDiagonalLargerThanRotation ? (-sinRotation * width + cosRotation * height) : 0;
        var realVerticalSpacing = maxHeight + verticalSpacing;
        // Loop find row array length
        var rowLenArray = [];
        var currentY = rotatedYMin + verticalSpacing;
        while (currentY < rotatedYMax) {
            var distance = void 0;
            var startX = void 0;
            if (rotation === (Math.PI / 2)) {
                distance = height;
                startX = 0;
            }
            else if (rotation === 0) {
                distance = width;
                startX = 0;
            }
            else if (rotation === Math.PI) {
                distance = width;
                startX = -width;
            }
            else if (currentY >= rotatedYMin && currentY < rotatedMiddleLow) {
                distance = (currentY - rotatedYMin) / tanRotation + (currentY - rotatedYMin) * tanRotation;
                startX = over90Flag ?
                    (-(currentY - rotatedYMin) / tanRotation)
                    : Math.abs(currentY) / tanRotation;
            }
            else if (currentY >= rotatedMiddleLow && currentY <= rotatedMiddleHigh) {
                distance = width / cosRotation;
                startX = over90Flag ?
                    ((currentY - rotatedYMin) * tanRotation - distance)
                    : (currentY * tanRotation);
            }
            else {
                distance = (rotatedYMax - currentY) / tanRotation + (rotatedYMax - currentY) * tanRotation;
                var correspondRotatedMiddle = isDiagonalLargerThanRotation ? rotatedMiddleHigh : rotatedMiddleLow;
                startX = over90Flag ?
                    -(distance + ((currentY - correspondRotatedMiddle) / tanRotation) - height * sinRotation)
                    : (currentY * tanRotation);
            }
            rowLenArray.push({
                distance: distance,
                startX: startX,
                currentY: over90Flag ? -(currentY - rotatedYMin) : currentY,
            });
            currentY += realVerticalSpacing;
        }
        return rowLenArray;
    }
    function rangeNumValue(min, max, value) {
        if (value <= min)
            return min;
        if (value >= max)
            return max;
        return value;
    }

    var BasePainter = /** @class */ (function () {
        function BasePainter() {
        }
        BasePainter.prototype.generateMetaInfo = function (src, painterOptions) {
            // Get options
            var markRotation = painterOptions.markRotation, maxMarkerHeight = painterOptions.maxMarkerHeight, markSpacing = painterOptions.markSpacing;
            // Get canvas and context
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            if (!ctx)
                throw new Error('Canvas Context Create Failed');
            // Get width and height
            var height = src.height, width = src.width;
            canvas.width = width;
            canvas.height = height;
            // Draw the image on canvas
            ctx.drawImage(src, 0, 0);
            // Get row length array based on the image size and cross axis
            var rowLenArray = getRowLenArray(width, height, markRotation, maxMarkerHeight || 0, markSpacing.v);
            // Return meta info
            return {
                width: width,
                height: height,
                img: src,
                canvas: canvas,
                ctx: ctx,
                rowLenArray: rowLenArray,
            };
        };
        BasePainter.prototype.generateDrawPositionsArray = function (metaInfo, itemsWidth, painterOptions) {
            var _a;
            var rowLenArray = metaInfo.rowLenArray;
            var horizontalSpacing = ((_a = painterOptions.markSpacing.h) !== null && _a !== void 0 ? _a : 0);
            // Loop to find exact position
            var positionsArray = [];
            var markItemIndex = 0;
            rowLenArray.forEach(function (_a) {
                var distance = _a.distance, currentY = _a.currentY, startX = _a.startX;
                var itemStartX = startX;
                var currentRelativePosition = 0;
                while (currentRelativePosition < distance) {
                    positionsArray.push({
                        x: itemStartX,
                        y: currentY,
                        itemIndex: markItemIndex,
                    });
                    // Update
                    var currentTotalWidth = itemsWidth[markItemIndex] + horizontalSpacing;
                    itemStartX += currentTotalWidth;
                    currentRelativePosition += currentTotalWidth;
                    markItemIndex = (markItemIndex + 1) % itemsWidth.length;
                }
            });
            return positionsArray;
        };
        BasePainter.prototype.drawTextAtPosition = function (ctx, text, position) {
            var x = position.x, y = position.y;
            ctx.fillText(text, x, y);
        };
        BasePainter.prototype.drawImageAtPosition = function (ctx, image, position) {
            var x = position.x, y = position.y;
            ctx.drawImage(image, x, y);
        };
        BasePainter.prototype.setContextProperty = function (ctx, options) {
            var markOpicity = options.markOpicity, markTextOptions = options.markTextOptions, markRotation = options.markRotation;
            var color = markTextOptions.color, font = markTextOptions.font;
            // Rotate
            ctx.rotate(markRotation);
            // Set opicity
            ctx.globalAlpha = markOpicity;
            // Set color and font
            ctx.fillStyle = color;
            ctx.font = font;
        };
        return BasePainter;
    }());

    function getTextWidth(text, font) {
        if (isBrowser()) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            if (!ctx)
                throw new Error('Canvas Context not found');
            ctx.font = font;
            return ctx.measureText(text).width;
        }
    }
    function getImageWidth(img) {
        return img.width;
    }

    var WaterMarkerPainter = /** @class */ (function (_super) {
        __extends(WaterMarkerPainter, _super);
        function WaterMarkerPainter(srcArray, painterOptions) {
            var _this = _super.call(this) || this;
            _this.srcArray = srcArray;
            _this.painterOptions = painterOptions;
            return _this;
        }
        WaterMarkerPainter.prototype.markText = function (texts) {
            // Add the max height property into options
            this.setMaxHeightForText();
            // Set general mark callback
            var getItemWidthFunc = getTextWidth;
            var args = [this.painterOptions.markTextOptions.font];
            // Go into general mark
            return this.generalMark(texts, { getItemWidthFunc: getItemWidthFunc, args: args }, this.drawTextAtPosition);
        };
        WaterMarkerPainter.prototype.markImage = function (images) {
            // Add the max height property into options
            this.setMaxHeightForImage(images);
            // Set general mark callback
            var getItemWidthFunc = getImageWidth;
            var args = [];
            // Go into general mark
            return this.generalMark(images, { getItemWidthFunc: getItemWidthFunc, args: args }, this.drawImageAtPosition);
        };
        WaterMarkerPainter.prototype.setMaxHeightForText = function () {
            var font = this.painterOptions.markTextOptions.font;
            var fontMatchResult = font === null || font === void 0 ? void 0 : font.match(/(\d+)(\s*)?px/i);
            if (!fontMatchResult)
                throw new Error('Font Size Not Found');
            this.painterOptions.maxMarkerHeight = Number(fontMatchResult[1]);
        };
        WaterMarkerPainter.prototype.setMaxHeightForImage = function (images) {
            var maxHeight = 0;
            images.forEach(function (image) {
                image.height > maxHeight && (maxHeight = image.height);
            });
            this.painterOptions.maxMarkerHeight = maxHeight;
        };
        WaterMarkerPainter.prototype.generalMark = function (items, getItemWidth, drawItemFunc) {
            var _this = this;
            // Get meta info array
            var metaInfoArray = this.srcArray.map(function (src) {
                return _this.generateMetaInfo(src, _this.painterOptions);
            });
            // Get item width array
            var getItemWidthFunc = getItemWidth.getItemWidthFunc, args = getItemWidth.args;
            var undefinedItemIndexMap = new Set();
            var itemWidthArray = items.map(function (item) {
                return getItemWidthFunc.apply(void 0, __spreadArray([item], args, false));
            }).filter(function (val, index) {
                if (val === undefined) {
                    undefinedItemIndexMap.add(index);
                    return false;
                }
                return true;
            });
            items = items.filter(function (val, index) { return !undefinedItemIndexMap.has(index); });
            // Mark Item
            metaInfoArray.forEach(function (metaInfo, index) {
                // Prepare for mark
                var drawPositionsArray = _this.generateDrawPositionsArray(metaInfo, itemWidthArray, _this.painterOptions);
                // Set context
                _this.setContextProperty(metaInfo.ctx, _this.painterOptions);
                // Mark text
                drawPositionsArray.forEach(function (_a) {
                    var x = _a.x, y = _a.y, itemIndex = _a.itemIndex;
                    drawItemFunc(metaInfo.ctx, items[itemIndex], { x: x, y: y });
                });
            });
            // Return canvas list
            return metaInfoArray.map(function (_a) {
                var canvas = _a.canvas;
                return canvas;
            });
        };
        return WaterMarkerPainter;
    }(BasePainter));

    /**
     * Convert rotation into the unit of Math.PI
     */
    function preHandleRotation(rotation) {
        // Process for string type
        if (typeof rotation === 'string') {
            var degRegx = /^(-?)((\d+)(\.\d+)?)(\s*)deg$/i;
            var piRegx = /^(-?)((\d+)(\.\d+)?)(\s*)pi$/i;
            var numRegx = /^(-?)((\d+)(\.\d+)?)$/i;
            var matchRes = void 0;
            var numericalRotation = void 0;
            if (matchRes = rotation.match(degRegx)) {
                // Match for 'xxx.xxx deg'
                var numericalVal = parseFloat(matchRes[2]);
                numericalRotation = numericalVal * Math.PI / 180;
                (matchRes[1] === '-') && (numericalRotation *= -1);
                return numericalRotation;
            }
            else if (matchRes = rotation.match(piRegx)) {
                // Match for 'xxx.xxx pi'
                var numericalVal = parseFloat(matchRes[2]);
                numericalRotation = numericalVal * Math.PI;
                (matchRes[1] === '-') && (numericalRotation *= -1);
                return numericalRotation;
            }
            else if (matchRes = rotation.match(numRegx)) {
                // Match for pure string number
                numericalRotation = parseFloat(matchRes[2]);
                (matchRes[1] === '-') && (numericalRotation *= -1);
                return numericalRotation;
            }
            else {
                throw new Error('Mark Rotation Set Failed');
            }
        }
        else if (typeof rotation === 'number') {
            return rotation;
        }
        else {
            throw new Error('Mark Rotation Set Failed');
        }
    }
    /**
     * Regulate opicity to 0 - 1
     */
    function preHandleOpicity(opicity) {
        return rangeNumValue(0, 1, opicity);
    }
    /**
     * Regulate mark spacing
     */
    function preHandleMarkSpacing(markSpacing) {
        var h = markSpacing.h, v = markSpacing.v;
        var generalSpacingHandle = function (spacing) {
            if (spacing === undefined)
                return spacing;
            if (typeof spacing === 'string') {
                var matchRegx = /^(-?)((\d+)(\.\d+)?)(\s*)?px$/i;
                if (!matchRegx.test(spacing))
                    throw new Error('Mark Spacing Set Failed');
                var matchRes = spacing.match(matchRegx);
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
    function preHandleArrayForm(arg) {
        if (Array.isArray(arg)) {
            return arg;
        }
        else {
            return [arg];
        }
    }
    /**
     * Prehandle export options
     */
    function preHandleExport(options) {
        var type = options.type, quality = options.quality, size = options.size;
        return {
            type: type !== null && type !== void 0 ? type : 'png',
            quality: (quality === undefined) ? 1.0 : rangeNumValue(0, 1, quality),
            size: size,
        };
    }

    var OptionType;
    (function (OptionType) {
        OptionType[OptionType["LoadSrc"] = 0] = "LoadSrc";
        OptionType[OptionType["MarkImage"] = 1] = "MarkImage";
        OptionType[OptionType["MarkText"] = 2] = "MarkText";
        OptionType[OptionType["MarkCrossAxis"] = 3] = "MarkCrossAxis";
        OptionType[OptionType["MarkOpicity"] = 4] = "MarkOpicity";
        OptionType[OptionType["MarkSpacing"] = 5] = "MarkSpacing";
        OptionType[OptionType["MarkFill"] = 6] = "MarkFill";
        OptionType[OptionType["Scale"] = 7] = "Scale";
        OptionType[OptionType["GetImage"] = 8] = "GetImage";
    })(OptionType || (OptionType = {}));
    var defaultWaterMarkOptions = {
        srcImage: [],
        markImage: [],
        markText: ['WaterMarkkk'],
        markTextOptions: {
            color: 'black',
            font: 'bold 24px serif'
        },
        markRotation: 0,
        markOpicity: 1.0,
        markSpacing: {
            v: 20,
            h: 20,
        },
        exportOptions: {
            type: 'png',
            quality: 1,
        },
    };

    var WaterMarkkk = /** @class */ (function (_super) {
        __extends(WaterMarkkk, _super);
        function WaterMarkkk() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.recievedOptions = {};
            return _this;
        }
        /**
         * Set source image
         * Recieve a single source image or a array of images
         */
        WaterMarkkk.prototype.loadSrc = function (src) {
            var _this = this;
            var runFunc = function () {
                _this.recievedOptions['srcImage'] = preHandleArrayForm(src);
            };
            return this.addIntoFuncArray(OptionType.LoadSrc, runFunc);
        };
        WaterMarkkk.prototype.markImage = function (mark) {
            var _this = this;
            var runFunc = function () {
                _this.recievedOptions['markImage'] = preHandleArrayForm(mark);
            };
            return this.addIntoFuncArray(OptionType.MarkImage, runFunc);
        };
        WaterMarkkk.prototype.markText = function (mark, textOptions) {
            var _this = this;
            var runFunc = function () {
                _this.recievedOptions['markText'] = preHandleArrayForm(mark);
                _this.recievedOptions['markTextOptions'] = textOptions;
            };
            return this.addIntoFuncArray(OptionType.MarkText, runFunc);
        };
        WaterMarkkk.prototype.markRotation = function (markRotation) {
            var _this = this;
            var runFunc = function () {
                _this.recievedOptions['markRotation'] = preHandleRotation(markRotation);
            };
            return this.addIntoFuncArray(OptionType.MarkCrossAxis, runFunc);
        };
        WaterMarkkk.prototype.markOpicity = function (opicity) {
            var _this = this;
            var runFunc = function () {
                _this.recievedOptions['markOpicity'] = preHandleOpicity(opicity);
            };
            return this.addIntoFuncArray(OptionType.MarkOpicity, runFunc);
        };
        WaterMarkkk.prototype.markSpacing = function (vertical, horizontal) {
            var _this = this;
            var runFunc = function () {
                _this.recievedOptions['markSpacing'] = preHandleMarkSpacing({
                    v: vertical,
                    h: horizontal,
                });
            };
            return this.addIntoFuncArray(OptionType.MarkSpacing, runFunc);
        };
        WaterMarkkk.prototype.getImage = function (type, quality, size) {
            return __awaiter(this, void 0, void 0, function () {
                var mergedOptions, sourceImageArray, canvasPainter, outputRes, markImageArray;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Handle recieved property
                            this.addIntoFuncArray(OptionType.MarkSpacing, function () {
                                _this.recievedOptions['exportOptions'] = preHandleExport({
                                    type: type,
                                    quality: quality,
                                    size: size,
                                });
                            });
                            // Start load options and merge them with default options
                            this.runNext();
                            mergedOptions = mergeOptions(defaultWaterMarkOptions, this.recievedOptions);
                            return [4 /*yield*/, ImageLoader.loadImage(mergedOptions.srcImage)];
                        case 1:
                            sourceImageArray = _a.sent();
                            canvasPainter = new WaterMarkerPainter(sourceImageArray, mergedOptions);
                            if (!(mergedOptions.markImage.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, ImageLoader.loadImage(mergedOptions.markImage)];
                        case 2:
                            markImageArray = _a.sent();
                            outputRes = canvasPainter.markImage(markImageArray);
                            return [3 /*break*/, 4];
                        case 3:
                            outputRes = canvasPainter.markText(mergedOptions.markText);
                            _a.label = 4;
                        case 4: return [2 /*return*/, ImageExporter.export(outputRes, mergedOptions.exportOptions)];
                    }
                });
            });
        };
        return WaterMarkkk;
    }(BaseToolChains));

    exports.WaterMarkkk = WaterMarkkk;

}));
