export enum ChessPieces {
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

export type ChessPiece = {
  name: ChessPieces;
  id: string;
  color: ChessPieceColors;
  value: number;
  grid?: string;
};

export type ChessboardGrid = {
  [key: string]: '' | ChessPiece;
};
