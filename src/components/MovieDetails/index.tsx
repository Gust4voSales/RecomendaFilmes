import React from 'react';
import { MovieDetailsData } from '../../pages/Details';
import './styles.scss';

interface MovieDetailsProps {
  details: MovieDetailsData;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ details }) => {
  function parseData() {
    const stringDataUS = details.release_date;

    const parsedData = `${stringDataUS.slice(8, 10)}/${stringDataUS.slice(5, 7)}/${stringDataUS.slice(0, 4)}`
    
    return parsedData;
  }
  
  function translateStatus() {
    const status = details.status;
    if (status==='Rumored') {
      return 'Rumor';
    } else if (status==='Planned') {
      return 'Planejado';
    } else if (status==='In Production') {
      return 'Em produção';
    } else if (status==='Post Production') {
      return 'Pós produção';
    } else if (status==='Released') {
      return 'Lançado';
    } else if (status==='Canceled') {
      return 'Cancelado';
    } 
    return '';
  }

  return (
    <div className="details-container">
      <div className="info-box">
        <span>Duração:</span>
        <p>{details.runtime} min</p>
      </div>
      <div className="info-box">
        <span>Data de lançamento:</span>
        <p>{parseData()}</p>
      </div>
      <div className="info-box">
        <span>Status:</span>
        <p>{translateStatus()}</p>
      </div>
    </div>
  );
}

export default MovieDetails;