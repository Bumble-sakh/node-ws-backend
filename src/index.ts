import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { emitter, messageReducer } from './messageReducer';
import { COMMANDS } from './constants/constants';
import { getPosition, moveDown, moveLeft, moveUp, moveRight } from './commands/mouse';
import { circle, rectangle, square } from './commands/draw';
import { printScreen } from './commands/printScreen';

dotenv.config();
const PORT = Number(process.env.PORT);

const server = new WebSocketServer({ port: PORT });

server.on('listening', () => console.log(`Server is listening on port ${PORT}`));

server.on('connection', (server) => {
  server.on('message', messageReducer);

  emitter.on(COMMANDS.MOUSE_POSITION, async () => {
    const { x, y } = await getPosition();

    server.send(`mouse_position ${x},${y}`);
  });

  emitter.on(COMMANDS.MOUSE_UP, async (value) => {
    await moveUp(value);
    server.send(`mouse_up`);
  });

  emitter.on(COMMANDS.MOUSE_DOWN, async (value) => {
    await moveDown(value);
    server.send(`mouse_down`);
  });

  emitter.on(COMMANDS.MOUSE_LEFT, async (value) => {
    await moveLeft(value);
    server.send(`mouse_left`);
  });

  emitter.on(COMMANDS.MOUSE_RIGHT, async (value) => {
    await moveRight(value);
    server.send(`mouse_right`);
  });

  emitter.on(COMMANDS.DRAW_CIRCLE, async (radius) => {
    await circle(radius);
    server.send(`draw_circle`);
  });

  emitter.on(COMMANDS.DRAW_RECTANGLE, async (width, height) => {
    await rectangle(width, height);
    server.send(`draw_rectangle`);
  });

  emitter.on(COMMANDS.DRAW_SQUARE, async (width) => {
    await square(width);
    server.send(`draw_square`);
  });

  emitter.on(COMMANDS.PRNT_SCRN, async (width) => {
    await printScreen();
    server.send(`prnt_scrn`);
  });

  server.send(`Connected...`);
});

server.on('error', (error) => console.error(error));

server.on('close', () => console.error(`Server closed`));

process.on('SIGINT', () => server.close());
