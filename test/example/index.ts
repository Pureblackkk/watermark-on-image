import { WaterMarkkk } from 'src/tool-chain/tool-chain';

new WaterMarkkk()
.loadSrc('./assets/src-img/1.jpeg')
.markImage([
    './assets/mark-img/3.svg',
])
.markSpacing(600, 200)
.markRotation('40deg')
.markOpicity(0.6)
.getImage('png', 1.0, { width: 1500, height: 800 })
.then((img) => {
    const imgElement = document.createElement('img');
    imgElement.id = 'img';
    imgElement.src = img[0] as string;
    const root = document.getElementById('root');
    root?.appendChild(imgElement);
});

