import React from 'react';
import { useRecoilState } from 'recoil';
import { chessBoardGridState } from '../store/ChessboardStore';
import { ChessPiece } from './types';
import styles from './ChessBoard.module.scss';

const ChessBoard: React.FC = () => {
  const [gridState] = useRecoilState(chessBoardGridState);
  let counter: number = 1;
  return (
    <div className={[styles.ChessBoardOuter].join(' ')}>
      <div className={[styles.ChessBoardInner].join(' ')}>
        {Object.keys(gridState)
          .sort((a: any, b: any) => {
            const a1 = Number(a.split('')[1]);
            const b1 = Number(b.split('')[1]);
            return a1 - b1;
          })
          .map((grid: string, i: number) => {
            const chessPieceName = (gridState[grid] as ChessPiece).name;
            const chessPieceColor = (gridState[grid] as ChessPiece).color;
            const oddEvenClass =
              (i + counter) % 2 === 0 ? styles.even : styles.odd;
            // counter to determine row and increment odd / even calculation
            if ((i + 1) % 8 === 0) {
              counter++;
            }
            return (
              <div className={[styles.ChessGrid, grid, oddEvenClass].join(' ')}>
                {gridState[grid] !== '' && (
                  <div
                    className={[
                      styles.ChessPiece,
                      chessPieceName,
                      chessPieceColor,
                    ].join(' ')}
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
