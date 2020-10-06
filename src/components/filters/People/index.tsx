import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import tmdbAPI from '../../../services/api';
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
  const [people, setPeople] = useState<peopleData[]>([]);

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
        .slice(0, 6);

    callback(limitedSortedPeople.map((person: peopleResponse) => {
      return ({ label: person.name, value: person.id, });
    }));
  }

  function handleSelectPerson(selectedPeople: peopleData[]) {
    setPeople(selectedPeople || []);
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
      
    </div>
  );
}

export default People;