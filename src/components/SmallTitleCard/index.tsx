import React from 'react';
import { Link } from 'react-router-dom';
import { baseImgURL } from '../../services/api';
import './styles.scss';

interface TitleProps {
  data: {
    title: string;
    name: string;
    id: number;
    poster_path: string | null;
  }
}

const SmallTitleCard: React.FC<TitleProps> = ({ data }) => {
  return (
    <Link to={data.name ? `/serie/${data.id}` : `/filme/${data.id}`}>
      <div className="small-title-container" style={data.poster_path ? {} : { backgroundColor: 'rgb(34, 34, 34)', }}>
        <img 
          src={`${baseImgURL}w185${data.poster_path}`} 
          alt={data.title || data.name}
          // className="poster-img"  
        />
    </div>
      </Link>   
  );
}

export default SmallTitleCard;