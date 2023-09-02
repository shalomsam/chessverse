import {
  ChessPiece,
  ChessPieceColors,
  ChessPieces,
  ChessboardGrid,
} from '../components/types';

const yGrid: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const xGrid: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const grids: ChessboardGrid = {};

export const ChessPiecesCountPerSide: { [key: string]: number } = {
  pawn: 8,
  bishop: 2,
  knight: 2,
  rook: 2,
  queen: 1,
  king: 1,
};

export const ChessPieceValues: { [key: string]: number } = {
  pawn: 1,
  bishop: 3,
  knight: 3,
  rook: 5,
  queen: 9,
  king: 100,
};

export const chessPiece = (
  id: string,
  name: ChessPieces,
  color: ChessPieceColors,
  value: number,
  grid?: string
) => ({
  name,
  id,
  color,
  value,
  grid,
});

const initialPieceGrids: any = {
  pawn: {
    black: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    white: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  },
  rook: {
    black: ['a8', 'h8'],
    white: ['a1', 'h1'],
  },
  knight: {
    black: ['b8', 'g8'],
    white: ['b1', 'g1'],
  },
  bishop: {
    black: ['c8', 'f8'],
    white: ['c1', 'f1'],
  },
  queen: {
    black: ['d8'],
    white: ['d1'],
  },
  king: {
    black: ['e8'],
    white: ['e1'],
  },
};

const setInitialPosition = (piece: ChessPiece) => {
  const grid = initialPieceGrids[piece.name][piece.color].pop();
  piece.grid = grid;
  grids[grid] = piece;
};

const initializePieces = () => {
  for (const pieceType in ChessPiecesCountPerSide) {
    if ({}.hasOwnProperty.call(ChessPiecesCountPerSide, pieceType)) {
      const count = ChessPiecesCountPerSide[pieceType];
      for (let i = 0; i < count; i++) {
        const whitePiece = chessPiece(
          `${pieceType}${i + 1}`,
          pieceType as ChessPieces,
          ChessPieceColors.white,
          ChessPieceValues[pieceType]
        );

        const blackPiece = chessPiece(
          `${pieceType}${i + 1}`,
          pieceType as ChessPieces,
          ChessPieceColors.black,
          ChessPieceValues[pieceType]
        );

        setInitialPosition(whitePiece);
        setInitialPosition(blackPiece);
      }
    }
  }
};

export const initializeChessboardGrids = (): ChessboardGrid => {
  for (let x = 0; x < xGrid.length; x++) {
    for (let y = 0; y < yGrid.length; y++) {
      grids[`${xGrid[x]}${yGrid[y]}`] = '';
    }
  }
  console.log('Grids >> ', grids);
  initializePieces();

  return grids;
};
