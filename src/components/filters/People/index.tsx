import React, { useEffect, useState } from 'react';
import { MdClear } from 'react-icons/md';
import AsyncSelect from 'react-select/async';
import tmdbAPI from '../../../services/api';
import { useFilter } from '../../../contexts/filtersContexts';
import axios from 'axios';
import './styles.scss';

const CancelToken = axios.CancelToken;
let cancel: any = undefined;


interface peopleResponse {
  id: number;
  name: string;
  popularity: number;
  profile_path: string | null;
}

interface peopleData {
  value: number;
  label: string;
  name: string;
}

const People: React.FC = () => {
  const { filter, changeFilter } = useFilter();
  const [people, setPeople] = useState<peopleData[]>([]);

  useEffect(() => {
    let with_people: string = '';

    for (let person of people) {
      with_people += String(person.value) + ',';
    }
    
    changeFilter({ ...filter, with_people, });
    
    // eslint-disable-next-line
  }, [people,]);

  async function fetchPeople(inputValue: string, callback: CallableFunction) {
    if (cancel!==undefined) {
      cancel();
    }
    
    try {
      const { data } = await tmdbAPI.get(`/search/person`, {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
        params: {
          query: inputValue,
          page: 1,
        }
      });
  
      let limitedSortedPeople = 
        data.results
          .sort((a: peopleResponse, b: peopleResponse) => 
            (a.popularity > b.popularity ? -1 : 1));
  
      // Instead of giving a text to the label, I'm passing an html with the person's image
      callback(limitedSortedPeople.map((person: peopleResponse) => {
        return ({ 
          label: (
            <article>
              {person.profile_path 
                ? <img src={`https://image.tmdb.org/t/p/w45/${person.profile_path}`} alt={person.name}/>
                : <div className="dummy-img" />
              }
              {person.name} 
            </article>
          ), 
          name: person.name,
          value: person.id, 
        });
      }));
    } catch (err) {
      return ;
    }
    
  }

  function handleSelectPerson(selectedPeople: peopleData[]) {
    // Label is an html with the person's image, so to remove the image from this list and display only the person's 
    // name, I overwrite the label.
    if (selectedPeople) {
      selectedPeople.forEach(person => {
        person.label = person.name;
      });
    }
    setPeople(selectedPeople || []);
  }

  function handleRemovePerson(value: number) {
    setPeople(people.filter(person => person.value!==value));
  }

  return (
    <div id="container">
      <strong>Elenco / equipe</strong>
      <span>
        Adicione os seus atores, diretores, escritores, compositores, entre outros, favoritos.
      </span>
      <AsyncSelect
          isMulti
          controlShouldRenderValue={false}
          classNamePrefix="react-select"
          value={people}
          onChange={(selectedPeople) => handleSelectPerson(selectedPeople as peopleData[])}
          placeholder={'Pesquisar'}
          loadOptions={fetchPeople}
          isClearable={false}
          backspaceRemovesValue={false}
          loadingMessage={(inputValue) => ("Buscando...")}
          noOptionsMessage={({inputValue}) => {
            return (inputValue.length ? "Nenhum resultado encontrado para "+inputValue : "Nenhum resultado");
          }}
        />
        <ul className="selected-genres-list">
          {
            people.map(person => (
              <li key={person.value}>
                <span>
                  {person.label}
                </span>
                <MdClear 
                  onClick={() => handleRemovePerson(person.value)}
                  className="remove-genre-icon"
                />
              </li>
            ))
          }
        </ul>
    </div>
  );
}

export default People;