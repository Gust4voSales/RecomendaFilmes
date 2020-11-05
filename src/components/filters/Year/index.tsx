import React, { useEffect, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { useFilter } from '../../../contexts/filtersContexts';
import { Props } from '../props';
import './styles.scss';

const currentYear =  new Date().getFullYear();
const Year: React.FC<Props> = ({ shouldReload }) => {
  const { filter, changeFilter } = useFilter();

  const [year, setYear] = useState(
    filter.primary_release_year===0 
    ? ''
    : String(filter.primary_release_year)
  );
  
  // When shouldReload changes then clear the filter 
  useEffect(() => {
    if (shouldReload) {
      setYear('');
    }
  }, [shouldReload]);

  useEffect(() => {
    // console.log(year);
    if (isYearValid()) {
        changeFilter({ 
          ...filter, 
          primary_release_year: Number(year),
          first_air_date_year: Number(year),
        });
    }

    // eslint-disable-next-line
  }, [year,]);

  function checkYear() {
    if (!isYearValid()) {
      setYear(String(currentYear));
    }
  }

  function isYearValid() {
    if (!year.length) 
      return true;

    const yearInt = Number(year);
    if ((yearInt < 1900 )|| (yearInt > currentYear)) {
      return false;
    }
    return true;
  }

  return (
    <div id="container" className="year-container">
      <strong>Ano de lançamento</strong>
      <span>
        Limite os resultados apenas à títulos  lançados no ano selecionado
      </span>
      <div className="input">
        <input 
          name="year" 
          type="number"
          placeholder={String(currentYear)}
          onChange={e => setYear(e.target.value)} 
          min={1900} 
          value={year}
          max={currentYear}  
          step={1} 
          onBlur={checkYear}
        />
        {
          year.length>0 && <MdClear onClick={() => setYear('')} className="clear-text"/>
        } 
      </div>
      <div />
    </div>
  );
}

export default Year;