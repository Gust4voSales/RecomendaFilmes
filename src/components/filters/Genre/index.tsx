import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import Modal from 'react-modal';
import { useFilter } from '../../../contexts/filtersContexts';
import tmdbAPI from '../../../services/api';

import './styles.scss';

interface genreResponse {
  id: number;
  name: string;
}

const Genre: React.FC = () => {
  const filterContext = useFilter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState<genreResponse[]>([]);
  // const [tvGenres, setTvGenres] = useState<genreResponse[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      const { data } = await tmdbAPI.get('/genre/movie/list');
      // console.log(data, filterContext.filter);'
      setMovieGenres(data.genres);
    }

    fetchGenres();
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
            {
              movieGenres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))
            }
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