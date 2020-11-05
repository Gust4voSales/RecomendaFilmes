import React, { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
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
  peopleState: PeopleData[];
  setPeopleState(people: PeopleData[]): void;
  genreState: SelectedGenre[];
  setGenreState(genres: SelectedGenre[]): void;
  certificationState: string;
  setCertificationState(certification: string): void;
  certificationOptState: string;
  setCertificationOptState(option: string): void;
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

export { filterInitialState }

const FilterContext = createContext<FilterContextData>({} as FilterContextData);

export const FilterProvider: React.FC = ({children}) => {
  const [filter, setFilter] = useState<Filter>(filterInitialState);
  const [movieGenres, setMovieGenres] = useState<genreResponse[]>([]);
  const [tvGenres, setTvGenres] = useState<genreResponse[]>([]);

  const [peopleState, setPeopleState] = useState<PeopleData[]>([]);
  const [genreState, setGenreState] = useState<SelectedGenre[]>([]);
  const [certificationState, setCertificationState] = useState('');
  const [certificationOptState, setCertificationOptState] = useState('equal');
  
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

  // function setPeopleState(people: PeopleData[]) {
  //   setPeopleState(people);
  // }

  return (
    <FilterContext.Provider 
      value={{
        filter, 
        changeFilter, 
        movieGenres, 
        tvGenres, 
        peopleState, 
        setPeopleState,
        genreState,
        setGenreState,
        certificationState,
        setCertificationState,
        certificationOptState, 
        setCertificationOptState,
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