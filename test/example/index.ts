import { WaterMarkkk } from 'src/tool-chain/tool-chain';

new WaterMarkkk()
.loadSrc('./assets/src-img/2.jpeg')
.markImage([
    './assets/mark-img/1.png',
])
.markSpacing(600, 200)
.markRotation('40deg')
.markOpicity(0.6)
.getImage()
.then((img) => {
    const imgElement = document.createElement('img');
    imgElement.id = 'img';
    imgElement.src = img[0] as string;
    const root = document.getElementById('root');
    root?.appendChild(imgElement);
});

