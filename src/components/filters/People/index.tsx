import React from 'react';


const People: React.FC = () => {
  return (
    <div id="container">
      <strong>Elenco / equipe</strong>
      <span>
        Adicione atores, diretores, etc, favoritos.
      </span>
      <input type="search" name="search-people" id="search-people"/>
    </div>
  );
}

export default People;