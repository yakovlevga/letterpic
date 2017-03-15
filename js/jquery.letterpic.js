(function($) {
    $.fn.letterpic = function(options) {
        var colorIdx = 0;        

        var defaultFont = "Arial";
        var defaultFontColor = "#fff";
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
        var cache = {};

        var settings = $.extend({
            colors: defaultColors,
            font: defaultFont,            
            fontColor: defaultFontColor,
            fontSize: defaultFontSize
        }, options);

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

        function getInfo($el) {
            var userId = $el.data().userid;
            var name = $el.attr("title");

            // skip
            if(!name) {
                return null;
            }

            if(!userId) {
                userId = name;
            }
            
            var info = cache[userId];
            if(!info) {                
                if(colorIdx == settings.colors.length) {
                    colorIdx = 0;
                }
                var color = settings.colors[colorIdx++];
                info = {
                    text: getInitials(name),
                    color: color
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
            if (!img.complete) {
                return false;
            }

            if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
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
            // for retina devices
            var scale = window.devicePixelRatio;
            var canvasWidth = scale * $canvas.width(),
                canvasHeight = scale * $canvas.height();

            var context = canvas.getContext("2d");
            context.scale(scale, scale);
            
            $canvas.attr("width", canvasWidth);
            $canvas.attr("height", canvasHeight);

            // fill with color
            context.fillStyle = info.color;
            context.fillRect (0, 0, canvas.width, canvas.height);

            // draw text
            var fontSize = canvasWidth * settings.fontSize;
            context.font = fontSize + "px " + settings.font;
            context.textAlign = "center";
            context.fillStyle = settings.fontColor;
            context.fillText(info.text, canvasWidth / 2, (fontSize + canvasHeight) * 0.45 + 2);
        }
    };
}( jQuery ));