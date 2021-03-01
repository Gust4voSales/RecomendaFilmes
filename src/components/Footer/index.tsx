import React from 'react';
import { IoMdArrowRoundUp } from 'react-icons/io';
import logo from '../../assets/icon.png';
import './styles.scss';

const Footer: React.FC = () => {
  function scrollBackToTop() {
		window.scrollTo({top: 0, behavior: 'smooth'});
	}

  return (
    <section>
    <button className="scroll-top-container" onClick={scrollBackToTop} >
      <IoMdArrowRoundUp 
        className="scroll-top-icon"         
      />
      <span>Voltar pro topo</span>
    </button>

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
    </section>
  );
}

export default Footer;