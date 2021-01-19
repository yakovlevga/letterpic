import {
  LetterPicProvider,
  LetterPicFillType,
  LetterPicSettings,
} from 'types/core';
import { LETTER_PIC_DEFAULTS } from 'defaultSettings';
import { palette } from 'providers/palette';
import { gradient } from 'providers/gradient';
import { color } from 'providers/color';
import { getInitials } from 'helpers';
import { createCanvas } from 'canvas';

const Providers: Record<LetterPicFillType, LetterPicProvider> = {
  palette,
  gradient,
  color,
};

const cache: Partial<Record<string, string>> = {};

export const draw = (
  name: string,
  userSettings?: Partial<LetterPicSettings>,
  key: string = name
) => {
  const settingsWithDefaults: LetterPicSettings = {
    ...LETTER_PIC_DEFAULTS,
    ...userSettings,
  };

  const provider = Providers[settingsWithDefaults.fill];

  const asCanvas = () => {
    const canvas = createCanvas(200, 200);
    const context = canvas.getContext('2d');

    const initials = getInitials(name);
    return provider(initials, key, settingsWithDefaults, context);
  };

  const asDataUrl = (
    mimeType?: 'image/jpeg' | 'image/png',
    quality?: number
  ) => {
    if (cache[key] === undefined) {
      cache[key] = asCanvas().toDataURL(mimeType, quality);
    }
    return cache[key]!;
  };

  return { asCanvas, asDataUrl };
};

// function isImageOk(img: HTMLImageElement): boolean {
//   if (!img.complete || (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0)) {
//       return false;
//   }
//   return true;
// }

// $.fn.letterpic = function (options) {
//     var self = this;
//     self.$letterpics = [];
//     self.options = options || {};

//     var lp = new LetterPic(options);

//     this.each(function () {
//         var $el = $(this);

//         if ($el.is("img")) {
//             if (!isImageOk($el[0])) {
//                 var $canvas = replaceWithCanvas($el);
//                 if(self.options.onImageError) {
//                     self.options.onImageError($canvas, $el.attr('src'));
//                 }
//             }
//             else {
//                 $el.on("error", onImageError);
//             }
//         }
//         else {
//             replaceWithCanvas($el);
//         }
//     });

//     function getKey($el) {
//         var key =
//             $el.data().letterpicKey ||
//             $el.data().letterpicUserId ||
//             $el.data().userid ||
//             getInitials($el);

//         return key;
//     }

//     function getInitials($el) {
//         var name = $el.attr("title");

//         var splitted = name.split(" ");
//         var result = splitted[0].charAt(0).toUpperCase();
//         for(var i = 1; i < lp.settings.maxInitialsLength; i++) {
//             if (splitted.length > i) {
//                 result += splitted[i].charAt(0).toUpperCase();
//             }
//         }

//         return result;
//     }

//     function isImageOk(img) {
//         if (!img.complete || (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0)) {
//             return false;
//         }
//         return true;
//     }

//     function onImageError(event) {
//         var $img = $(event.target);
//         $img.off("error", onImageError);
//         replaceWithCanvas($img, true);

//         if(self.options.onImageError) {
//             self.options.onImageError($canvas, $img.attr('src'));
//         }
//     }

//     function replaceWithCanvas($el, isBrokenImage) {
//         var $canvas;
//         if ($el.is("canvas")) {
//             $canvas = $el;
//         }
//         else {
//             $canvas = $("<canvas></canvas>");
//             $.each($el[0].attributes, function (i, attribute) {
//                 $canvas.attr(attribute.name, attribute.value);
//             });
//             $el.replaceWith($canvas);
//         }

//         var key = getKey($canvas);
//         var text = getInitials($canvas);
//         lp.drawProvider.draw($canvas, key, text);

//         self.$letterpics.push($canvas);

//         if(self.options.onElementReplaced) {
//             isBrokenImage = isBrokenImage || false;
//             self.options.onElementReplaced($canvas, isBrokenImage);
//         }

//         return $canvas;
//     }

//     return $($.map(self.$letterpics, function($el){
//         return $el.get();
//     }));;
// };
