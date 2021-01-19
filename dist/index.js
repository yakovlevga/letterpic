'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    colors: [
        '#F44336',
        '#673AB7',
        '#03A9F4',
        '#4CAF50',
        '#FFEB3B',
        '#FF5722',
        '#607D8B',
        '#E91E63',
        '#3F51B5',
        '#00BCD4',
        '#8BC34A',
        '#FFC107',
        '#795548',
        '#9C27B0',
        '#2196F3',
        '#009688',
        '#CDDC39',
        '#FF9800',
        '#9E9E9E',
    ],
    gradients: [
        ['#E57373', '#B71C1C'],
        ['#673AB7', '#7E57C2'],
        ['#03A9F4', '#039BE5'],
        ['#4CAF50', '#43A047'],
        ['#FFEB3B', '#F57F17'],
        ['#FF5722', '#D84315'],
        ['#607D8B', '#455A64'],
        ['#E91E63', '#C2185B'],
        ['#3F51B5', '#303F9F'],
        ['#00BCD4', '#0097A7'],
        ['#8BC34A', '#689F38'],
        ['#FFC107', '#FFA000'],
        ['#795548', '#5D4037'],
        ['#9C27B0', '#8E24AA'],
        ['#2196F3', '#1976D2'],
        ['#009688', '#00796B'],
        ['#CDDC39', '#AFB42B'],
        ['#FF9800', '#F57C00'],
        ['#9E9E9E', '#757575'],
    ],
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
var prepareCanvasContext = function (htmlCanvas) {
    scaleCanvasContext(htmlCanvas);
    return getCanvasContextScaled(htmlCanvas);
};

var bgProviderColor = function (settings) {
    var bgIdx = 0;
    var getBackground = function (text) {
        if (window.letterpic.backgrounds[text] === undefined) {
            var nextColor = settings.colors[bgIdx++ % settings.colors.length];
            window.letterpic.backgrounds[text] = nextColor;
        }
        return window.letterpic.backgrounds[text];
    };
    return function (context, text) {
        context.fillStyle = getBackground(text);
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        drawText(context, settings, text);
    };
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
var bgProviderGradient = function (settings) {
    var bgIdx = 0;
    var getBackground = function (context, text) {
        if (window.letterpic.backgrounds[text] === undefined) {
            var nextGradient = getLinearGradient(context, settings.gradients[bgIdx++ % settings.colors.length]);
            window.letterpic.backgrounds[text] = nextGradient;
        }
        return window.letterpic.backgrounds[text];
    };
    return function (context, text) {
        context.fillStyle = getBackground(context, text);
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        drawText(context, settings, text);
    };
};

var PROVIDERS = {
    color: bgProviderColor,
    gradient: bgProviderGradient,
    image: bgProviderColor,
};
var initGlobals = function () {
    if (!window.letterpic) {
        window.letterpic = window.letterpic || {
            backgrounds: {},
        };
    }
};
var letterPic = function (userSettings) {
    initGlobals();
    var settings = __assign(__assign(__assign({}, userSettings), LETTER_PIC_DEFAULTS), { fill: getFillTypeFromSettings(userSettings) });
    var provider = PROVIDERS[settings.fill](settings);
    return function (canvas, text) {
        return provider(prepareCanvasContext(canvas), text);
    };
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

exports.letterPic = letterPic;
//# sourceMappingURL=index.js.map
