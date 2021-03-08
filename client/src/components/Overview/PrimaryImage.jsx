import React, { useState, useEffect } from 'react';
import sampleData from './sampleData';
import ThumbnailList from './ThumbnailList.jsx';


const PrimaryImage = ({ foculProduct, styles }) => {


  // seperating the first image from the the rest of the images is necessary for carousel setup
  let photoArr = styles.results[0].photos;

  const [stylesPhotos, setStylesPhotos] = useState(photoArr);
  const [picCount, setPicCount] = useState(photoArr.length);
  const [currentPic, setCurrentPic] = useState(0);
  const [currentThumbs, setCurrentThumbs] = useState([0, 6]);
  const [activeThumb, setActiveThumb] = useState(0);

  let newInd;

  useEffect(() => {
    setStylesPhotos(photoArr);
    setPicCount(photoArr.length);
    // setActiveThumb(0);
    // setCurrentThumbs([0, 3]);
    // setCurrentPic(0);
    // $('.carousel').carousel(0);
    $('.carousel-control-next').removeClass('hidden');
    $('.carousel-control-prev').removeClass('hidden');
    if (newInd === 0) {
      $('.carousel-control-prev').addClass('hidden');
    } else if (newInd === picCount - 1) {
      $('.carousel-control-next').addClass('hidden');
    }
  }, [foculProduct, styles]);

  const slideUp = () => {
    if (currentThumbs[0] > 0) {
      setCurrentThumbs([currentThumbs[0] - 7, currentThumbs[1] - 7]);
    }
  };

  const slideDown = () => {
    if (currentThumbs[1] < picCount) {
      setCurrentThumbs([currentThumbs[0] + 7, currentThumbs[1] + 7]);
    }
  };

  const makeActive = (e) => {
    newInd = Number($(e.target).attr('data-index'));
    $('.activeThumb').removeClass('activeThumb');
    $(e.target).addClass('activeThumb');
    setActiveThumb(newInd);
    setCurrentPic(newInd);
    $('.carousel').carousel(newInd);
    $('.carousel-control-next').removeClass('hidden');
    $('.carousel-control-prev').removeClass('hidden');
    if (newInd === 0) {
      $('.carousel-control-prev').addClass('hidden');
    } else if (newInd === picCount - 1) {
      $('.carousel-control-next').addClass('hidden');
    }
  };

  const picUpdate = (button, totalPics, index) => {
    if (button === 'next') {
      if (index === totalPics - 1) {
        $('.carousel-control-next').addClass('hidden');
      }
      $('.carousel-control-prev').removeClass('hidden');
      if (index > currentThumbs[1]) {
        slideDown();
      }
    }
    if (button === 'prev') {
      if (index === 0) {
        $('.carousel-control-prev').addClass('hidden');
      }
      $('.carousel-control-next').removeClass('hidden');
      if (index < currentThumbs[0]) {
        slideUp();
      }
    }
    setActiveThumb(index);
    setCurrentPic(index);
  };



  const nextClick = () => {
    $('.activeThumb').removeClass('activeThumb');
    $('img').find(`[data-index='${currentPic + 1}']`).addClass('activeThumb');
    picUpdate('next', picCount, Number(currentPic + 1));
    console.log('currentpic is getting set to ', Number(currentPic + 1));
  };

  const prevClick = () => {
    $('.activeThumb').removeClass('activeThumb');
    $('img').find(`[data-index='${currentPic - 1}']`).addClass('activeThumb');
    picUpdate('prev', picCount, Number(currentPic - 1));
    console.log('currentpic is getting set to ', Number(currentPic - 1));
  };



  return (
    <div id="mainImage">
      <p className="upButton" onClick={ slideUp }>&#8963;</p>
      <ThumbnailList stylesPhotos={ stylesPhotos } currentThumbs={ currentThumbs } makeActive={ makeActive } activeThumb={ activeThumb }/>
      <p className="downButton" onClick={ slideDown }>	&#8964;</p>
      <div id="carouselExampleIndicators" className="carousel slide" data-wrap="false" data-ride="false" data-interval="false">
        <div className="carousel-inner">
          {photoArr.map((imgObj, index) => {
            return (<div className={index === 0 ? 'carousel-item active' : 'carousel-item'} data-main-ind={ index } key={ index }>
              <img src={imgObj.url} className="d-block w-100 main-car img-fluid" alt="..."></img>
            </div>);
          })}
        </div>
        <a className="carousel-control-prev hidden" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={ prevClick }>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={ nextClick }>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default PrimaryImage;