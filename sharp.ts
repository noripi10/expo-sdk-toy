import sharp from 'sharp';

const main = async () => {
  await sharp('./assets/images/create.svg')
    .resize(1284, 2778, { fit: 'contain', background: '#1a1a1a' })
    .toFormat('png')
    .toFile('./assets/images/splash.png')
    .then((info) => {
      console.info({ info });
    });

  await sharp('./assets/images/create.svg')
    .resize(1024, 1024)
    .toFormat('png')
    .toFile('./assets/images/icon.png')
    .then((info) => {
      console.info({ info });
    });
};

main();
