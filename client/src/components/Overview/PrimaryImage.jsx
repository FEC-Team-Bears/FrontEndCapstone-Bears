import React, { useState, useEffect } from 'react';
import sampleData from './sampleData';
import ThumbnailList from './ThumbnailList.jsx';


const PrimaryImage = ({ product }) => {


  // seperating the first image from the the rest of the images is necessary for carousel setup
  const [style, setStyle] = useState(0);
  let photoArr = product.results[style].photos;

  const [stylesPhotos, setStylesPhotos] = useState(photoArr);
  const [picCount, setPicCount] = useState(photoArr.length);
  const [currentPic, setCurrentPic] = useState(0);
  const [currentThumbs, setCurrentThumbs] = useState([0, 6]);
  const [activeThumb, setActiveThumb] = useState(0);
  const [imageExpanded, setImageExpanded] = useState(false);

  let newInd;

  useEffect(() => {
    setStylesPhotos(photoArr);
    setPicCount(photoArr.length);
    $('.carousel').carousel(0);
    setActiveThumb(0);
    setCurrentThumbs([0, 6]);
    setCurrentPic(0);
    $('.carousel-control-next').removeClass('hidden');
    $('.carousel-control-prev').removeClass('hidden');
    if (newInd === 0) {
      $('.carousel-control-prev').addClass('hidden');
    } else if (newInd === picCount - 1) {
      $('.carousel-control-next').addClass('hidden');
    }
    // cleanup func maybe an issue with switching product ID
    return () => {
      setActiveThumb(0);
      setCurrentThumbs([0, 6]);
      setCurrentPic(0);
    };
  }, [product]);

  useEffect(() => {
    setStylesPhotos(photoArr);
  }, [style]);

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
    $('.active-thumb').removeClass('active-thumb');
    $(e.target).addClass('active-thumb');
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

  const nextStyle = () => {
    setStyle(style + 1);
  };



  const nextClick = () => {
    $('.active-thumb').removeClass('active-thumb');
    $('img').find(`[data-index='${currentPic + 1}']`).addClass('active-thumb');
    picUpdate('next', picCount, Number(currentPic + 1));
  };

  const prevClick = () => {
    $('.active-thumb').removeClass('active-thumb');
    $('img').find(`[data-index='${currentPic - 1}']`).addClass('active-thumb');
    picUpdate('prev', picCount, Number(currentPic - 1));
  };

  const imageExpand = () => {
    console.log('in expand');
    if (imageExpanded) {
      $('.main-pic').removeClass('col-12').addClass('col-8');
      setImageExpanded(false);
      setTimeout(() => {
        $('.main-details').removeClass('hidden').addClass('col-4');
      }, 1000);
    } else {
      $('.main-pic').removeClass('col-8').addClass('col-12');
      $('.main-details').removeClass('col-4').addClass('hidden');
      setImageExpanded(true);
    }
  };



  return (
    <div id="main-image">
      {/* <button onClick={ nextStyle }>nextStyle</button> */}
      <p className="up-button thumbNav" onClick={ slideUp }>&#8963;</p>
      <p className="down-button thumbNav" onClick={ slideDown }>	&#8964;</p>
      <ThumbnailList stylesPhotos={ stylesPhotos } currentThumbs={ currentThumbs } makeActive={ makeActive } activeThumb={ activeThumb }/>
      <div id="carouselExampleIndicators" className="carousel slide" data-wrap="false" data-ride="false" data-interval="false">
        <div className="carousel-inner">
          {photoArr.map((imgObj, index) => {
            return (<div className={index === 0 ? 'carousel-item active' : 'carousel-item'} data-main-ind={ index } key={ index }>
              <img src={imgObj.url} className="d-block w-100 main-car img-fluid" alt="..." onClick={ imageExpand }></img>
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