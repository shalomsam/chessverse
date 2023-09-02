import { atom } from 'recoil';
import { initializeChessboardGrids } from '../utils/chessboardHelper';

export const chessBoardGridState = atom({
  key: 'chessBoardGridState',
  default: initializeChessboardGrids(),
});

export const test = {};
