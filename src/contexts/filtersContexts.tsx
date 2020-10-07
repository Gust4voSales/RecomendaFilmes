import React, { createContext, useContext, useState } from 'react';

interface Filter {
  option: string;
  with_genres: string;
  without_genres: string;
  with_people: string;
  with_companies: string;
  primary_release_year: number | null;
}

interface FilterContextData {
  filter: Filter;
  changeFilter(filter: Filter): void;
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData);

export const FilterProvider: React.FC = ({children}) => {
  const [filter, setFilter] = useState<Filter>({
    option: 'movie',
    with_genres: '',
    without_genres: '',
    with_people: '',
    with_companies: '',
    primary_release_year: null,
  });

  function changeFilter(newFilter: Filter) {
    if (JSON.stringify(filter)!==JSON.stringify(newFilter)) {
      console.log(newFilter);
      setFilter(newFilter);
    }
  }

  return (
    <FilterContext.Provider value={{filter, changeFilter}}>
      {children}
    </FilterContext.Provider>
  );
}

//  Create own hook that exports the FilterContext
export function useFilter() {
  const context = useContext(FilterContext);

  return context;
}