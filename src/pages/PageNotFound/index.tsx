import React from 'react';
import Header from '../../components/Header';
import DeadEyesIcon from '../../assets/icon-dead-eyes.png';
import './styles.scss';

const PageNotFound: React.FC = () => {
  return (
    <div id="not-found">
      <Header backButtonRoute="/" />
      <div className="main">
        <div className="error">
          <span className="oops-text">Oooops</span>
          <span className="status-text">404</span>
          <span className="error-text">Página não encontrada</span>
        </div>
        <img src={DeadEyesIcon} alt="404-icon"/>
      </div>
    </div>
  );
}

export default PageNotFound;