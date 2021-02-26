import React from 'react';
import './styles.scss';

interface LoadMoreButtonProps {
  onClick(): void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="load-more-btn">Carregar mais</button>
  );
}

export default LoadMoreButton;