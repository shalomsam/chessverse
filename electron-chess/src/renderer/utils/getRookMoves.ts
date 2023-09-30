import { IChessPiece, ChessboardGrid } from 'renderer/components/types';
import {
  MoveCoordinates,
  getGridAt,
  gridHasPiece,
  gridHasOpponent,
} from './chessPieceHelper';

/**
 * Calculate the possible moves for the selected rook piece from its current grid location.
 *
 * @param chessPiece The chessPiece object.
 * @param currentGridState The current chessboard state.
 * @returns {string[]} returns an array of grids the current piece can move to.
 */
const getRookMoves = (
  chessPiece: IChessPiece,
  currentGridState: ChessboardGrid
) => {
  const possibleMoves: string[] = [];
  const moveDirections: MoveCoordinates = [
    {
      x: 1,
      y: 0,
    },
    {
      x: -1,
      y: 0,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: 0,
      y: -1,
    },
  ];

  moveDirections.forEach(({ x, y }) => {
    let i = 1;
    while (true) {
      const targetCoordinate = { x: x * i, y: y * i };
      const targetGrid = getGridAt(chessPiece.grid, targetCoordinate);
      if (!targetGrid) {
        break;
      }
      if (gridHasPiece(chessPiece, targetCoordinate, currentGridState)) {
        if (gridHasOpponent(chessPiece, targetCoordinate, currentGridState)) {
          possibleMoves.push(targetGrid);
        }
        break;
      }
      possibleMoves.push(targetGrid);
      i++;
    }
  });

  return possibleMoves;
};

export default getRookMoves;
