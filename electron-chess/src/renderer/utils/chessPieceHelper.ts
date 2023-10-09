import {
  ChessPieceColors,
  ChessboardGrid,
  IChessPiece,
} from 'renderer/components/types';
import {
  xGrid as XGRID,
  initialPieceGrids,
  // yGrid as YGRID,
} from './chessboardHelper';

export type Coordinate = {
  x: number;
  y: number;
};

export type MoveContext = {
  chessPiece: IChessPiece;
  targetCoordinate: Coordinate;
  currentGridState: ChessboardGrid;
};

export type MoveContextArgs = [IChessPiece, Coordinate?, ChessboardGrid?];

export type MoveValidation = (context: MoveContext) => boolean;

export type MoveCoordinates = (Coordinate & {
  condition?: boolean | MoveValidation;
  conditions?: MoveValidation[];
})[];

export const isObjMoveContext = (
  object: IChessPiece | MoveContext
): object is MoveContext => {
  if ((object as MoveContext).chessPiece) {
    return true;
  }
  return false;
};

export const getXGridAt = (x: string, to: number) => {
  return XGRID[XGRID.indexOf(x) + to];
};

export const xGridToIndex = (x: string) => XGRID.indexOf(x);

export const getGridAt = (currentGrid: string, to: Coordinate) => {
  let [x, y] = currentGrid.split('');
  x = getXGridAt(x, to.x);
  y = String(Number(y) + to.y);

  if (x === undefined) {
    return undefined;
  }

  return `${x}${y}`;
};

const getContextPropertiesFromArgs = (
  args: [MoveContext] | MoveContextArgs
): MoveContext => {
  if (args.length > 1) {
    return {
      chessPiece: args[0] as IChessPiece,
      targetCoordinate: args[1] as Coordinate,
      currentGridState: args[2] as ChessboardGrid,
    };
  }
  return args[0] as MoveContext;
};

export const isInitialPosition = (object: IChessPiece | MoveContext) => {
  let chessPiece;
  if (isObjMoveContext(object)) {
    chessPiece = object.chessPiece;
  } else {
    chessPiece = object;
  }
  const initialPositions = initialPieceGrids[chessPiece.name][chessPiece.color];
  return initialPositions.indexOf(chessPiece.grid) > -1;
};

export const gridHasOpponent = (...args: [MoveContext] | MoveContextArgs) => {
  const { chessPiece, targetCoordinate, currentGridState } =
    getContextPropertiesFromArgs(args);
  const targetGridKey = getGridAt(chessPiece.grid, targetCoordinate);
  const targetGridPiece = currentGridState[targetGridKey as string];
  // console.debug('targetGridPiece >>', targetGridPiece);
  return (
    targetGridKey !== undefined &&
    targetGridPiece !== undefined &&
    targetGridPiece !== '' &&
    targetGridPiece.color !== chessPiece.color
  );
};

export const gridHasPiece = (...args: [MoveContext] | MoveContextArgs) => {
  const { chessPiece, targetCoordinate, currentGridState } =
    getContextPropertiesFromArgs(args);
  const targetGridKey = getGridAt(chessPiece.grid, targetCoordinate);
  const targetGridPiece = currentGridState[targetGridKey as string];
  return targetGridKey !== undefined && targetGridPiece !== '';
};

export const gridIsEmpty = (...args: [MoveContext] | MoveContextArgs) => {
  const { chessPiece, targetCoordinate, currentGridState } =
    getContextPropertiesFromArgs(args);
  const targetGridKey = getGridAt(chessPiece.grid, targetCoordinate);
  return currentGridState?.[targetGridKey as string] === '';
};

/**
 * Function to check if the target coordinate has an opponent.
 *
 * @param chessPiece Selected chessPiece object.
 * @param targetCoordinate coordinates to check.
 * @param currentGridState current chessboard state.
 * @returns {boolean} True if the targetGrid has an opponent.
 */
export const gridHasNoOpponent = ({
  chessPiece,
  targetCoordinate,
  currentGridState,
}: MoveContext) =>
  !gridHasOpponent(chessPiece, targetCoordinate, currentGridState);

/**
 * Function to check if the chessPiece is white.
 *
 * @param chessPiece chessPiece object.
 * @returns {boolean} True if piece is a white piece.
 */
export const isWhite = (object: IChessPiece | MoveContext) => {
  if (isObjMoveContext(object)) {
    return object.chessPiece.color === ChessPieceColors.white;
  }
  return object.color === ChessPieceColors.white;
};

/**
 * Function to check if the chessPiece is black.
 *
 * @param chessPiece chessPiece object.
 * @returns {boolean} True if piece is a black piece.
 */
export const isBlack = (object: IChessPiece | MoveContext) => {
  if (isObjMoveContext(object)) {
    return object.chessPiece.color === ChessPieceColors.black;
  }
  return object.color === ChessPieceColors.black;
};
/**
 * Function to check if validation function or object is present.
 *
 * @param condition Validation object or function
 * @returns {boolean}
 */
export const hasMoveValidation = (condition: unknown) => {
  return condition && typeof condition === 'function';
};

/**
 * Function to create unique keys per chessPiece and current grid.
 * This key is used to store the possible moves for the piece in its current grid.
 *
 * @var {IChessPiece} chessPiece The chessPiece object
 */
export const getChessPieceMovesKey = (chessPiece: IChessPiece) =>
  `${chessPiece.name}-${chessPiece.color}-${chessPiece.grid}`;

/**
 * Function to validate an array of MoveValidation functions.
 *
 * @param moveValidations An array of validations to perform to validate if piece can move to coordinate
 * @param moveContext The context object that contains relevant state invormation
 * @returns {boolean} returns true if all validations pass.
 */
export const validateArray = (
  moveValidations: MoveValidation[],
  moveContext: MoveContext
) =>
  moveValidations.every((moveValidationFn: MoveValidation) =>
    moveValidationFn(moveContext)
  );
