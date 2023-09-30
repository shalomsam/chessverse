import type { IChessPiece, ChessboardGrid } from 'renderer/components/types';
import {
  MoveCoordinates,
  isWhite,
  isInitialPosition,
  gridHasPiece,
  gridHasOpponent,
  isBlack,
  getGridAt,
} from './chessPieceHelper';

/**
 * A function to calculate the pawns possible moves from its current position.
 *
 * @param chessPiece chessPiece object.
 * @param currentGridState current chessboard state
 * @returns {string[]} array of grids the pawn can move to from its current possition.
 */
const getPawnMoves = (
  chessPiece: IChessPiece,
  currentGridState: ChessboardGrid
) => {
  const possibleGrids: string[] = [];
  const moveCoordinates: MoveCoordinates = [
    { x: 0, y: 1, condition: isWhite(chessPiece) },
    {
      x: 0,
      y: 2,
      condition:
        isInitialPosition(chessPiece) &&
        isWhite(chessPiece) &&
        (!gridHasPiece(chessPiece, { x: 0, y: 2 }, currentGridState) ||
          gridHasOpponent(chessPiece, { x: 0, y: 2 }, currentGridState)),
    },
    {
      x: 1,
      y: 1,
      condition:
        isWhite(chessPiece) &&
        (gridHasOpponent(chessPiece, { x: 1, y: 1 }, currentGridState) ||
          !gridHasPiece(chessPiece, { x: 1, y: 1 }, currentGridState)),
    },
    {
      x: -1,
      y: 1,
      condition:
        isWhite(chessPiece) &&
        (gridHasOpponent(chessPiece, { x: -1, y: 1 }, currentGridState) ||
          !gridHasPiece(chessPiece, { x: -1, y: 1 }, currentGridState)),
    },
    {
      x: 0,
      y: -1,
      condition:
        isBlack(chessPiece) &&
        (gridHasOpponent(chessPiece, { x: 0, y: -1 }, currentGridState) ||
          !gridHasPiece(chessPiece, { x: 0, y: -1 }, currentGridState)),
    },
    {
      x: 0,
      y: -2,
      condition: isBlack(chessPiece) && isInitialPosition(chessPiece),
    },
    {
      x: 1,
      y: -1,
      condition:
        isBlack(chessPiece) &&
        gridHasOpponent(chessPiece, { x: 1, y: -1 }, currentGridState),
    },
    {
      x: -1,
      y: -1,
      condition:
        isBlack(chessPiece) &&
        gridHasOpponent(chessPiece, { x: -1, y: -1 }, currentGridState),
    },
  ];

  moveCoordinates.forEach(({ x, y, condition }) => {
    if (condition === undefined || condition === true) {
      const targetGrid = getGridAt(chessPiece.grid, { x, y });
      if (targetGrid) possibleGrids.push(targetGrid);
    }
  });

  return possibleGrids;
};

export default getPawnMoves;
