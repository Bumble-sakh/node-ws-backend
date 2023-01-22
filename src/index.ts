import { WebSocketServer, WebSocket } from 'ws';
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

  const duplex = WebSocket.createWebSocketStream(server, { encoding: 'base64', decodeStrings: false });

  emitter.on(COMMANDS.MOUSE_POSITION, async () => {
    const { x, y } = await getPosition();

    console.log(`Response: mouse_position ${x},${y}`);
    duplex.write(`mouse_position ${x},${y}`, 'base64');
  });

  emitter.on(COMMANDS.MOUSE_UP, async (value) => {
    await moveUp(value);

    console.log(`Response: mouse_up`);
    duplex.write(`mouse_up`, 'base64');
  });

  emitter.on(COMMANDS.MOUSE_DOWN, async (value) => {
    await moveDown(value);

    console.log(`Response: mouse_down`);
    duplex.write(`mouse_down`, 'base64');
  });

  emitter.on(COMMANDS.MOUSE_LEFT, async (value) => {
    await moveLeft(value);

    console.log(`Response: mouse_left`);
    duplex.write(`mouse_left`, 'base64');
  });

  emitter.on(COMMANDS.MOUSE_RIGHT, async (value) => {
    await moveRight(value);

    console.log(`Response: mouse_right`);
    duplex.write(`mouse_right`, 'base64');
  });

  emitter.on(COMMANDS.DRAW_CIRCLE, async (radius) => {
    await circle(radius);

    console.log(`Response: draw_circle`);
    duplex.write(`draw_circle`, 'base64');
  });

  emitter.on(COMMANDS.DRAW_RECTANGLE, async (width, height) => {
    await rectangle(width, height);

    console.log(`Response: draw_rectangle`);
    duplex.write(`draw_rectangle`, 'base64');
  });

  emitter.on(COMMANDS.DRAW_SQUARE, async (width) => {
    await square(width);

    console.log(`Response: draw_square`);
    duplex.write(`draw_square`, 'base64');
  });

  emitter.on(COMMANDS.PRNT_SCRN, async () => {
    const data = await printScreen();

    console.log(`Response: prnt_scrn ${data}`);
    duplex.write(`prnt_scrn ${data}`, 'base64');
  });

  server.send(`Connected...`);

  duplex.on('close', function () {
    console.log('The duplex channel has closed');
  });
});

server.on('error', (error) => console.error(error));

server.on('close', () => console.error(`Server closed`));

process.on('SIGINT', () => server.close());
