import { mouse, left, right, up, down } from '@nut-tree/nut-js';

export const getPosition = async () => {
  return await mouse.getPosition();
};

export const moveUp = async (value: number) => {
  await mouse.move(up(value));
};

export const moveDown = async (value: number) => {
  await mouse.move(down(value));
};

export const moveLeft = async (value: number) => {
  await mouse.move(left(value));
};

export const moveRight = async (value: number) => {
  await mouse.move(right(value));
};
