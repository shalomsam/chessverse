import { ChessPiece, ChessPieceColors, ChessPieces } from './types';

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

class ChesspieceModel {
  private name: ChessPieces;
  private id: string;
  private color: ChessPieceColors;
  private value: number;

  constructor(
    id: string,
    name: ChessPieces,
    color: ChessPieceColors,
    value: number
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.value = value;
  }

  public get(): ChessPiece {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      value: this.value,
    };
  }

  public getId(): string {
    return this.id;
  }

  public getName(): ChessPieces {
    return this.name;
  }

  public getColor(): string {
    return this.color;
  }

  public setName(name: ChessPieces) {
    if (this.name !== ChessPieces.pawn) {
      throw new Error('Cannot change name of piece that is not a Pawn');
    }
    this.name = name;
    return this;
  }
}

export default ChesspieceModel;
