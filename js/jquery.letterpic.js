(function($) {
    $.fn.letterpic = function(options) {
        var self = this;

        self.fillTypeColor = "color";
        self.fillTypeGradient = "gradient";
        self.fillTypeImage = "image";

        var backgroundIdx = 0;
        var defaultFont = "Arial";
        var defaultFontColor = "#fff";
        var defaultFontStrokeColor = "#000";
        var defaultFontSize = .45;        
        var defaultColors = [
            "#F44336",
            "#673AB7",
            "#03A9F4",
            "#4CAF50",
            "#FFEB3B",
            "#FF5722",
            "#607D8B",
            "#E91E63",
            "#3F51B5",
            "#00BCD4",
            "#8BC34A",
            "#FFC107",
            "#795548",
            "#9C27B0",
            "#2196F3",
            "#009688",
            "#CDDC39",
            "#FF9800",
            "#9E9E9E"
        ];
        var defaultGradients = [
            ["#E57373", "#B71C1C"],
            ["#673AB7", "#7E57C2"],
            ["#03A9F4", "#039BE5"],
            ["#4CAF50", "#43A047"],
            ["#FFEB3B", "#F57F17"],
            ["#FF5722", "#D84315"],
            ["#607D8B", "#455A64"],
            ["#E91E63", "#C2185B"],
            ["#3F51B5", "#303F9F"],
            ["#00BCD4", "#0097A7"],
            ["#8BC34A", "#689F38"],
            ["#FFC107", "#FFA000"],
            ["#795548", "#5D4037"],
            ["#9C27B0", "#8E24AA"],
            ["#2196F3", "#1976D2"],
            ["#009688", "#00796B"],
            ["#CDDC39", "#AFB42B"],
            ["#FF9800", "#F57C00"],
            ["#9E9E9E", "#757575"]
        ];
        var defaultImageOverlayColor = "rgba(0, 0, 0, 0)";
        var cache = {};

        var settings = $.extend({
            colors: defaultColors,
            gradients: defaultGradients,
            font: defaultFont,            
            fontColor: defaultFontColor,
            fontSize: defaultFontSize,
            fill: getFillTypeFromOptions(options),
            imageOverlayColor: defaultImageOverlayColor
        }, options);

        // set default images
        if(settings.fill == self.fillTypeImage) {            
            if(!settings.fontStrokeColor)
                settings.fontStrokeColor = defaultFontStrokeColor;

            if(!settings.images || !settings.images.length) {
                var defaultImgPath = "patterns";
                var defaultImgCount = 8;
                var defaultImgExt = ".png";
                settings.images = [];
                for(var i = 1; i <= defaultImgCount; i++) {
                    settings.images.push(defaultImgPath + "/" + i + defaultImgExt);
                }
            }
        }

        self.drawProviders = {};
        self.drawProviders[self.fillTypeColor] = drawColorBackground;
        self.drawProviders[self.fillTypeGradient] = drawGradientBackground;
        self.drawProviders[self.fillTypeImage] = drawImageBackground;

        this.each(function() {
            var $el = $(this);

            if($el.is("img")) {
                if(!isImageOk($el[0])) {
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

        function getFillTypeFromOptions(options) {                              
            if(options) {
                if(options.colors) {
                    return self.fillTypeColor;
                }
                else if(options.gradients) {
                    return self.fillTypeGradient;
                }
                else if(options.images) {
                    return self.fillTypeImage;
                }
            }

            return self.fillTypeGradient;
        }

        function getInfo($el) {
            var userId = $el.data().userid;
            var name = $el.attr("title");

            if(!name) {
                name = "";                
            }
            else if(!userId) {
                userId = name;
            }
            
            var info = cache[userId];
            if(!info) {
                info = {                    
                    backgroundIdx: backgroundIdx++,
                    text: getInitials(name)
                };

                cache[userId] = info;
            }

            return info;
        }

        function getInitials(name) {
            var splitted = name.split(" ");
            var result = splitted[0].charAt(0).toUpperCase();
            if(splitted.length > 1) {
                result += splitted[1].charAt(0).toUpperCase();
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
            replaceWithCanvas($(event.target));
            $img.off("error", onImageError);
        }

        function replaceWithCanvas($el) {
            var $canvas;
            if($el.is("canvas")) {
                $canvas = $el;
            }
            else {
                $canvas = $("<canvas></canvas>");
                $.each($el[0].attributes, function(i, attribute){
                    $canvas.attr(attribute.name, attribute.value);
                });
                $el.replaceWith($canvas);
            }

            var info = getInfo($canvas);
            drawLetters($canvas, info);
        }

        function drawLetters($canvas, info) {
            var canvas = $canvas[0];                        
            var scale = window.devicePixelRatio;
            var canvasWidth = scale * $canvas.width(),
                canvasHeight = scale * $canvas.height();

            var context = canvas.getContext("2d");
            context.scale(scale, scale);
            
            $canvas.attr("width", canvasWidth);
            $canvas.attr("height", canvasHeight);
            
            var fontSize = canvasWidth * settings.fontSize;
            context.font = fontSize + "px " + settings.font;
            context.textAlign = "center";

            self.drawProviders[settings.fill](context, canvas, info, function() {
                drawText(info.text, fontSize, context, canvasWidth, canvasHeight);
            });
        }

        function drawColorBackground(context, canvas, info, drawTextCallback) {
            context.fillStyle = settings.colors[info.backgroundIdx % settings.colors.length];
            context.fillRect (0, 0, canvas.width, canvas.height);

            drawTextCallback();
        }

        function drawGradientBackground(context, canvas, info, drawTextCallback) {
            var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
            var gradientColors = settings.gradients[info.backgroundIdx % settings.gradients.length];
            gradient.addColorStop(0, gradientColors[0]);
            var gradientStep = 1 / (gradientColors.length - 1);
            for(var i = 1; i < gradientColors.length - 1; i ++) {
                gradient.addColorStop(i * gradientStep, gradientColors[i]);
            }

            gradient.addColorStop(1, gradientColors[gradientColors.length - 1]);
            context.fillStyle = gradient;
            context.fillRect (0, 0, canvas.width, canvas.height);

            drawTextCallback();
        }

        function drawImageBackground(context, canvas, info, drawTextCallback) {
            var img = new Image();
            img.onload = function() {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                context.fillStyle = settings.imageOverlayColor;
                context.fillRect (0, 0, canvas.width, canvas.height);

                drawTextCallback();                
            }            
            img.src = settings.images[info.backgroundIdx % settings.images.length];;
        }

        function drawText(text, fontSize, context, canvasWidth, canvasHeight) {
            var posX =  canvasWidth / 2;
            var posY = (fontSize + canvasHeight) * 0.45;

            if(settings.fontStrokeColor) {
                context.shadowColor = settings.fontStrokeColor;
                context.shadowColor = "black";
                context.shadowOffsetX = 0; 
                context.shadowOffsetY = 0; 
                context.shadowBlur = 3;
            }

            context.fillStyle = settings.fontColor;
            context.fillText(text, posX, posY);
        }
    };
}( jQuery ));