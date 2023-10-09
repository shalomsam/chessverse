import {
  ChessPieceColors,
  ChessPieceType,
  ChessboardGrid,
  IChessPiece,
} from 'renderer/components/types';
import getPawnMoves from './getPawnMoves';
import { ChessPieceValues } from './chessboardHelper';

describe('getPawnMoves', () => {
  it('should return possible moves for a white pawn at initial position', () => {
    const chessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'e2',
      value: 1,
    };
    const currentGridState: ChessboardGrid = {
      e2: chessPiece, // White pawn at e2
      e3: '', // Empty grid at e3
      e4: '', // Empty grid at e4
      d3: '', // Empty grid at d3
    };

    const expectedMoves = ['e3', 'e4'];

    const result = getPawnMoves(chessPiece, currentGridState);
    expect(result).toEqual(expect.arrayContaining(expectedMoves));
    expect(result.length).toBe(expectedMoves.length);
  });

  it('should return possible moves for a black pawn at initial position', () => {
    const chessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'd7',
      value: 1,
    };
    const currentGridState: ChessboardGrid = {
      d7: chessPiece, // Black pawn at d7
      d6: '', // Empty grid at d6
      d5: '', // Empty grid at d5
      e6: '', // Empty grid at e6
    };

    const expectedMoves = ['d6', 'd5'];

    const result = getPawnMoves(chessPiece, currentGridState);
    expect(result).toEqual(expect.arrayContaining(expectedMoves));
    expect(result.length).toBe(expectedMoves.length);
  });

  it('should return possible moves for a white pawn not at initial position', () => {
    const chessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'e3',
      value: 1,
    };

    const oppChessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'd4',
      value: 1,
    };

    const currentGridState: ChessboardGrid = {
      e3: chessPiece, // White pawn at e3
      e4: '',
      d4: oppChessPiece, // Black pawn at d4
    };

    const expectedMoves = ['e4', 'd4'];

    const result = getPawnMoves(chessPiece, currentGridState);
    expect(result).toEqual(expect.arrayContaining(expectedMoves));
    expect(result.length).toBe(expectedMoves.length);
  });

  it('should return possible moves for a black pawn not at initial position', () => {
    const chessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'd6',
      value: 1,
    };
    const oppChessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'e5',
      value: 1,
    };
    const currentGridState: ChessboardGrid = {
      d6: chessPiece, // Black pawn at d6
      d5: '', // Empty grid at d5
      e5: oppChessPiece, // White pawn at e5
    };

    const expectedMoves = ['d5', 'e5'];

    const result = getPawnMoves(chessPiece, currentGridState);
    expect(result).toEqual(expect.arrayContaining(expectedMoves));
    expect(result.length).toBe(expectedMoves.length);
  });

  it('should return possible moves for a white pawn capturing opponents', () => {
    const chessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'e5',
      value: 1,
    };
    const oppChessPiece1: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'd6',
      value: 1,
    };
    const oppChessPiece2: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'f6',
      value: 1,
    };
    const currentGridState = {
      e5: chessPiece, // White pawn at e5
      d6: oppChessPiece1, // Black pawn at d6
      f6: oppChessPiece2, // Black pawn at f6
    };

    const expectedMoves = ['d6', 'f6'];

    const result = getPawnMoves(chessPiece, currentGridState);
    expect(result).toEqual(expect.arrayContaining(expectedMoves));
    expect(result.length).toBe(expectedMoves.length);
  });

  it('should return possible moves for a black pawn capturing opponents', () => {
    const chessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'd4',
      value: 1,
    };
    const oppChessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'c3',
      value: 1,
    };
    const oppChessPiece2: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'e3',
      value: 1,
    };
    const currentGridState = {
      d4: chessPiece, // Black pawn at d4
      c3: oppChessPiece, // White pawn at c3
      e3: oppChessPiece2, // White pawn at e3
    };

    const expectedMoves = ['c3', 'e3'];

    const result = getPawnMoves(chessPiece, currentGridState);
    expect(result).toEqual(expect.arrayContaining(expectedMoves));
    expect(result.length).toBe(expectedMoves.length);
  });

  it('should handle edge cases and blocked moves', () => {
    const chessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'a1',
      value: 1,
    };
    const oppChessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'b2',
      value: 1,
    };
    const currentGridState: ChessboardGrid = {
      a1: chessPiece, // White pawn at a1
      a2: '', // Empty grid at a2
      b2: oppChessPiece, // Black pawn at b2
    };

    const expectedMoves = ['a2'];

    const result = getPawnMoves(chessPiece, currentGridState);
    expect(result).toEqual(expect.arrayContaining(expectedMoves));
    expect(result.length).toBe(expectedMoves.length);
  });

  //
  it('should handle edge cases at board boundaries', () => {
    // White pawn at a8 (edge case)
    const chessPiece1: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'a8',
      value: 1,
    };
    const currentGridState1: ChessboardGrid = { a8: chessPiece1 };
    const result1 = getPawnMoves(chessPiece1, currentGridState1);
    expect(result1).toEqual([]); // White pawn at edge of the board has no moves

    // Black pawn at h1 (edge case)
    const chessPiece2: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'h1',
      value: 1,
    };
    const currentGridState2 = { h1: chessPiece2 };
    const result2 = getPawnMoves(chessPiece2, currentGridState2);
    expect(result2).toEqual([]); // Black pawn at edge of the board has no moves
  });

  it('should handle cases where the grid is occupied by own piece', () => {
    const chessPiece: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'c4',
      value: 1,
    };
    const chessPiece2: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'd5',
      value: 1,
    };
    const currentGridState = {
      c4: chessPiece, // White pawn at c4
      d5: chessPiece2, // White pawn at d5
    };

    const result = getPawnMoves(chessPiece, currentGridState);
    expect(result).toEqual([]); // White pawn at c4 cannot move forward, grid occupied by own piece
  });

  it('should handle cases where the grid is occupied by opponent piece', () => {
    const pawn: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'g7',
      value: ChessPieceValues[ChessPieceType.pawn],
    };
    const rook: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.rook,
      color: ChessPieceColors.white,
      grid: 'f6',
      value: ChessPieceValues[ChessPieceType.rook],
    };
    const bishop: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.bishop,
      color: ChessPieceColors.white,
      grid: 'h6',
      value: ChessPieceValues[ChessPieceType.bishop],
    };
    const currentGridState = {
      g7: pawn, // Black pawn at g7
      f6: rook, // White rook at f8
      h6: bishop, // White bishop at h8
    };

    const expectedMoves = ['f6', 'h6']; // Black pawn at g7 can capture opponent pieces at f8 and h8

    const result = getPawnMoves(pawn, currentGridState);
    expect(result).toEqual(expect.arrayContaining(expectedMoves));
    expect(result.length).toBe(expectedMoves.length);
  });

  it('should handle scenarios where pawn is at different positions', () => {
    // White pawn at h5
    const chessPiece1: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'h5',
      value: ChessPieceValues[ChessPieceType.pawn],
    };
    const chessPiece2: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'g6',
      value: ChessPieceValues[ChessPieceType.pawn],
    };
    const currentGridState1: ChessboardGrid = {
      h5: chessPiece1,
      h6: '', // Empty grid at h6
      g6: chessPiece2, // Black pawn at g6
    };

    const expectedMoves1 = ['h6', 'g6']; // White pawn at h5 can move forward or capture black pawn at g6

    const result1 = getPawnMoves(chessPiece1, currentGridState1);
    expect(result1).toEqual(expect.arrayContaining(expectedMoves1));
    expect(result1.length).toBe(expectedMoves1.length);

    // Black pawn at b4
    const chessPiece3: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'b4',
      value: ChessPieceValues[ChessPieceType.pawn],
    };
    const chessPiece4: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'c3',
      value: ChessPieceValues[ChessPieceType.pawn],
    };
    const currentGridState2: ChessboardGrid = {
      b4: chessPiece3,
      b3: '', // Empty grid at b3
      c3: chessPiece4, // White pawn at c3
    };

    const expectedMoves2 = ['b3', 'c3']; // Black pawn at b4 can move forward or capture white pawn at c3

    const result2 = getPawnMoves(chessPiece3, currentGridState2);
    expect(result2).toEqual(expect.arrayContaining(expectedMoves2));
    expect(result2.length).toBe(expectedMoves2.length);
  });

  it('should handle cases where the pawn is in a corner and cannot move', () => {
    // White pawn at a1 (corner case)
    const chessPiece1: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.white}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.white,
      grid: 'a1',
      value: ChessPieceValues[ChessPieceType.pawn],
    };
    const currentGridState1: ChessboardGrid = { a1: chessPiece1 };
    const result1 = getPawnMoves(chessPiece1, currentGridState1);
    expect(result1).toEqual([]); // White pawn at corner has no moves

    // Black pawn at h8 (corner case)
    const chessPiece2: IChessPiece = {
      id: `${ChessPieceType.pawn}-${ChessPieceColors.black}`,
      name: ChessPieceType.pawn,
      color: ChessPieceColors.black,
      grid: 'h8',
      value: ChessPieceValues[ChessPieceType.pawn],
    };
    const currentGridState2 = { h8: chessPiece2 };
    const result2 = getPawnMoves(chessPiece2, currentGridState2);
    expect(result2).toEqual([]); // Black pawn at corner has no moves
  });

  // TODO: write test to validate en passant capture.
});
