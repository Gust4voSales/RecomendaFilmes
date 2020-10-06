import React, { useEffect, useState } from 'react';
import { MdClear } from 'react-icons/md';
import AsyncSelect from 'react-select/async';
import tmdbAPI from '../../../services/api';
import { useFilter } from '../../../contexts/filtersContexts';
import './styles.scss';


interface peopleResponse {
  id: number;
  name: string;
  popularity: number;
  // profile_path: string | null;
}

interface peopleData {
  value: number;
  label: string;
}

const People: React.FC = () => {
  const { filter, changeFilter } = useFilter();
  const [people, setPeople] = useState<peopleData[]>([]);

  useEffect(() => {
    if (people.length) {
      let with_people: string = '';

      for (let person of people) {
        with_people += String(person.value) + ',';
      }
      
      changeFilter({ ...filter, with_people, });
    }
    // eslint-disable-next-line
  }, [people,]);

  async function fetchPeople(inputValue: string, callback: CallableFunction) {
    const { data } = await tmdbAPI.get(`/search/person`, {
      params: {
        query: inputValue,
        page: 1,
      }
    });

    let limitedSortedPeople = 
      data.results
        .sort((a: peopleResponse, b: peopleResponse) => (a.popularity > b.popularity ? -1 : 1))
        // .slice(0, );

    callback(limitedSortedPeople.map((person: peopleResponse) => {
      return ({ label: person.name, value: person.id, });
    }));
  }

  function handleSelectPerson(selectedPeople: peopleData[]) {
    setPeople(selectedPeople || []);
  }

  function handleRemovePerson(value: number) {
    setPeople(people.filter(person => person.value!==value));
  }

  return (
    <div id="container">
      <strong>Elenco / equipe</strong>
      <span>
        Adicione atores, diretores, etc, favoritos.
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
          loadingMessage={(inputValue) => ("Buscando...")}
          noOptionsMessage={({inputValue}) => {
            return (inputValue.length ? "Nenhum resultado encontrado para "+inputValue : "Nenhum resultado");
          }}
          cacheOptions
        />
        <ul className="selected-genres-list">
          {
            people.map(person => (
              <li 
                key={person.value}
              >
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