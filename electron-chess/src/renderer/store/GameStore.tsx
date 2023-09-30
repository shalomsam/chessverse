import { atom } from 'recoil';
import { ChessPieceColors, IChessPiece } from 'renderer/components/types';
import { initializeChessboardGrids } from '../utils/chessboardHelper';

export const chessBoardGridState = atom({
  key: 'chessBoardGridState',
  default: initializeChessboardGrids(),
});

export const SelectedChessPieceState = atom<null | IChessPiece>({
  key: 'SelectedChessPieceState',
  default: null,
});

type ChessPiecePossibleMoves = {
  // chessPieceKey = {ChessPieceType}-{ChessPieceColor}-{grid} : ['grid1', 'grid2']
  [chessPieceKey: string]: string[] | null;
};

export const ChessPiecePossibleMovesState = atom<ChessPiecePossibleMoves>({
  key: 'ChessPiecePossibleMovesState',
  default: {},
});

export type GameConfig = {
  playPieceColor: ChessPieceColors;
};

export const GameConfigState = atom<GameConfig>({
  key: 'GameConfigState',
  default: {
    playPieceColor: ChessPieceColors.white,
  },
});
