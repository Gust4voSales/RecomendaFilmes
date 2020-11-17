import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import './styles.scss';

interface ResultsIndicatorProps {
  showIndicator: boolean;
}

const ResultsIndicator: React.FC<ResultsIndicatorProps> = ({ showIndicator }) => {
  function handleSeeResults() {
    console.log('scroll para ver resultados');
    
  }
  
  return (
    <div 
      id="indicator" 
      style={showIndicator ? {} : { opacity: 0, pointerEvents: 'none' }}
    >
      <div className="results-indicator" onClick={handleSeeResults}>
        <IoIosArrowDown className="arrow-icon"/>
        <span>Ver resultados</span>
      </div>
    </div>
  );
}

export default ResultsIndicator;