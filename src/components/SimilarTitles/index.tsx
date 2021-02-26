import React from 'react';
import { SimilarTitlesData } from '../../pages/Details';
import Slider from "react-slick";
import SmallTitleCard from '../SmallTitleCard';
import './styles.scss';

const SimilarTitles: React.FC<SimilarTitlesData> = ({ similar: similarTitles }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    slide: 'a',
    swipe: false,
    responsive: [
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          swipe: true,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          swipe: true,
          arrows: false,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          swipe: true,
          arrows: false,
          swipeToSlide: true,
        }
      },
    ]
  };

  return (
    <section className="similar-container">
      <Slider {...settings}>
        {
          similarTitles.results.map(title => (
            <SmallTitleCard data={title} key={title.id}/>
          ))
        }
      </Slider>
      {
        similarTitles.results.length===0 
        ? <span style={{marginLeft: '1.5rem'}}>Nenhum título similar cadastrado</span>
        : null
      } 
    </section>  
  );
}

export default SimilarTitles;