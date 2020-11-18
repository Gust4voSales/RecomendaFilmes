import React from 'react';
import './styles.scss';


interface GenreTagProps {
  name: string;
  id: number;
}

const GenreTag: React.FC<GenreTagProps> = ({ name }) => {
  return (
    <li className="genre-tag">
      {name}
    </li>
  );
}

export default GenreTag;