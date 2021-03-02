import React, { useEffect, useState } from 'react';
import icon from '../../assets/icon.png';
import './styles.scss';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const Landing = () => {
	const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
		window.scrollTo(0, 0)
	}, []);

	function disableScroll() {
    document.body.style.overflow = 'hidden';
  }

	const handleModalClose = () => {
		setOpenModal(false);
    document.body.style.overflow = 'auto';
	};

	Modal.setAppElement('#root');
	return(
		<div id="landing">
			<header className="header">
				<img src={icon} alt="Ícone"/>
				<h1>Recomenda<span>Filmes</span></h1>
			</header>

			<div className="content">
				<p>
					Encontre filmes e séries de acordo com o seu gosto.
					<br/>Combine os filtros e com certeza irá encontrar algo que agrade!
				</p>

				<div className="buttonsContainer">
					<Link to="/recomendar" className="primaryButton">Me recomende algo</Link>
					<button onClick={() => setOpenModal(true)}>Como funciona?</button>
				</div>
			
				{/* OVERLAY style is from Genre filter styles  */}
				<Modal
					isOpen={openModal}
					className="landing-modal"
					overlayClassName="overlay"
					onRequestClose={handleModalClose}
					contentLabel="Demonstração"
					onAfterOpen={disableScroll}
				>
					<iframe 
						width="720px" 
						height="480px" 
						title="RecomendaFilmes - Demonstração"
						src={'https://www.youtube.com/embed/DhE6_Zahem8?rel=0&'}
						allowFullScreen
					/>
				</Modal>
			</div>
		</div>
	);
}

export default Landing;