var LetterPic = (function (exports) {
    'use strict';

    /*! *****************************************************************************
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

    var LETTER_PIC_DEFAULTS = {
        fill: 'gradient',
        size: 100,
        font: 'Arial',
        fontColor: '#fff',
        fontStrokeColor: '#000',
        fontSize: 0.45,
        imageOverlayColor: 'rgba(0, 0, 0, 0)',
        maxInitialsLength: 2,
        useGlobalCache: true,
        images: [],
    };
    var defaultImgPath = 'patterns';
    var defaultImgCount = 8;
    var defaultImgExt = '.png';
    for (var i = 1; i <= defaultImgCount; i++) {
        LETTER_PIC_DEFAULTS.images.push(defaultImgPath + '/' + i + defaultImgExt);
    }

    var CANVAS_CONTEXT_SCALE = window.devicePixelRatio;
    var defaultColors = [
        '#1abc9c',
        '#2ecc71',
        '#3498db',
        '#9b59b6',
        '#34495e',
        '#16a085',
        '#27ae60',
        '#2980b9',
        '#8e44ad',
        '#2c3e50',
        '#f1c40f',
        '#e67e22',
        '#e74c3c',
        '#ecf0f1',
        '#95a5a6',
        '#f39c12',
        '#d35400',
        '#c0392b',
        '#bdc3c7',
        '#7f8c8d',
    ];
    var drawText = function (context, settings, text) {
        var _a = context.canvas, width = _a.width, height = _a.height;
        var fontSize = width * settings.fontSize;
        context.font = fontSize + "px " + settings.font;
        context.textAlign = 'center';
        var posX = width / 2;
        var posY = (fontSize + height) * 0.45;
        if (settings.fontStrokeColor) {
            context.shadowColor = settings.fontStrokeColor;
            context.shadowColor = 'black';
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 3;
        }
        context.fillStyle = settings.fontColor;
        context.fillText(text, posX, posY);
    };
    var getCanvasContextScaled = function (htmlCanvas) {
        var context = htmlCanvas.getContext('2d');
        var scale = CANVAS_CONTEXT_SCALE;
        context.scale(scale, scale);
        return context;
    };
    var scaleCanvasContext = function (htmlCanvas) {
        var scale = CANVAS_CONTEXT_SCALE;
        htmlCanvas.width = scale * htmlCanvas.width;
        htmlCanvas.height = scale * htmlCanvas.height;
    };
    var getPreparedCanvasContext = function (settings) {
        var canvas = document.createElement('canvas');
        canvas.width = settings.size;
        canvas.height = settings.size;
        scaleCanvasContext(canvas);
        return getCanvasContextScaled(canvas);
    };
    var getInitials = function (text) {
        var splitted = text.split(' ');
        var result = splitted[0].charAt(0).toUpperCase();
        for (var i = 1; i < 2; i++) {
            if (splitted.length > i) {
                result += splitted[i].charAt(0).toUpperCase();
            }
        }
        return result;
    };
    var hashCode = function (s) {
        var hash = 0, i, chr;
        for (i = 0; i < s.length; i++) {
            chr = s.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return hash;
    };
    var getItemByString = function (s, arr) {
        var idx = Math.abs(hashCode(s)) % arr.length;
        return arr[idx];
    };
    var getColorByString = function (settings, s) {
        var colors = settings.colors || defaultColors;
        return getItemByString(s, colors);
    };
    var getOrSetBackground = function (cacheKey, getBackground) {
        var backgrounds = window.LetterPicCache.backgrounds;
        if (backgrounds[cacheKey] === undefined) {
            backgrounds[cacheKey] = getBackground();
        }
        return window.LetterPicCache.backgrounds[cacheKey];
    };

    var bgProviderColor = function (settings) {
        var context = getPreparedCanvasContext(settings);
        var draw = function (text, cacheKey) {
            context.fillStyle = getOrSetBackground(cacheKey, function () {
                return getColorByString(settings, cacheKey);
            });
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            drawText(context, settings, text);
            return context.canvas;
        };
        return { draw: draw };
    };

    var getLinearGradient = function (context, colors) {
        var gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
        gradient.addColorStop(0, colors[0]);
        var gradientStep = 1 / (colors.length - 1);
        for (var i = 1; i < colors.length - 1; i++) {
            gradient.addColorStop(i * gradientStep, colors[i]);
        }
        gradient.addColorStop(1, colors[colors.length - 1]);
        return gradient;
    };
    var reverseString = function (s) { return s.split('').reverse().join(''); };
    var bgProviderGradient = function (settings) {
        var context = getPreparedCanvasContext(settings);
        var draw = function (text, cacheKey) {
            context.fillStyle = getOrSetBackground(cacheKey, function () {
                if (settings.gradients !== undefined && settings.gradients.length > 0) {
                    var gradient = getItemByString(cacheKey, settings.gradients);
                    return getLinearGradient(context, gradient);
                }
                var startColor = getColorByString(settings, cacheKey);
                var endColor = getColorByString(settings, reverseString(cacheKey));
                return getLinearGradient(context, [startColor, endColor]);
            });
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            drawText(context, settings, text);
            return context.canvas;
        };
        return {
            draw: draw,
        };
    };

    var PROVIDERS = {
        color: bgProviderColor,
        gradient: bgProviderGradient,
        image: bgProviderColor,
    };
    var initGlobals = function () {
        if (!window.LetterPicCache) {
            window.LetterPicCache = window.LetterPicCache || {
                backgrounds: {},
            };
        }
    };
    var letterpic = function (userSettings) {
        initGlobals();
        var settings = __assign(__assign(__assign({}, userSettings), LETTER_PIC_DEFAULTS), { fill: getFillTypeFromSettings(userSettings) });
        var provider = PROVIDERS[settings.fill](settings);
        var asDataString = function (text) {
            var initials = getInitials(text);
            return provider.draw(initials, text).toDataURL();
        };
        var asImage = function (text) {
            var img = document.createElement('img');
            img.src = asDataString(text);
            return img;
        };
        return { asDataString: asDataString, asImage: asImage };
    };
    function getFillTypeFromSettings(userSettings) {
        if ((userSettings === null || userSettings === void 0 ? void 0 : userSettings.fill) !== undefined) {
            return userSettings === null || userSettings === void 0 ? void 0 : userSettings.fill;
        }
        else if ((userSettings === null || userSettings === void 0 ? void 0 : userSettings.colors) !== undefined) {
            return 'color';
        }
        else if ((userSettings === null || userSettings === void 0 ? void 0 : userSettings.gradients) !== undefined) {
            return 'gradient';
        }
        else if ((userSettings === null || userSettings === void 0 ? void 0 : userSettings.images) !== undefined) {
            return 'image';
        }
        return LETTER_PIC_DEFAULTS.fill;
    }

    exports.letterpic = letterpic;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=letterpic.js.map
