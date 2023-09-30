import React from 'react';
import { IChessPiece } from './types';
import styles from './ChessBoard.module.scss';

type ChessPieceProps = {
  onClick?: () => void;
} & IChessPiece;

const ChessPiece: React.FC<ChessPieceProps> = ({ name, color, onClick }) => {
  return (
    <div
      className={[styles.ChessPiece, name, color].join(' ')}
      onClick={onClick}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      aria-label={`${name} ${color}`}
    />
  );
};

ChessPiece.displayName = 'ChessPiece';

export default ChessPiece;
