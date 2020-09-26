import React, { createContext, useContext } from 'react';

const FilterContext = createContext({ filter: {} });

export const FilterProvider: React.FC = ({children}) => {
  return (
    <FilterContext.Provider value={{ filter: {} }}>
      {children}
    </FilterContext.Provider>
  );
}

//  Create own hook that exports the FilterContext
export function useFilter() {
  const context = useContext(FilterContext);

  return context;
}