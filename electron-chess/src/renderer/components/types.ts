export enum ChessPieceType {
  pawn = 'pawn', // x 8
  bishop = 'bishop', // x 2
  knight = 'knight', // x 2
  rook = 'rook', // x 2
  queen = 'queen', // x 1 (at init)
  king = 'king', // x 1
}

export enum ChessPieceColors {
  white = 'white',
  black = 'black',
}

export enum AttackDirection {
  up = 1,
  down = -1,
}

export type IChessPiece = {
  name: ChessPieceType;
  id: string;
  color: ChessPieceColors;
  value: number;
  grid: string;
};

export type ChessboardGrid = {
  [key: string]: '' | IChessPiece;
};
