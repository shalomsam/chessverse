import { IChessPiece, ChessboardGrid } from 'renderer/components/types';
import {
  MoveCoordinates,
  getGridAt,
  gridHasOpponent,
} from './chessPieceHelper';

const getKnightMoves = (
  chessPiece: IChessPiece,
  currentGridState: ChessboardGrid
) => {
  const possibleMoves: string[] = [];
  const moveConditions: MoveCoordinates = [
    {
      x: 1,
      y: 2,
      condition:
        gridHasOpponent(chessPiece, { x: 1, y: 2 }, currentGridState) ||
        getGridAt(chessPiece.grid, { x: 1, y: 2 }) === '',
    },
    {
      x: -1,
      y: 2,
      condition:
        gridHasOpponent(chessPiece, { x: -1, y: 2 }, currentGridState) ||
        getGridAt(chessPiece.grid, { x: -1, y: 2 }) === '',
    },
    {
      x: 2,
      y: 1,
      condition:
        gridHasOpponent(chessPiece, { x: 2, y: 1 }, currentGridState) ||
        getGridAt(chessPiece.grid, { x: 2, y: 1 }) === '',
    },
    {
      x: 2,
      y: -1,
      condition:
        gridHasOpponent(chessPiece, { x: 2, y: -1 }, currentGridState) ||
        getGridAt(chessPiece.grid, { x: 2, y: -1 }) === '',
    },
    {
      x: -2,
      y: 1,
      condition:
        gridHasOpponent(chessPiece, { x: -2, y: 1 }, currentGridState) ||
        getGridAt(chessPiece.grid, { x: -2, y: 1 }) === '',
    },
    {
      x: -2,
      y: -1,
      condition:
        gridHasOpponent(chessPiece, { x: -2, y: -1 }, currentGridState) ||
        getGridAt(chessPiece.grid, { x: -2, y: -1 }) === '',
    },
    {
      x: 1,
      y: -2,
      condition:
        gridHasOpponent(chessPiece, { x: 1, y: -2 }, currentGridState) ||
        getGridAt(chessPiece.grid, { x: 1, y: -2 }) === '',
    },
    {
      x: -1,
      y: -2,
      condition:
        gridHasOpponent(chessPiece, { x: -1, y: -2 }, currentGridState) ||
        getGridAt(chessPiece.grid, { x: -1, y: -2 }) === '',
    },
  ];

  for (const { x, y, condition } of moveConditions) {
    if (condition === undefined || condition) {
      const targetGrid = getGridAt(chessPiece.grid, { x, y });
      if (targetGrid) possibleMoves.push(targetGrid);
    }
  }

  return possibleMoves;
};

export default getKnightMoves;
