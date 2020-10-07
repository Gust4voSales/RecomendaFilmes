import React, { useEffect, useState,} from 'react';
// import { useFilter } from '../../../contexts/filtersContexts';
import './styles.scss';


const certifications = [
  {color: '#0C9447', value: 'L' },
  {color: '#0F7DC2', value: '10' },
  {color: '#F8C411', value: '12' },
  {color: '#E67824', value: '14' },
  {color: '#DB2827', value: '16' },
  {color: '#1D1815', value: '18' },
];

const Year: React.FC = () => {
  // const { filter, changeFilter } = useFilter();
  const [certification, setCertification] = useState('');

  useEffect(() => {
    console.log('c '+ certification);
    
  }, [certification]);

  function handleCertificationSelection(newCertification: string) {
    if (certification===newCertification) {
      setCertification('');
    } else {
      setCertification(newCertification);
    }
  }
  
  return (
    <div id="container">
      <strong>Classificação indicativa</strong>
      <span>
      Limite os resultados apenas à títulos  com classificação indicativa igual à selecionada
      </span>
      <div className="certifications-container">
        {
          certifications.map(certificationObj => (
            <div 
              onClick={() => handleCertificationSelection(certificationObj.value)}
              className={certificationObj.value===certification ? 'selected' : 'not-selected'}
              style={{ backgroundColor: certificationObj.color, }} 
            >
              {certificationObj.value}
            </div>
          ))
        }
      </div>

      <div />
    </div>
  );
}

export default Year;