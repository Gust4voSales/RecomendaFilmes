import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useFilter } from '../../contexts/filtersContexts';
import './styles.scss';

interface ResultsIndicatorProps {
  showIndicator: boolean;
  onScrollToResultsClick(): void;
}

const ResultsIndicator: React.FC<ResultsIndicatorProps> = ({ showIndicator, onScrollToResultsClick }) => {
  const { loadingResults } = useFilter();

  function handleSeeResults() {
    onScrollToResultsClick();
  }
  
  return (
    <div 
      id="indicator" 
      style={showIndicator ? {} : { opacity: 0, pointerEvents: 'none' }}
    >
      {
        loadingResults
        ? (<div>
            <h2>Carregando</h2>
          </div>)
        : (<div className="results-indicator" onClick={handleSeeResults}>
            <IoIosArrowDown className="arrow-icon"/>
            <span>Ver resultados</span>
          </div>)
      }
    </div>
  );
}

export default ResultsIndicator;