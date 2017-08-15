const fs = require('fs-extra');
const touch = require('touch');

const markup = 'src/markup';
const images = 'src/assets/media/images';
const styles = 'src/assets/styles';
const scripts = 'src/assets/scripts';
const favicons = 'src/assets/favicons';
const dirs = [
  `${markup}/_base`,
  `${markup}/_data`,
  `${styles}/0-foundation`,
  `${styles}/1-base`,
  `${styles}/2-project`,
  `${styles}/3-cosmetic`,
  `${styles}/include`,
  `${images}/vector`,
  `${images}/raster`,
  `${scripts}`,
  `${favicons}`
];

console.log('mkdir start')
dirs.forEach((dir) => {
  try {
    fs.mkdirsSync(dir);
    touch(`${dir}/.gitkeep`);
  } catch (err) {
    console.error('mkdir error!!')
    console.error(err);
  }
});
console.log('mkdir finished!!')
// mkdirp src/markup/_base src/markup/_data src/assets/styles/0-foundation src/assets/styles/1-base src/assets/styles/2-project src/assets/styles/3-cosmetic src/assets/styles/include src/assets/scripts src/assets/media/images/vector src/assets/media/images/raster src
