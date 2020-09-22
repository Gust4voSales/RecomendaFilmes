import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import Modal from 'react-modal';

import './styles.scss';

const Genre: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    
  }, []);

  Modal.setAppElement('#root');
  return (
    <div id="container">
      <strong>Gêneros</strong>
      <span>
        Selecione seus gêneros favoritos e/ou os que nao deseja serem incluídos nos resultados
      </span>
      <button onClick={() => setIsModalOpen(true)}>Selecionar gênero</button>
      <Modal
          isOpen={isModalOpen}
          className="modal"
          overlayClassName="overlay"
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Selecionar Gêneros"
      >
        <button className="exit" onClick={() => setIsModalOpen(false)}> 
          <MdCancel size={'4.5rem'} />
        </button>
        <div className="genres-container">
          <ul>
            <li>Ação</li>
            <li>Ação</li>
            <li>Ação</li>
            <li>Ação</li>
            <li>Ação</li>
            <li>Ação</li>
          </ul>
        </div>
        <div className="genres-container">
          <ul>
            <li>Romance</li>
            <li>Romance</li>
            <li>Romance</li>
            <li>Romance</li>
            <li>Romance</li>
            <li>Romance</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export default Genre;