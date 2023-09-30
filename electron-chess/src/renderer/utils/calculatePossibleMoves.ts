import {
  IChessPiece,
  ChessboardGrid,
  ChessPieceType,
} from 'renderer/components/types';
import getPawnMoves from './getPawnMoves';
import getRookMoves from './getRookMoves';

/**
 * Determines and returns the possible grids the current piece can move to.
 *
 * @param chessPiece The chessPiece object
 * @param currentGridState The current chessboard state
 * @returns An array of grids this piece can move to.
 */
const calculatepPossibleMoves = (
  chessPiece: IChessPiece,
  currentGridState: ChessboardGrid
) => {
  switch (chessPiece.name) {
    case ChessPieceType.pawn:
      return getPawnMoves(chessPiece, currentGridState);
    case ChessPieceType.rook:
      return getRookMoves(chessPiece, currentGridState);
    default:
      return null;
  }
};

export default calculatepPossibleMoves;
