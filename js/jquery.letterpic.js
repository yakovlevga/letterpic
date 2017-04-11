(function ($) {
    var LetterPicDefaults = function() {
        var self = this;
        self.colors = [
                "#F44336", "#673AB7", "#03A9F4", "#4CAF50", "#FFEB3B", "#FF5722", "#607D8B",
                "#E91E63", "#3F51B5", "#00BCD4", "#8BC34A", "#FFC107", "#795548", "#9C27B0",
                "#2196F3", "#009688", "#CDDC39", "#FF9800", "#9E9E9E" ];

        self.gradients = [
                ["#E57373", "#B71C1C"], ["#673AB7", "#7E57C2"], ["#03A9F4", "#039BE5"], ["#4CAF50", "#43A047"],
                ["#FFEB3B", "#F57F17"], ["#FF5722", "#D84315"], ["#607D8B", "#455A64"], ["#E91E63", "#C2185B"],
                ["#3F51B5", "#303F9F"], ["#00BCD4", "#0097A7"], ["#8BC34A", "#689F38"], ["#FFC107", "#FFA000"],
                ["#795548", "#5D4037"], ["#9C27B0", "#8E24AA"], ["#2196F3", "#1976D2"], ["#009688", "#00796B"],
                ["#CDDC39", "#AFB42B"], ["#FF9800", "#F57C00"], ["#9E9E9E", "#757575"]];

        self.font = "Arial";
        self.fontColor = "#fff";
        self.fontStrokeColor = "#000";
        self.fontSize = .45;
        self.imageOverlayColor = "rgba(0, 0, 0, 0)";
        self.maxInitialsLength = 2;
        // if it's true, it uses global cache for different calls
        self.useGlobalCache = true;        
        
        // set default images
        self.images = [];    
        var defaultImgPath = "patterns";
        var defaultImgCount = 8;
        var defaultImgExt = ".png";
        for (var i = 1; i <= defaultImgCount; i++) {
            self.images.push(defaultImgPath + "/" + i + defaultImgExt);
        }
    }

    var LetterPic = function(options) {
        self = this;   
        
        // consts
        self.fillTypeColor = "color";
        self.fillTypeGradient = "gradient";
        self.fillTypeImage = "image";    
        
        var defaults = new LetterPicDefaults();
        self.settings = $.extend(defaults, options);
        self.settings.fill = self.settings.fill || getFillTypeFromSettings(options);        

        // key-background cache
        if(self.settings.useGlobalCache) {
            if(!window.letterpicCache) {
                window.letterpicCache = {};
            }
            self.cache = window.letterpicCache;
        }
        else {
            self.cache = {};
        }

        if(self.settings.initial) {
            for (var fill in self.settings.initial) {
                if(!self.cache[fill])
                    self.cache[fill] = {};
                var bgs = self.settings.initial[fill];
                for (var key in bgs) {
                    self.cache[fill][key] = bgs[key];
                }
            }    
        }

        function getFillTypeFromSettings(settings) {
            if(!settings)
                return self.fillTypeGradient;
            else{
                var fill = settings.colors ? self.fillTypeColor :
                    settings.gradients ? self.fillTypeGradient:
                    settings.images ? self.fillTypeImage : self.fillTypeGradient;

                return fill;
            }
        }

        function BgProvider(settings, bgs, drawBgFunc) {
            var provider = this;
            provider.bgs = bgs;
            var bgs = provider.bgs.slice().reverse();        
            
            provider.draw = function($canvas, key, text) {

                var bg = getBackground(settings.fill, key);

                var canvas = $canvas[0];
                var scale = window.devicePixelRatio;
                var canvasWidth = scale * $canvas.width(),
                    canvasHeight = scale * $canvas.height();

                var context = canvas.getContext("2d");
                context.scale(scale, scale);

                $canvas.attr("width", canvasWidth);
                $canvas.attr("height", canvasHeight);    

                drawBgFunc(context, canvas, bg, function() {
                    drawText(text, context, canvasWidth, canvasHeight)
                });

                // draw overlay
                context.fillStyle = self.settings.imageOverlayColor;
                context.fillRect(0, 0, canvas.width, canvas.height);
            }

            function getBackground(fill, key) {
                var bg;
                if(!self.cache[fill]) {
                    self.cache[fill] = {};
                }
                if(!self.cache[fill][key]) {
                    if(!bgs.length)
                        colors = provider.bgs.slice().reverse();                        
                    bg = bgs.pop();
                    self.cache[fill][key] = bg;
                }
                else {
                    bg = self.cache[fill][key];
                }
                return bg;
            }

            function drawText(text, context, canvasWidth, canvasHeight) {
                var fontSize = canvasWidth * self.settings.fontSize;
                context.font = fontSize + "px " + self.settings.font;
                context.textAlign = "center";

                var posX = canvasWidth / 2;
                var posY = (fontSize + canvasHeight) * 0.45;

                if (self.settings.fontStrokeColor) {
                    context.shadowColor = self.settings.fontStrokeColor;
                    context.shadowColor = "black";
                    context.shadowOffsetX = 0;
                    context.shadowOffsetY = 0;
                    context.shadowBlur = 3;
                }

                context.fillStyle = self.settings.fontColor;
                context.fillText(text, posX, posY);
            }
        }
        
        self.drawProviders = {};
        self.drawProviders[self.fillTypeColor] = function(settings) {
            return new BgProvider(
                settings, 
                settings.colors, 
                function(context, canvas, bg, drawTextCallback) {
                    context.fillStyle = bg;
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    drawTextCallback();
                });
        };

        self.drawProviders[self.fillTypeGradient] = function(settings) {
            return new BgProvider(
                settings, 
                settings.gradients, 
                function(context, canvas, bg, drawTextCallback) {
                    var gradientColors = bg;
                    var gradient = context.createLinearGradient(0, 0, 0, canvas.height);

                    gradient.addColorStop(0, gradientColors[0]);
                    var gradientStep = 1 / (gradientColors.length - 1);
                    for (var i = 1; i < gradientColors.length - 1; i++) {
                        gradient.addColorStop(i * gradientStep, gradientColors[i]);
                    }

                    gradient.addColorStop(1, gradientColors[gradientColors.length - 1]);
                    context.fillStyle = gradient;
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    drawTextCallback();
                });
        };

        self.drawProviders[self.fillTypeImage] = function(settings) {
            return new BgProvider(
                settings, 
                settings.images, 
                function(context, canvas, bg, drawTextCallback) {
                    var img = new Image();
                    img.onload = function () {
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        drawTextCallback();
                    }
                    img.src = bg;
                });
        };

        self.drawProvider = self.drawProviders[self.settings.fill](self.settings);
    }

    $.fn.letterpic = function (options) {
        var self = this;        
        var lp = new LetterPic(options);        

        this.each(function () {
            var $el = $(this);

            if ($el.is("img")) {
                if (!isImageOk($el[0])) {
                    replaceWithCanvas($el);
                }
                else {
                    $el.on("error", onImageError);
                }
            }
            else {
                replaceWithCanvas($el);
            }
        });

        function getKey($el) {
            var key = 
                $el.data().letterpicKey ||
                $el.data().letterpicUserId ||
                $el.data().userid ||
                getInitials($el);

            return key;
        }        

        function getInitials($el) {      
            var name = $el.attr("title");

            var splitted = name.split(" ");
            var result = splitted[0].charAt(0).toUpperCase();
            for(var i = 1; i < lp.settings.maxInitialsLength; i++) {
                if (splitted.length > i) {
                    result += splitted[i].charAt(0).toUpperCase();
                }
            }            

            return result;
        }

        function isImageOk(img) {
            if (!img.complete || (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0)) {
                return false;
            }
            return true;
        }

        function onImageError(event) {
            var $img = $(event.target);
            $img.off("error", onImageError);
            replaceWithCanvas($img);
        }

        function replaceWithCanvas($el) {
            var $canvas;
            if ($el.is("canvas")) {
                $canvas = $el;
            }
            else {
                $canvas = $("<canvas></canvas>");
                $.each($el[0].attributes, function (i, attribute) {
                    $canvas.attr(attribute.name, attribute.value);
                });
                $el.replaceWith($canvas);
            }

            var key = getKey($canvas);
            var text = getInitials($canvas);
            lp.drawProvider.draw($canvas, key, text);
        }
    };
}(jQuery));