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
}

interface genreResponse {
  id: number;
  name: string;
}

export interface PeopleData {
  value: number;
  label: string;
  name: string;
}

export interface SelectedGenre {
  id: number;
  name: string;
  include: boolean;
}

interface FilterContextData {
  filter: Filter;
  changeFilter(filter: Filter): void;
  movieGenres: genreResponse[];
  tvGenres: genreResponse[];

  // These are required to persist the state from the filter interface
  loadingResults: boolean;
  setLoadingResults(value: boolean): void;
  
  peopleState: PeopleData[];
  setPeopleState(people: PeopleData[]): void;
  genreState: SelectedGenre[];
  setGenreState(genres: SelectedGenre[]): void;
  certificationState: string;
  setCertificationState(certification: string): void;
}

const filterInitialState = {
  option: 'movie',
  with_genres: '',
  without_genres: '',
  with_people: '',
  primary_release_year: 0,
  first_air_date_year: 0,
  certification: '',
}

export { filterInitialState }

const FilterContext = createContext<FilterContextData>({} as FilterContextData);

export const FilterProvider: React.FC = ({children}) => {
  const [filter, setFilter] = useState<Filter>(filterInitialState);
  const [movieGenres, setMovieGenres] = useState<genreResponse[]>([]);
  const [tvGenres, setTvGenres] = useState<genreResponse[]>([]);

  // These are required to persist the state from the filter interface
  const [loadingResults, setLoadingResults] = useState(false);
  const [peopleState, setPeopleState] = useState<PeopleData[]>([]);
  const [genreState, setGenreState] = useState<SelectedGenre[]>([]);
  const [certificationState, setCertificationState] = useState('');
  
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
    <FilterContext.Provider 
      value={{
        filter, 
        changeFilter, 
        movieGenres, 
        tvGenres, 
        loadingResults,
        setLoadingResults,
        peopleState, 
        setPeopleState,
        genreState,
        setGenreState,
        certificationState,
        setCertificationState,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

//  Create own hook that exports the FilterContext
export function useFilter() {
  const context = useContext(FilterContext);

  return context;
}