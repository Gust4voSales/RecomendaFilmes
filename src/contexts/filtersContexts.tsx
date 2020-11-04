import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import tmdbAPI from '../services/api';

interface Filter {
  option: string;
  with_genres: string;
  without_genres: string;
  with_people: string;
  primary_release_year: number;
  first_air_date_year: number;
  certification: string;
  certification_lte: string;
}

interface genreResponse {
  id: number;
  name: string;
}

interface FilterContextData {
  filter: Filter;
  changeFilter(filter: Filter): void;
  movieGenres: genreResponse[];
  tvGenres: genreResponse[];
}

const filterInitialState = {
  option: 'movie',
  with_genres: '',
  without_genres: '',
  with_people: '',
  primary_release_year: 0,
  first_air_date_year: 0,
  certification: '',
  certification_lte: '',
}

export { filterInitialState  }

const FilterContext = createContext<FilterContextData>({} as FilterContextData);

export const FilterProvider: React.FC = ({children}) => {
  const [filter, setFilter] = useState<Filter>(filterInitialState);
  const [movieGenres, setMovieGenres] = useState<genreResponse[]>([]);
  const [tvGenres, setTvGenres] = useState<genreResponse[]>([]);

    // Fetch movie and tv genres only once.
    const fetchGenresCallback = useCallback(() => {
      async function fetchGenres() {
        const movieResponse = await tmdbAPI.get('/genre/movie/list');
        setMovieGenres(movieResponse.data.genres);
  
        const tvResponse = await tmdbAPI.get('/genre/tv/list');
        setTvGenres(tvResponse.data.genres);
      }
      
      fetchGenres();
    }, []);
    useEffect(() => {
      fetchGenresCallback();
    }, [fetchGenresCallback]);
  
  function changeFilter(newFilter: Filter) {
    if (JSON.stringify(filter)!==JSON.stringify(newFilter)) {
      console.log(newFilter);
      setFilter(newFilter);
    }
  }

  return (
    <FilterContext.Provider value={{filter, changeFilter, movieGenres, tvGenres, }}>
      {children}
    </FilterContext.Provider>
  );
}

//  Create own hook that exports the FilterContext
export function useFilter() {
  const context = useContext(FilterContext);

  return context;
}