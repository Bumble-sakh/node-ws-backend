import { screen, FileType, Region } from '@nut-tree/nut-js';
import { mouse, Image } from '@nut-tree/nut-js';
import Jimp from 'jimp';
import { Blob, Buffer } from 'node:buffer';

export const printScreen = async () => {
  const FILE_PATH = './screenshot';
  const { x, y } = await mouse.getPosition();

  const region = new Region(x - 100, y - 100, 200, 200);

  await screen.captureRegion(`screen`, region, FileType.PNG, FILE_PATH, 'region-');

  const image = await Jimp.read('./screenshot/region-screen.png');

  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

  return buffer.toString('base64');
};
