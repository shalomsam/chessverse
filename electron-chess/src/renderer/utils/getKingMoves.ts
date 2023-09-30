import { IChessPiece, ChessboardGrid } from 'renderer/components/types';
import {
  MoveCoordinates,
  getGridAt,
  gridHasOpponent,
} from './chessPieceHelper';

/**
 * A function to calculate the pawns possible moves from its current position.
 *
 * @param chessPiece chessPiece object.
 * @param currentGridState current chessboard state
 * @returns {string[]} array of grids the pawn can move to from its current possition.
 */
const getKingMoves = (
  chessPiece: IChessPiece,
  currentGridState: ChessboardGrid
) => {
  const possibleMoves: string[] = [];
  const moveCordinates: MoveCoordinates = [
    {
      x: 0,
      y: 1,
    },
    {
      x: 1,
      y: 1,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: 1,
      y: -1,
    },
    {
      x: 0,
      y: -1,
    },
    {
      x: -1,
      y: -1,
    },
    {
      x: -1,
      y: 0,
    },
    {
      x: -1,
      y: 1,
    },
  ];

  moveCordinates.forEach(({ x, y }) => {
    const targetCoordinate = { x, y };
    const targetGrid = getGridAt(chessPiece.grid, targetCoordinate);
    if (
      (targetGrid &&
        gridHasOpponent(chessPiece, targetCoordinate, currentGridState)) ||
      targetGrid
    ) {
      possibleMoves.push(targetGrid);
    }
  });

  return possibleMoves;
};

export default getKingMoves;
