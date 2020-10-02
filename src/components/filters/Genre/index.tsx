import React, { useCallback, useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import Modal from 'react-modal';
import { useFilter } from '../../../contexts/filtersContexts';
import tmdbAPI from '../../../services/api';

import './styles.scss';

interface genreResponse {
  id: number;
  name: string;
}

interface selectedGenre {
  id: number;
  name: string;
  include: boolean;
}

const Genre: React.FC = () => {
  const { filter, changeFilter } = useFilter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState<genreResponse[]>([]);
  const [tvGenres, setTvGenres] = useState<genreResponse[]>([]);
  const [genres, setGenres] = useState<genreResponse[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<selectedGenre[]>([]);

  useEffect(() => {
    setSelectedGenres([]);
    
    if (filter.option === 'movie') {
      setGenres([...movieGenres]);
    } else {
      setGenres([...tvGenres]);
    }
  }, [filter.option, tvGenres, movieGenres]);

  const fetchGenresCallback = useCallback(() => {
    async function fetchGenres() {
      const movieResponse = await tmdbAPI.get('/genre/movie/list');
      console.log('Fetch genres');
      setMovieGenres(movieResponse.data.genres);
      const tvResponse = await tmdbAPI.get('/genre/tv/list');
      setTvGenres(tvResponse.data.genres);
    }
    
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchGenresCallback();
  }, [fetchGenresCallback]);

  useEffect(() => {
    // console.log(selectedGenres);
    
  }, [selectedGenres]);

  function handleGenreSelection(genreId: number, name: string, include: boolean) {
    for(let selectedGenre of selectedGenres) {
      // If it was already on the list, than the user unchecked, should remove from list
      if (selectedGenre.id === genreId) {
        setSelectedGenres(selectedGenres.filter(genre => genre.id !== genreId));
        return;
      }
    }
    setSelectedGenres([ ...selectedGenres, {id: genreId, name, include,} ]);
    changeFilter(filter );
  }

  function checkSelected(genreId: number, include: boolean) {
    for(let selectedGenre of selectedGenres) {
      if(selectedGenre.id === genreId && selectedGenre.include === include) {
        return true;
      }
    }
    return false;
  }

  function checkDisableSelect(genreId: number, include: boolean) {
    return checkSelected(genreId, !include);
  }

  Modal.setAppElement('#root');
  return (
    <div id="container">
      <strong>Gêneros</strong>
      <span>
        Selecione seus gêneros favoritos e/ou os que nao deseja serem incluídos nos resultados
      </span>
      <button onClick={() => setIsModalOpen(true)} >Selecionar gênero</button>
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
          <strong>Incluir</strong>
          <ul>
            {
              genres.map(genre => (
                <li key={genre.id}>
                  <span style={checkDisableSelect(genre.id, true) ? { color: '#B7B7B7' } : {}}>
                    {genre.name}
                  </span>
                  <input 
                    type="checkbox" 
                    name="genre-selection" 
                    id="genre-selection"
                    checked={checkSelected(genre.id, true)}
                    disabled={checkDisableSelect(genre.id, true)}
                    title={checkDisableSelect(genre.id, true) 
                      ? 'Desmarque da outra lista para marcar' 
                      : 'Selecionar'
                    }
                    onChange={() => handleGenreSelection(genre.id, genre.name, true)}
                  />
                </li>
              ))
            }
          </ul>
        </div>
        <div className="genres-container not-include">
          <strong>Não incluir</strong>
          <ul>
            {
              genres.map(genre => (
                <li key={genre.id}>
                  <span style={checkDisableSelect(genre.id, false) ? { color: '#B7B7B7' } : {}}>
                    {genre.name}
                  </span>
                  <input 
                    type="checkbox" 
                    name="genre-selection" 
                    id="genre-selection"
                    checked={checkSelected(genre.id, false)}
                    disabled={checkDisableSelect(genre.id, false)}
                    title={checkDisableSelect(genre.id, false) 
                      ? 'Desmarque da outra lista para marcar' 
                      : 'Selecionar'
                    }
                    onChange={() => handleGenreSelection(genre.id, genre.name, false)}
                  />
                </li>
              ))
            }
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export default Genre;