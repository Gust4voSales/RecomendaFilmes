import React, { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import '../../components/SearchInput.scss';
import queryString from 'query-string';
import { useFilter } from '../../contexts/filtersContexts';
import tmdbAPI from '../../services/api';
import Axios from 'axios';
import { recommendationsResponse } from '../../components/RecommendationsResults';
import SmallTitleCard from '../../components/SmallTitleCard';
import './styles.scss';


const CancelToken = Axios.CancelToken;
let cancel: any = undefined;

const SearchResults: React.FC = () => {
  const history = useHistory();
  const { filter, changeFilter } = useFilter();

  const [searchText, setSearchText] = useState(getQueryParams());
  const [results, setResults] = useState<recommendationsResponse[]>([]);

  useEffect(() => {
		window.scrollTo(0, 0)
	}, []);

  useEffect(() => {
    if (searchText.length===0)
      history.push({
        pathname: `/recomendar`,
        state: { returningFromSearch: true },
      });
    else {
      history.push(`/pesquisar?q=${searchText}`);
    }
  }, [searchText, history]);

  useEffect(() => {
    async function searchTitles() {
      if (cancel!==undefined) {
        cancel();
      }
      
      try {
        const { data } = await tmdbAPI.get(`search/${filter.option}`, { 
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
          params: {
            query: searchText,
          } 
        });
        
        setResults(data.results);
        // console.log(searchText, ': ', data.results[0]);
      } catch (err) {
        // console.log('erro search: ', err,);
      }
    }

    if (searchText.length<1) {
      setResults([]);
      return; 
    }
    searchTitles();
  }, [searchText, filter.option]);


  function getQueryParams() {
    const parsedObjQuery = queryString.parse(history.location.search)
    return parsedObjQuery.q || '';
  };

  function handleOptionResultsSelection(option: string) {
    changeFilter({ ...filter, option });
  }

  return (
    <div id="recommend">   
      <Header backButtonRoute="/recomendar"/>

      <section className="filters" >
        <div className="description-container">
          <div className="top">
            <span>Pesquise por um{filter.option==='movie' ? ' filme' : 'a série'}</span>
            <div className="radio-container">
              <button 
                style={
                  filter.option==='movie' 
                  ? { backgroundColor: '#575757' } 
                  : {backgroundColor: 'transparent' } 
                }
                onClick={() => handleOptionResultsSelection('movie')}
              >
                Filmes
              </button>
              <button
                style={
                  filter.option==='tv'
                  ? { backgroundColor: '#575757' } 
                  : { backgroundColor: 'transparent' } 
                }
                onClick={() => handleOptionResultsSelection('tv')}
              >
                Séries
              </button>
            </div>
          </div>
          
          <div className="search-input">
            <MdSearch size={'4rem'} className="search-icon"/>
            <input 
              name="search" 
              id="search" 
              type="search"
              autoComplete="off"
              spellCheck={false}
              value={searchText}
              autoFocus
              onChange={e => setSearchText(e.target.value)}
              placeholder={"Nome d"+(filter.option==='movie'? 'o filme' : 'a série')}
            />
          </div> 
        </div>
      </section>
      
      <ul className="search-results">
        {
          results.map(result => (
            <li key={result.id}>
              <SmallTitleCard data={result} />
            </li>
          ))
        }
        {
          results.length===0 ? <span>Nenhum resultado encontrado para: {searchText}</span>  : null 
        }
      </ul>

    </div>
  );
}

export default SearchResults;