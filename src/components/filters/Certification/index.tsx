import React, { useEffect, useState,} from 'react';
import { FaEquals, FaLessThanEqual, FaGreaterThanEqual } from 'react-icons/fa';
import { useFilter } from '../../../contexts/filtersContexts';
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
  const { filter, changeFilter } = useFilter();
  const [certificationValue, setCertification] = useState('');
  const [option, setOption] = useState('equal');

  useEffect(() => {
    if (!certificationValue.length) {
      changeFilter({ ...filter, 
        certification_lte: '', 
        certification: '', 
      });
      return;
    }
    
    if (option==='equal') 
      changeFilter({ ...filter, certification_lte: '', certification: certificationValue, });
    else 
      changeFilter({ ...filter, certification: '', certification_lte: certificationValue, });

    // eslint-disable-next-line
  }, [certificationValue, option]);

  function handleCertificationSelection(newCertification: string) {
    if (certificationValue===newCertification) {
      setCertification('');
    } else {
      setCertification(newCertification);
    }
  }

  function handleSelectLessEqualGreater(optionSelected: string) {
    if (option === optionSelected) 
      return;

    setOption(optionSelected);
  }

  function translateOption() {
    if (option==='equal') return 'igual';
    
    return 'menor ou igual';
  }
  
  return (
    <div id="container">
      <strong>Classificação indicativa</strong>
      <span>
      Limite os resultados apenas à títulos  com classificação indicativa <span>{translateOption()}</span> à selecionada
      </span>
      <div className="radio-buttons" >
        <button onClick={() => handleSelectLessEqualGreater('less')} className={option==='less' ? 'selected' : ''}>
          <FaLessThanEqual />
        </button>
        <button onClick={() => handleSelectLessEqualGreater('equal')} className={option==='equal' ? 'selected' : ''}>
          <FaEquals />
        </button>
      </div>
      <div className="certifications-container">
        {
          certifications.map(certificationObj => (
            <div 
              onClick={() => handleCertificationSelection(certificationObj.value)}
              className={certificationObj.value===certificationValue ? 'selected' : 'not-selected'}
              style={{ backgroundColor: certificationObj.color, }} 
            >
              {certificationObj.value}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Year;