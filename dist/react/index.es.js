import React from 'react';

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

var colors = [
    '#f44336',
    '#673ab7',
    '#03a9f4',
    '#4caf50',
    '#ffeb3b',
    '#ff5722',
    '#607d8b',
    '#e91e63',
    '#3f51b5',
    '#00bcd4',
    '#8bc34a',
    '#ffc107',
    '#795548',
    '#2196f3',
    '#009688',
    '#cddc39',
    '#ff9800',
    '#9e9e9e',
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#ecf0f1',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
];
var LETTER_PIC_DEFAULTS = {
    fill: 'gradient',
    size: 100,
    font: 'Arial',
    fontColor: '#fff',
    fontStrokeColor: '#000',
    fontSize: 0.45,
    maxInitialsLength: 2,
    colors: colors,
};

function md5cycle(x, k) {
    var a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
}
function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
}
function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
}
function md51(s) {
    var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
    for (i = 64; i <= s.length; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++)
        tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
    tail[i >> 2] |= 0x80 << (i % 4 << 3);
    if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++)
            tail[i] = 0;
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
}
function md5blk(s) {
    var md5blks = [], i;
    for (i = 0; i < 64; i += 4) {
        md5blks[i >> 2] =
            s.charCodeAt(i) +
                (s.charCodeAt(i + 1) << 8) +
                (s.charCodeAt(i + 2) << 16) +
                (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
}
var hex_chr = '0123456789abcdef'.split('');
function rhex(n) {
    var s = '', j = 0;
    for (; j < 4; j++)
        s += hex_chr[(n >> (j * 8 + 4)) & 0x0f] + hex_chr[(n >> (j * 8)) & 0x0f];
    return s;
}
function hex(x) {
    for (var i = 0; i < x.length; i++)
        x[i] = rhex(x[i]);
    return x.join('');
}
function md5(s) {
    return hex(md51(s));
}
var add32 = function (a, b) {
    return (a + b) & 0xffffffff;
};
if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
    add32 = function (x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    };
}
var md5hash = function (s) { return md5(s); };

var drawText = function (context, settings, text) {
    var _a = context.canvas, width = _a.width, height = _a.height;
    var fontSize = width * settings.fontSize;
    context.font = fontSize + "px " + settings.font;
    context.textAlign = 'center';
    var posX = width / 2;
    var posY = (fontSize + height) * 0.45;
    if (settings.fontStrokeColor) {
        context.shadowColor = settings.fontStrokeColor;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 3;
    }
    context.fillStyle = settings.fontColor;
    context.fillText(text, posX, posY);
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
var stringToInteger = function (s) {
    return parseInt(md5hash(s).substring(0, 8), 16);
};
var getItemByString = function (s, arr) {
    var idx = Math.abs(stringToInteger(s)) % arr.length;
    return arr[idx];
};
var getRandomColorByString = function (s) {
    return "#" + md5hash(s).substring(0, 6);
};
var getDefinedColorByString = function (settings, s) { return getItemByString(s, settings.colors); };

var palette = function (text, key, settings, context) {
    context.fillStyle = getDefinedColorByString(settings, key);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    drawText(context, settings, text);
    return context.canvas;
};

var getLinearGradient = function (context, colors) {
    var gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
    var gradientStep = 1 / (colors.length - 1);
    for (var i = 0; i < colors.length; i++) {
        gradient.addColorStop(i * gradientStep, colors[i]);
    }
    return gradient;
};
var gradient = function (text, key, settings, context) {
    var gradient;
    if (settings.gradients !== undefined && settings.gradients.length > 0) {
        gradient = getItemByString(key, settings.gradients);
    }
    else {
        var startColor = getDefinedColorByString(settings, key);
        var endColor = getRandomColorByString(key);
        gradient = [startColor, endColor];
    }
    context.fillStyle = getLinearGradient(context, gradient);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    drawText(context, settings, text);
    return context.canvas;
};

var color = function (text, key, settings, context) {
    context.fillStyle = getRandomColorByString(key);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    drawText(context, settings, text);
    return context.canvas;
};

var PROVIDERS = {
    palette: palette,
    gradient: gradient,
    color: color,
};
var cache = {};
var getPreparedCanvasContext = function (settings) {
    var canvas = document.createElement('canvas');
    canvas.width = settings.size;
    canvas.height = settings.size;
    return canvas.getContext('2d');
};
var draw = function (name, userSettings, key) {
    if (key === void 0) { key = name; }
    var settingsWithDefaults = __assign(__assign({}, LETTER_PIC_DEFAULTS), userSettings);
    var provider = PROVIDERS[settingsWithDefaults.fill];
    var asCanvas = function () {
        var initials = getInitials(name);
        var context = getPreparedCanvasContext(settingsWithDefaults);
        return provider(initials, key, settingsWithDefaults, context);
    };
    var asDataURL = function (type, quality) {
        if (cache[key] === undefined) {
            cache[key] = asCanvas().toDataURL(type, quality);
        }
        return cache[key];
    };
    var asImage = function () {
        var img = document.createElement('img');
        img.src = asDataURL();
        return img;
    };
    var insureImg = function (img) {
        var imgErrorHandler = function () {
            img.removeEventListener('error', imgErrorHandler);
            img.src = asDataURL();
        };
        var imgLoadHandler = function () {
            img.removeEventListener('error', imgErrorHandler);
            img.removeEventListener('load', imgLoadHandler);
        };
        img.addEventListener('error', imgErrorHandler);
        img.addEventListener('load', imgLoadHandler);
    };
    return { asDataString: asDataURL, asImage: asImage, asCanvas: asCanvas, insureImg: insureImg };
};

var LetterPic = function () {
    var img = draw('My Name', undefined, 'asdasdasd').asDataString();
    return React.createElement("img", { src: img });
};

export { LetterPic };
//# sourceMappingURL=index.es.js.map
