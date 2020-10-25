import React from 'react';
import { useFilter } from '../../contexts/filtersContexts';
import './styles.scss';

interface GenresTagsProps {
  genre_ids: number[];
}

const GenresTags: React.FC<GenresTagsProps> = ({ genre_ids }) => {
  const { filter, movieGenres, tvGenres } = useFilter();

  function getMovieGenreName(genreId: number) {
    for (let genre of movieGenres) {
      if (genre.id===genreId)
        return genre.name;
    }
    return '';
  }
  function getTvGenreName(genreId: number) {
    for (let genre of tvGenres) {
      if (genre.id===genreId)
        return genre.name;
    }
    return '';
  }

  return (
    <ul id="tag-list">
      {genre_ids.map(genre => (
        <li className="tag">
          {filter.option === 'tv'
            ? getTvGenreName(genre)
            : getMovieGenreName(genre)
          }
        </li>
      ))}
    </ul>
  );
}

export default GenresTags;