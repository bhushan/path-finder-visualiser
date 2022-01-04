import { randomNumber } from 'helpers/utils';

export const BOARD_COL = 41;
export const BOARD_ROW = 28;

export const START_NODE_COL = randomNumber(0, BOARD_COL);
export const START_NODE_ROW = randomNumber(0, BOARD_ROW);

export const FINISH_NODE_COL = randomNumber(0, BOARD_COL);
export const FINISH_NODE_ROW = randomNumber(0, BOARD_ROW);
