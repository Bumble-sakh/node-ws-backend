import { RawData } from 'ws';
import { EventEmitter } from 'node:events';
import { COMMANDS } from './constants/constants';

export const emitter = new EventEmitter();

export const messageReducer = (data: RawData) => {
  try {
    const [command, firstValue, secondValue] = data.toString().split(' ');

    switch (command) {
      case COMMANDS.MOUSE_POSITION:
        console.log(`Request: ${data}`);
        emitter.emit(COMMANDS.MOUSE_POSITION);
        break;

      case COMMANDS.MOUSE_UP:
        console.log(`Request: ${data}`);
        emitter.emit(COMMANDS.MOUSE_UP, Number(firstValue));
        break;

      case COMMANDS.MOUSE_DOWN:
        console.log(`Request: ${data}`);
        emitter.emit(COMMANDS.MOUSE_DOWN, Number(firstValue));
        break;

      case COMMANDS.MOUSE_LEFT:
        console.log(`Request: ${data}`);
        emitter.emit(COMMANDS.MOUSE_LEFT, Number(firstValue));
        break;

      case COMMANDS.MOUSE_RIGHT:
        console.log(`Request: ${data}`);
        emitter.emit(COMMANDS.MOUSE_RIGHT, Number(firstValue));
        break;

      case COMMANDS.DRAW_CIRCLE:
        console.log(`Request: ${data}`);
        emitter.emit(COMMANDS.DRAW_CIRCLE, Number(firstValue));
        break;

      case COMMANDS.DRAW_RECTANGLE:
        console.log(`Request: ${data}`);
        emitter.emit(COMMANDS.DRAW_RECTANGLE, Number(firstValue), Number(secondValue));
        break;

      case COMMANDS.DRAW_SQUARE:
        console.log(`Request: ${data}`);
        emitter.emit(COMMANDS.DRAW_SQUARE, Number(firstValue));
        break;

      case COMMANDS.PRNT_SCRN:
        console.log(`Request: ${data}`);
        emitter.emit(COMMANDS.PRNT_SCRN);
        break;

      default:
        break;
    }

    return;
  } catch (error) {
    console.error(error);
  }
};
