import React, { useCallback, useEffect, useState } from 'react';
import { MdCancel, MdClear } from 'react-icons/md';
import Modal from 'react-modal';
import { useFilter } from '../../../contexts/filtersContexts';
import tmdbAPI from '../../../services/api';
import { Props } from '../props';
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

const Genre: React.FC<Props> = ({ shouldReload }) => {
  const { filter, changeFilter } = useFilter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState<genreResponse[]>([]);
  const [tvGenres, setTvGenres] = useState<genreResponse[]>([]);
  const [genres, setGenres] = useState<genreResponse[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<selectedGenre[]>([]);

  // When shouldReload changes then clear the filter 
  useEffect(() => {
    setSelectedGenres([]);
    updateFilter([]);

    // eslint-disable-next-line
  }, [shouldReload]);

  useEffect(() => {
    setSelectedGenres([]);

    if (filter.option === 'movie') {
      setGenres([...movieGenres]);
    } else {
      setGenres([...tvGenres]);
    }
  }, [filter.option, tvGenres, movieGenres]);

  // Fetch movie and tv genres only once.
  const fetchGenresCallback = useCallback(() => {
    async function fetchGenres() {
      const movieResponse = await tmdbAPI.get('/genre/movie/list');
      setMovieGenres(movieResponse.data.genres);

      const tvResponse = await tmdbAPI.get('/genre/tv/list');
      setTvGenres(tvResponse.data.genres);
    }
    
    fetchGenres();
  }, []);
  useEffect(() => {
    fetchGenresCallback();
  }, [fetchGenresCallback]);

  function handleGenreSelection(genreId: number, name: string, include: boolean) {
    for(let selectedGenre of selectedGenres) {
      // If it was already on the list, than the user unchecked, should remove from list
      if (selectedGenre.id === genreId) {
        setSelectedGenres(selectedGenres.filter(genre => genre.id !== genreId));
        return;
      }
    }
    setSelectedGenres([ ...selectedGenres, {id: genreId, name, include,} ]);
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

  function updateFilter(selectedGenres: selectedGenre[]) {
    // with_genres and without_genres are strings with the genres' ids separeted by commas
    let with_genres = '';
    let without_genres = '';

    for (let selectedGenre of selectedGenres) {
      if(selectedGenre.include) {
        with_genres += String(selectedGenre.id) + ',';
      } else {
        without_genres += String(selectedGenre.id) + ',';
      }
    }
      
    changeFilter({ ...filter, with_genres, without_genres });
  }

  function handleRemoveGenre(genreId: number) {    
    let updatedSelectedGenres = selectedGenres.filter(genre => genre.id!==genreId);
    setSelectedGenres(updatedSelectedGenres);

    updateFilter(updatedSelectedGenres);
  }

  // Only changes the filter when the user has closed the modal 
  function onModalClose() {
    setIsModalOpen(false);
    updateFilter(selectedGenres);
  }

  Modal.setAppElement('#root');
  return (
    <div id="container">
      <strong>Gêneros</strong>
      <span>
        Selecione seus gêneros favoritos e/ou os que nao deseja serem incluídos nos resultados
      </span>
      <button onClick={() => setIsModalOpen(true)} >Selecionar gênero</button>
      <ul className="selected-genres-list">
        {
          selectedGenres.map(selectedGenre => (
            <li 
              key={selectedGenre.id}
            >
              <span style={selectedGenre.include ? {} : { color: '#B7B7B7', textDecoration: 'line-through' } }>
                {selectedGenre.name}
              </span>
              <MdClear 
                onClick={() => handleRemoveGenre(selectedGenre.id)}
                className="remove-genre-icon"
              />
            </li>
          ))
        }
      </ul>

      <Modal
          isOpen={isModalOpen}
          className="modal"
          overlayClassName="overlay"
          onRequestClose={onModalClose}
          contentLabel="Selecionar Gêneros"
      >
        <button className="exit" onClick={onModalClose}> 
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