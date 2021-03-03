import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import sampleData from './sampleData';
import ThumbnailList from './ThumbnailList.jsx';


const PrimaryImage = ({foculProduct, styles}) => {


  // seperating the first image from the the rest of the images is necessary for carousel setup
  let photoArr = styles.results[0].photos;

  const [stylesPhotos, setStylesPhotos] = useState(photoArr);

  useEffect(() => {
    console.log('Log in Use Effect', styles);
    setStylesPhotos(photoArr);
  }, [foculProduct, styles, photoArr]);


  return (
    <div id="mainImage">
      <ThumbnailList stylesPhotos={stylesPhotos}/>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          {photoArr.map((imgObj, index) => {
            return (
              <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index + 1}></li>
            );
          })}
        </ol>
        <div className="carousel-inner">
          {photoArr.map((imgObj, index) => {
            return (<div className={index === 0 ? 'carousel-item active' : 'carousel-item'} key={index}>
              <img src={imgObj.url} className="d-block w-100 main-car img-fluid" alt="..."></img>
            </div>);
          })}
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default PrimaryImage;