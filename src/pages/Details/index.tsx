import React from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';

interface DetailsParams {
  id: string;
}

const Details: React.FC = () => {
  const { id } = useParams<DetailsParams>();
  return (
    <div>
      details from {id}
    </div>
  );
}

export default Details;