import ChesspieceModel, {
  ChessPieceValues,
  ChessPiecesCountPerSide,
} from './ChesspieceModel';
import { ChessPieceColors, ChessPieces } from './types';

export type ChessboardGrid = {
  [key: string]: '' | ChesspieceModel;
};

class ChessboardModel {
  private yGrid: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  private xGrid: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  private grids: ChessboardGrid = {};

  constructor() {
    for (let x = 0; x < this.xGrid.length; x++) {
      for (let y = 0; y < this.yGrid.length; y++) {
        this.grids[`${x}${y}`] = '';
      }
    }

    this.init();
  }

  public init(): this {
    for (const pieceType in ChessPiecesCountPerSide) {
      if ({}.hasOwnProperty.call(ChessPiecesCountPerSide, pieceType)) {
        const count = ChessPiecesCountPerSide[pieceType];
        for (let i = 0; i < count; i++) {
          const whitePiece = new ChesspieceModel(
            `${pieceType}${i + 1}`,
            pieceType as ChessPieces,
            ChessPieceColors.white,
            ChessPieceValues[pieceType]
          );

          const blackPiece = new ChesspieceModel(
            `${pieceType}${i + 1}`,
            pieceType as ChessPieces,
            ChessPieceColors.white,
            ChessPieceValues[pieceType]
          );

          this.setInitialPosition(whitePiece);
          this.setInitialPosition(blackPiece);
        }
      }
    }
    return this;
  }

  private setInitialPosition(piece: ChesspieceModel): void {
    const initialPieceGrids: any = {
      pawn: {
        black: ['a7', 'b7', 'c7', 'd7', 'e7', 'g7', 'h7'],
        white: ['a2', 'b2', 'c2', 'd2', 'e2', 'g2', 'h2'],
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

    const grid = initialPieceGrids[piece.getName()][piece.getColor()].pop();
    this.grids[grid] = piece;
  }

  public get(grid: string) {
    return this.grids[grid];
  }

  public set(grid: string, piece: unknown = '') {
    if (!this.grids[grid]) {
      throw new Error(`Invalid chessboard grid that does not exist: ${grid}`);
    }
    this.grids[grid] = piece as ChesspieceModel;
    return this;
  }
}

export default ChessboardModel;
