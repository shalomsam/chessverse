import {
  IChessPiece,
  ChessPieceColors,
  ChessPieceType,
  ChessboardGrid,
} from '../components/types';

export const yGrid: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
export const xGrid: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
  name: ChessPieceType,
  color: ChessPieceColors,
  value: number,
  grid: string
) => ({
  name,
  id,
  color,
  value,
  grid,
});

export const initialPieceGrids: any = {
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

const initialPieceGridsClone: any = {};

const setInitialPosition = (piece: IChessPiece) => {
  const initialPieceGridsInScope =
    initialPieceGridsClone[piece.name][piece.color];
  const grid = initialPieceGridsInScope.pop();
  piece.grid = grid;
  grids[grid] = piece;
};

const prepareInitPositionClone = (pieceType: string) => {
  if (!initialPieceGridsClone[pieceType]) {
    initialPieceGridsClone[pieceType] = {};
  }

  if (!initialPieceGridsClone[pieceType]?.[ChessPieceColors.white]) {
    initialPieceGridsClone[pieceType] = {
      ...initialPieceGridsClone[pieceType],
      [ChessPieceColors.white]: [
        ...initialPieceGrids[pieceType][ChessPieceColors.white],
      ],
    };
  }

  if (!initialPieceGridsClone[pieceType]?.[ChessPieceColors.black]) {
    initialPieceGridsClone[pieceType] = {
      ...initialPieceGridsClone[pieceType],
      [ChessPieceColors.black]: [
        ...initialPieceGrids[pieceType][ChessPieceColors.black],
      ],
    };
  }
};

const generateChessPieces = (pieceType: string, i: number) => {
  const whitePiece = chessPiece(
    `${pieceType}${i + 1}`,
    pieceType as ChessPieceType,
    ChessPieceColors.white,
    ChessPieceValues[pieceType],
    ''
  );

  const blackPiece = chessPiece(
    `${pieceType}${i + 1}`,
    pieceType as ChessPieceType,
    ChessPieceColors.black,
    ChessPieceValues[pieceType],
    ''
  );

  return { whitePiece, blackPiece };
};

const initializePieces = () => {
  for (const pieceType in ChessPiecesCountPerSide) {
    if ({}.hasOwnProperty.call(ChessPiecesCountPerSide, pieceType)) {
      const count = ChessPiecesCountPerSide[pieceType];
      for (let i = 0; i < count; i++) {
        prepareInitPositionClone(pieceType);

        const { whitePiece, blackPiece } = generateChessPieces(pieceType, i);

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
  // eslint-disable-next-line no-console
  console.log('Grids >> ', grids);
  initializePieces();

  return grids;
};
