import { RawData } from 'ws';
import { EventEmitter } from 'node:events';
import { COMMANDS } from './constants/constants';

export const emitter = new EventEmitter();

export const messageReducer = (data: RawData) => {
  try {
    const [command, firstValue, secondValue] = data.toString().split(' ');

    switch (command) {
      case COMMANDS.MOUSE_POSITION:
        emitter.emit(COMMANDS.MOUSE_POSITION);
        break;

      case COMMANDS.MOUSE_UP:
        emitter.emit(COMMANDS.MOUSE_UP, Number(firstValue));
        break;

      case COMMANDS.MOUSE_DOWN:
        emitter.emit(COMMANDS.MOUSE_DOWN, Number(firstValue));
        break;

      case COMMANDS.MOUSE_LEFT:
        emitter.emit(COMMANDS.MOUSE_LEFT, Number(firstValue));
        break;

      case COMMANDS.MOUSE_RIGHT:
        emitter.emit(COMMANDS.MOUSE_RIGHT, Number(firstValue));
        break;

      case COMMANDS.DRAW_CIRCLE:
        emitter.emit(COMMANDS.DRAW_CIRCLE, Number(firstValue));
        break;

      case COMMANDS.DRAW_RECTANGLE:
        emitter.emit(COMMANDS.DRAW_RECTANGLE, Number(firstValue), Number(secondValue));
        break;

      case COMMANDS.DRAW_SQUARE:
        emitter.emit(COMMANDS.DRAW_SQUARE, Number(firstValue));
        break;

      case COMMANDS.PRNT_SCRN:
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
