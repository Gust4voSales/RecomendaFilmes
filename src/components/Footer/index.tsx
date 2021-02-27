import React from 'react';
import logo from '../../assets/icon.png';
import './styles.scss';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="contact-container">
        <h4>Contato</h4>
        <div className="icons">
          <a href="https://github.com/Gust4voSales" target="_blank" rel="noopener noreferrer">
            <img src={require('../../assets/github.svg')} alt="github-logo"/></a>
          <a href="https://www.youtube.com/channel/UCctz-c-Iz_L1OMUo2YQMnMg" target="_blank" rel="noopener noreferrer">
            <img src={require('../../assets/youtube.svg')} alt="youtube-logo"/></a>
          <a href="mailto:manoel0gustavo@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../assets/gmail.svg')} alt="gmail-logo"/></a>            
        </div>
        <span className="span-credit">
          by <a href="https://github.com/Gust4voSales" target="_blank" rel="noopener noreferrer">Gust4voSales</a> 🚀
        </span>
      </div>
      <div className="central-logo">
        <img src={logo} alt="RecomendaFilmes"/>
      </div>
      <div className="tmdb-credits-container">
        <img src={require('../../assets/tmdb_logo.svg')} alt="tmdb-logo"/>
        <span>This product uses the TMDb API but is not endorsed or certified by TMDb.</span>
      </div>
    </footer>
  );
}

export default Footer;