import { Button } from '@nut-tree/nut-js';
import { mouse } from '@nut-tree/nut-js';

const moveRight = async (value: number) => {
  let { x, y } = await mouse.getPosition();

  for (let i = 0; i < value; i++) {
    x += 1;
    const point = { x, y };

    await mouse.setPosition(point);
  }
};

const moveLeft = async (value: number) => {
  let { x, y } = await mouse.getPosition();

  for (let i = 0; i < value; i++) {
    x -= 1;
    const point = { x, y };

    await mouse.setPosition(point);
  }
};

const moveUp = async (value: number) => {
  let { x, y } = await mouse.getPosition();

  for (let i = 0; i < value; i++) {
    y -= 1;
    const point = { x, y };

    await mouse.setPosition(point);
  }
};

const moveDown = async (value: number) => {
  let { x, y } = await mouse.getPosition();

  for (let i = 0; i < value; i++) {
    y += 1;
    const point = { x, y };

    await mouse.setPosition(point);
  }
};

export const circle = async (radius: number) => {
  let { x, y } = await mouse.getPosition();

  const midX = x;
  const midY = y;
  const resolution = 0.1;

  x = midX + Math.sin(0) * radius;
  y = midY + Math.cos(0) * radius;
  let point = { x, y };

  await mouse.setPosition(point);

  for (let i = 0; i <= 2 * Math.PI + resolution; i += resolution) {
    x = midX + Math.sin(i) * radius;
    y = midY + Math.cos(i) * radius;
    point = { x, y };

    await mouse.pressButton(Button.LEFT);
    await mouse.setPosition(point);
    await mouse.releaseButton(Button.LEFT);
  }
};

export const rectangle = async (width: number, height: number) => {
  await mouse.pressButton(Button.LEFT);
  await moveRight(width);
  await mouse.releaseButton(Button.LEFT);

  await mouse.pressButton(Button.LEFT);
  await moveDown(height);
  await mouse.releaseButton(Button.LEFT);

  await mouse.pressButton(Button.LEFT);
  await moveLeft(width);
  await mouse.releaseButton(Button.LEFT);

  await mouse.pressButton(Button.LEFT);
  await moveUp(height);
  await mouse.releaseButton(Button.LEFT);
};

export const square = async (width: number) => {
  await mouse.pressButton(Button.LEFT);
  await moveRight(width);
  await mouse.releaseButton(Button.LEFT);

  await mouse.pressButton(Button.LEFT);
  await moveDown(width);
  await mouse.releaseButton(Button.LEFT);

  await mouse.pressButton(Button.LEFT);
  await moveLeft(width);
  await mouse.releaseButton(Button.LEFT);

  await mouse.pressButton(Button.LEFT);
  await moveUp(width);
  await mouse.releaseButton(Button.LEFT);
};
