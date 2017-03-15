# jQuery LetterPic plugin
> LetterPic is a small jQuery plugin that converts user's name to userpic, using it's initials.

You can replace any html element with initials based userpick (e.g. George Yakovlev -> GA picture).
Another way of using is to replace broken images by letter userpic.

## Basic Usage

### HTML

```html
    <div class="letterpic" title="Jon Snow"></div>
    <canvas class="letterpic" title="Jon Snow"></canvas>
    <img class="letterpic" title="Jon Snow" src="ErrorImagePath.jpg" />
```

### JavaScript (jQuery)

```js
    $(".letterpic").letterpic();
```

## Configuration

By default user's color is cached by users name.
If you afraid of situations when two different users can have same name,
you should add *data-userid=YourInternalUserId* attribute to canvas. 
In this way user's colors will be cached by this id, not by name.

```html
    <div class="letterpic" title="Alex" data-userid="123"></div>
    <div class="letterpic" title="Alex" data-userid="99999"></div>
```

LetterPic offers few appearance configuration options. 
You can change *color scheme*, *font family*, *font color* and *relative font size*:

```js
    $(".userpic-letter-custom").letterpic({
        colors: ["#000", "#111", "#222", "#333" ],
        font: "Tahoma",
        fontColor: "#94090D",
        fontSize: 0.3
    });
```
