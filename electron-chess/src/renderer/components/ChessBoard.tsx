import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getChessPieceMovesKey } from 'renderer/utils/chessPieceHelper';
import calculatepPossibleMoves from 'renderer/utils/calculatePossibleMoves';
import {
  chessBoardGridState,
  ChessPiecePossibleMovesState,
  GameConfig,
  GameConfigState,
  SelectedChessPieceState,
} from '../store/GameStore';
import { ChessPieceColors, IChessPiece } from './types';
import styles from './ChessBoard.module.scss';
import ChessPiece from './ChessPiece';

const ChessBoard: React.FC = () => {
  const [gridState] = useRecoilState(chessBoardGridState);
  const [, setSelectedPiece] = useRecoilState(SelectedChessPieceState);
  const [possibleMovesState, updatePossibleMoves] = useRecoilState(
    ChessPiecePossibleMovesState
  );
  const gameConfig: GameConfig = useRecoilValue(GameConfigState);

  let counter: number = 1;
  return (
    <div className={[styles.ChessBoardOuter].join(' ')}>
      <div className={[styles.ChessBoardInner].join(' ')}>
        {Object.keys(gridState)
          .sort((a: any, b: any) => {
            const a1 = Number(a.split('')[1]);
            const b1 = Number(b.split('')[1]);
            if (gameConfig.playPieceColor === ChessPieceColors.white) {
              return b1 - a1;
            }
            return a1 - b1;
          })
          .map((grid: string, i: number) => {
            const chessPiece = gridState[grid] as IChessPiece;
            const oddEvenClass =
              (i + counter) % 2 === 0 ? styles.even : styles.odd;

            const isGridInPossibleMoves =
              possibleMovesState.current &&
              possibleMovesState.current.indexOf(grid) > -1
                ? 'highlight-yellow'
                : '';

            // counter to determine row and increment odd / even calculation
            if ((i + 1) % 8 === 0) {
              counter++;
            }

            const chessPieceClickHandler = () => {
              if (gridState[grid] === '') {
                return;
              }

              setSelectedPiece(chessPiece);

              const movesKey = getChessPieceMovesKey(chessPiece);
              if (!possibleMovesState[movesKey]) {
                const possiblemoves = calculatepPossibleMoves(
                  gridState[grid] as IChessPiece,
                  gridState
                );

                updatePossibleMoves({
                  [movesKey]: possiblemoves,
                  current: possiblemoves,
                });
              } else {
                updatePossibleMoves({ current: possibleMovesState[movesKey] });
              }
            };

            return (
              <div
                key={grid}
                className={[
                  styles.ChessGrid,
                  grid,
                  oddEvenClass,
                  isGridInPossibleMoves,
                ].join(' ')}
              >
                {gridState[grid] !== '' && (
                  <ChessPiece
                    id={chessPiece.id}
                    name={chessPiece.name}
                    color={chessPiece.color}
                    grid={chessPiece.grid}
                    value={chessPiece.value}
                    onClick={chessPieceClickHandler}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

ChessBoard.displayName = 'ChessBoard';

export default ChessBoard;
