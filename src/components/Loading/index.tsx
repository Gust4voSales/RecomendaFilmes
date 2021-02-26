import React from 'react';
import './styles.scss';

const Loading: React.FC = () => {
  // LOADING by: https://codepen.io/WebSonata/pen/bRaONB
  return (
    <div style={{marginTop: '2rem'}}>
      <div id="loader"></div>
    </div>
  );
}

export default Loading;