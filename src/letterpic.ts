import {
  LetterPicProvider,
  LetterPicFillType,
  LetterPicSettings,
} from 'types/core';
import { LETTER_PIC_DEFAULTS } from 'defaults';
import { bgProviderColor } from 'providers/bgProviderColor';
import { bgProviderGradient } from 'providers/bgProviderGradient';
// import { bgProviderImage } from 'providers/bgProviderImage.ts1';
import { getInitials } from 'providers/helpers';

const PROVIDERS: Record<LetterPicFillType, LetterPicProvider> = {
  color: bgProviderColor,
  gradient: bgProviderGradient,
  image: bgProviderColor,
  // image: bgProviderImage,
};

const initGlobals = () => {
  if (!window.LetterPicCache) {
    window.LetterPicCache = window.LetterPicCache || {
      backgrounds: {},
    };
  }
};

export const letterpic = (userSettings?: Partial<LetterPicSettings>) => {
  initGlobals();

  const settings: LetterPicSettings = {
    ...userSettings,
    ...LETTER_PIC_DEFAULTS,
    fill: getFillTypeFromSettings(userSettings),
  };

  const provider = PROVIDERS[settings.fill](settings);

  const asDataString = (text: string) => {
    const initials = getInitials(text);
    return provider.draw(initials, text).toDataURL();
  };

  const asImage = (text: string) => {
    const img = document.createElement('img');
    img.src = asDataString(text);
    return img;
  };

  return { asDataString, asImage };
  // TODO
  // if (self.settings.initial) {
  //   for (var fill in self.settings.initial) {
  //     if (!self.cache[fill]) self.cache[fill] = {};
  //     var bgs = self.settings.initial[fill];
  //     for (var key in bgs) {
  //       self.cache[fill][key] = bgs[key];
  //     }
  //   }
  // }
  // self.drawProvider = self.drawProviders[self.settings.fill](self.settings);
};

function getFillTypeFromSettings(
  userSettings?: Partial<LetterPicSettings>
): LetterPicFillType {
  if (userSettings?.fill !== undefined) {
    return userSettings?.fill;
  } else if (userSettings?.colors !== undefined) {
    return 'color';
  } else if (userSettings?.gradients !== undefined) {
    return 'gradient';
  } else if (userSettings?.images !== undefined) {
    return 'image';
  }

  return LETTER_PIC_DEFAULTS.fill;
}

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
