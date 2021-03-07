import React, { useState, useEffect } from 'react';
import sampleData from './sampleData';
import ThumbnailList from './ThumbnailList.jsx';


const PrimaryImage = ({ foculProduct, styles }) => {


  // seperating the first image from the the rest of the images is necessary for carousel setup
  let photoArr = styles.results[0].photos;

  const [stylesPhotos, setStylesPhotos] = useState(photoArr);
  const [picCount, setPicCount] = useState(photoArr.length);
  const [currentThumbs, setCurrentThumbs] = useState([0, 3]);
  const [activeThumb, setActiveThumb] = useState(0);

  let newInd;

  useEffect(() => {
    setStylesPhotos(photoArr);
    newInd = 0;
    setPicCount(photoArr.length);
    setActiveThumb(0);
    setCurrentThumbs([0, 3]);
  }, [foculProduct, styles]);

  const slideUp = () => {
    if (currentThumbs[0] > 0) {
      setCurrentThumbs([currentThumbs[0] - 4, currentThumbs[1] - 4]);
    }
  };

  const slideDown = () => {
    if (currentThumbs[1] < picCount) {
      setCurrentThumbs([currentThumbs[0] + 4, currentThumbs[1] + 4]);
    }
  };

  const makeActive = (e) => {
    newInd = $(e.target).attr('data-index');
    $('.activeThumb').removeClass('activeThumb');
    $(e.target).addClass('activeThumb');
    setActiveThumb(newInd);
    $('.carousel').carousel(newInd - 0);
    // remember this is an async func
  };

  $('.carousel').on('slide.bs.carousel', (e) => {
    newInd = (e.to);
    $('img').find(`[data-index='${e.to - 0}']`).addClass('activeThumb');
    setActiveThumb(newInd);
    if (e.to > currentThumbs[1]) {
      slideDown();
    }
    if (e.to < currentThumbs[0]) {
      slideUp();
    }
    console.log('leak');
  });


  return (
    <div id="mainImage">
      <p className="upButton" onClick={ slideUp }>&#8963;</p>
      <ThumbnailList stylesPhotos={ stylesPhotos } currentThumbs={ currentThumbs } makeActive={ makeActive } activeThumb={ activeThumb }/>
      <p className="downButton" onClick={ slideDown }>	&#8964;</p>
      <div id="carouselExampleIndicators" className="carousel slide" data-wrap="false" data-ride="false">
        <div className="carousel-inner">
          {photoArr.map((imgObj, index) => {
            return (<div className={index === 0 ? 'carousel-item active' : 'carousel-item'} data-main-ind={ index } key={ index }>
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