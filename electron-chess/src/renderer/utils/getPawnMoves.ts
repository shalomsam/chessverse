import type { IChessPiece, ChessboardGrid } from 'renderer/components/types';
import {
  MoveCoordinates,
  isWhite,
  isInitialPosition,
  gridHasOpponent,
  isBlack,
  getGridAt,
  MoveContext,
  validateArray,
  MoveValidation,
  gridIsEmpty,
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
    {
      x: 0,
      y: 1,
      conditions: [isWhite, gridIsEmpty],
    },
    {
      x: 0,
      y: 2,
      conditions: [isInitialPosition, isWhite, gridIsEmpty],
    },
    {
      x: 1,
      y: 1,
      conditions: [isWhite, gridHasOpponent],
    },
    {
      x: -1,
      y: 1,
      conditions: [isWhite, gridHasOpponent],
    },
    {
      x: 0,
      y: -1,
      conditions: [isBlack, gridIsEmpty],
    },
    {
      x: 0,
      y: -2,
      conditions: [isBlack, isInitialPosition, gridIsEmpty],
    },
    {
      x: 1,
      y: -1,
      conditions: [isBlack, gridHasOpponent],
    },
    {
      x: -1,
      y: -1,
      conditions: [isBlack, gridHasOpponent],
    },
  ];

  moveCoordinates.forEach(({ x, y, conditions, condition }) => {
    const context: MoveContext = {
      chessPiece,
      targetCoordinate: { x, y },
      currentGridState,
    };
    const targetGrid = getGridAt(chessPiece.grid, { x, y });
    if (
      targetGrid !== undefined &&
      currentGridState[targetGrid] !== undefined &&
      (targetGrid === '' ||
        (condition && condition === true) ||
        (conditions?.length &&
          validateArray(conditions as MoveValidation[], context)))
    ) {
      possibleGrids.push(targetGrid);
    }
  });

  return possibleGrids;
};

export default getPawnMoves;
