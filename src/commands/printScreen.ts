import { screen, Region } from '@nut-tree/nut-js';
import { mouse } from '@nut-tree/nut-js';
import Jimp from 'jimp';
import { ERRORS } from '../constants/constants';
import { emitter } from '../messageReducer';

export const printScreen = async () => {
  const { x, y } = await mouse.getPosition();

  const region = new Region(x - 100, y - 100, 200, 200);

  try {
    const regionImage = await screen.grabRegion(region);

    const rgbImage = await regionImage.toRGB();

    const image = new Jimp(rgbImage);

    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

    return buffer.toString('base64');
  } catch (error) {
    emitter.emit(ERRORS.REGION_ERROR, error);
  }
};
