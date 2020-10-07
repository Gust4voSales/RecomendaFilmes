import React, { useEffect, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { useFilter } from '../../../contexts/filtersContexts';
import './styles.scss';

const currentYear =  new Date().getFullYear();
const Year: React.FC = () => {
  const [year, setYear] = useState('');
  
  const { filter, changeFilter } = useFilter();
  
  useEffect(() => {
    // console.log(year);
    if (isYearValid()) {
      changeFilter({ ...filter, primary_release_year: Number(year)});
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

    if ((Number(year) < 1900 )|| (Number(year) > currentYear+10)) {
      return false;
    }
    return true;
  }

  return (
    <div id="container">
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
          max={currentYear+10}  
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