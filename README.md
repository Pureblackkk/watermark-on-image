# watermark-on-image
This is a general image watermark library for web browser, which supports marking both texts and images repeatedly covering the image in the form of a chaining calling.


# Installing
```bash
npm install watermark-on-image
```

# Usage
Using the chaining calling to load source images, mark images or texts, and other related options. It supports receiving url paths and Image objects.
```js
// Mark Image
new WaterMarkkk()
.loadSrc('src/1.png')
.markImage('mark/1.png')
.markSpacing(600, 200)
.getImage('png', 1.0, { width: 1500, height: 800 })
.then(imgs => {
    const imgElement = document.createElement('img');
    imgElement.src = imgs[0];
    document.getElementById('root').appendChild(imgElement);
});

// Mark Texts
new WaterMarkkk()
.loadSrc(['src/1.png', 'src/2.png'])
.markText(['mark1', 'mark2'])
.markSpacing(100, 100)
.markOpicity(0.6)
.markRotation('40deg')
.getImage('jpeg', 1.0)
.then(imgs => {
    imgs.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        document.getElementById('root').appendChild(imgElement);
    })
});
```

### Method
+ **loadSrc**

    Recieve single path, Image object or the array of them. Each image in the array will be processed by the same configuration.
    ```typescript
    loadSrc(src: string | HTMLImageElement | (string | HTMLImageElement)[])
    ```

+ **markImage**
    
    Same with loadSrc method
    ```typescript
    markImage(mark: string | HTMLImageElement | (string | HTMLImageElement)[])
    ```

+ **markText**
    
    Recieve a single string or the array of strings to mark. All the texts will be ordered repeatedly to cover the whole image. You can also set related options for texts.
    ```typescript
    markText(mark: string | string[], textOptions?: {
        color?: string,
        font?: string
    })    
    ```
    Default: 'WaterMarkkk'
+ **markRotation**

    Set for the rotation angle (0 degree - 180 degree) of mark. Recieve number (ie. Math.PI) or string (ie. "30 deg"). Here the number must be in the unit degree (Math.PI).
    ```typescript
    markRotation: (rotation: number | string) => IToolChain;
    ```
    Default: 0
+ **markOpicity**

    Set the mark opicity (0 - 1).
    ```typescript
    markOpicity: (opicity: number)
    ```
    Default: 1.0

+ **markSpacing**

    Set markers' vertical and horizontal spacing distance (in the unit of px). Recieve string (ie. "30 px") or number (ie. 30).

    ```typescript
    markSpacing: (vertical: string | number, horizontal: string | number) => IToolChain;
    ```
    Default: 
    + vertical: 20
    + horizontal: 20


+ **getImage**

    Must be called to get marked img result. It will return a list of img based on the format you choose. It provides four options: 'jpeg', 'png', 'webp' and 'canvas'. Here 'canvas' refers to the HTMLCanvasElement. Except for canvas, all the other forms of image will be returned as URI string. It also provides quality (0 - 1) and size options.

    ```typescript
    getImage: (type?: ExportType, quality?: number, size?: {
        width?: number;
        height?: number;
    }) => Promise<string[] | HTMLCanvasElement[]>;
    ```
    Default: 
    + type: png
    + quality: 1.0
    + size: undefined (which means keeping the same with the original image)

# Start & Building
Generate a template with html page into dist folder based on the file from test/example. You can test functionalities by this.

```
npm run start
```

Build for publish
```
npm run build
```

# Test
Use jest to test some basic utility functions. You can find them in the test folder.
```
npm run test
```

# Suggestions
Please feel free to make suggestions and contributions.