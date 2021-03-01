import React, { useEffect, useState,} from 'react';
import { useFilter } from '../../../contexts/filtersContexts';
import { Props } from '../props';
import './styles.scss';


const certifications = [
  {color: '#0C9447', value: 'L' },
  {color: '#0F7DC2', value: '10' },
  {color: '#F8C411', value: '12' },
  {color: '#E67824', value: '14' },
  {color: '#DB2827', value: '16' },
  {color: '#1D1815', value: '18' },
];

const Year: React.FC<Props> = ({ shouldReload, style }) => {
  const { 
    filter, 
    changeFilter, 
    certificationState, 
    setCertificationState, 
  } = useFilter();
  const [certificationValue, setCertification] = useState(certificationState);

  // When shouldReload changes then clear the filter 
  useEffect(() => {
    if (shouldReload) {
      setCertification('');
    }
  }, [shouldReload]);

  useEffect(() => {
    changeFilter({ ...filter, certification: certificationValue, });
    
    setCertificationState(certificationValue);
    // eslint-disable-next-line
  }, [certificationValue]);

  function handleCertificationSelection(newCertification: string) {
    if (certificationValue===newCertification) {
      setCertification('');
    } else {
      setCertification(newCertification);
    }
  }

  return (
    <div id="container" style={style}>
      <strong>Classificação indicativa</strong>
      <span>
      Limite os resultados apenas à títulos  com classificação indicativa <span>igual</span> à selecionada
      </span>
  
      <div className="certifications-container">
        {
          certifications.map(certificationObj => (
            <div 
              onClick={() => handleCertificationSelection(certificationObj.value)}
              className={certificationObj.value===certificationValue ? 'selected' : 'not-selected'}
              style={{ backgroundColor: certificationObj.color, }} 
              key={certificationObj.value}
            >
              {certificationObj.value}
            </div>
          ))
        }
      </div>
      
      {/* Placeholder DIV to fix spacing */}
      <div />
      
    </div>
  );
}

export default Year;