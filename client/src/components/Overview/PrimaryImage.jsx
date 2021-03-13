import React, { useState, useEffect } from 'react';
import ThumbnailList from './ThumbnailList.jsx';


const PrimaryImage = ({ product, style }) => {


  let photoArr = product;

  const [stylesPhotos, setStylesPhotos] = useState(photoArr);
  const [picCount, setPicCount] = useState(photoArr.length);
  const [currentPic, setCurrentPic] = useState(0);
  const [currentThumbs, setCurrentThumbs] = useState([0, 6]);
  const [activeThumb, setActiveThumb] = useState(0);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  let newInd, timerId;



  useEffect(() => {
    setStylesPhotos(photoArr);
    setPicCount(photoArr.length);
    $('.carousel').carousel(0);
    updatePicIndex(0);
    setCurrentThumbs([0, 6]);
    $('.carousel-control-next').removeClass('hidden');
    $('.carousel-control-prev').removeClass('hidden');
    if (newInd === 0) {
      $('.carousel-control-prev').addClass('hidden');
    } else if (newInd === picCount - 1) {
      $('.carousel-control-next').addClass('hidden');
    }

    return () => {
      updatePicIndex(0);
      setCurrentThumbs([0, 6]);
    };
  }, [product]);

  useEffect(() => {
    setStylesPhotos(photoArr);
  }, [style]);

  const slideThumbsUp = () => {
    if (currentThumbs[0] > 0) {
      setCurrentThumbs([currentThumbs[0] - 7, currentThumbs[1] - 7]);
    }
  };

  const slideThumbsDown = () => {
    if (currentThumbs[1] < picCount) {
      setCurrentThumbs([currentThumbs[0] + 7, currentThumbs[1] + 7]);
    }
  };

  const makeActive = (e) => {
    newInd = Number($(e.target).attr('data-index'));
    $('.active-thumb').removeClass('active-thumb');
    $(e.target).addClass('active-thumb');
    updatePicIndex(newInd);
    $('.carousel').carousel(newInd);
    toggleHiddenFromChevrons();
    if (newInd === 0) {
      $('.carousel-control-prev').addClass('hidden');
    } else if (newInd === picCount - 1) {
      $('.carousel-control-next').addClass('hidden');
    }
  };


  const selectThumbFromIndicator = (e) => {
    let slidToInd = Number(e.target.attributes[1].value);
    updatePicIndex(slidToInd);
    toggleHiddenFromChevrons();
    if (slidToInd === picCount - 1) {
      $('.carousel-control-next').addClass('hidden');
    }
    if (slidToInd === 0) {
      $('.carousel-control-prev').addClass('hidden');
    }
  };

  const updatePicIndex = ( index ) => {
    setActiveThumb(index);
    setCurrentPic(index);
  };

  const toggleHiddenFromChevrons = (addOrRemove) => {
    if (addOrRemove === 'add') {
      $('.carousel-control-prev').addClass('hidden');
      $('.carousel-control-next').addClass('hidden');
    } else {
      $('.carousel-control-prev').removeClass('hidden');
      $('.carousel-control-next').removeClass('hidden');
    }
  };

  const picUpdate = (button, totalPics, index) => {
    if (button === 'next') {
      if (index === totalPics - 1) {
        $('.carousel-control-next').addClass('hidden');
      }
      $('.carousel-control-prev').removeClass('hidden');
      if (index > currentThumbs[1]) {
        slideThumbsDown();
      }
    }
    if (button === 'prev') {
      if (index === 0) {
        $('.carousel-control-prev').addClass('hidden');
      }
      $('.carousel-control-next').removeClass('hidden');
      if (index < currentThumbs[0]) {
        slideThumbsUp();
      }
    }
    updatePicIndex(index);
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

  const throttledFunc = (func, delay) => {
    if (timerId) {
      return;
    }

    timerId = setTimeout(() => {
      func();
      timerId = undefined;
    }, delay);
  };

  const throttledNextClick = () => {
    throttledFunc(nextClick, 600);
  };
  const throttledPrevClick = () => {
    throttledFunc(prevClick, 600);
  };

  const imageExpand = (e) => {
    if (!imageExpanded) {
      $('#thumbnail-list').addClass('hidden');
      $('.up-button').addClass('hidden');
      $('.down-button').addClass('hidden');
      $('.main-pic').removeClass('col-8').addClass('col-12');
      $('.main-details').removeClass('col-4').addClass('hidden');
      $('.carousel-item img').css('cursor', 'cell');
      setImageExpanded(true);
    } else {
      if (!imageZoomed) {
        let scrollToY = ((((e.clientY - 50) / 700) * 1000) - 500) * -1;
        let scrollToX = ((((e.clientX - 400) / 1100) * 1400) - 600) * -1;
        setImageZoomed(true);
        $('.carousel-item img').css('cursor', 'zoom-out');
        $('.carousel-item img').css({transform: `translate(${scrollToX}px, ${scrollToY}px) scale(2.5)`});
        $('.minimize').addClass('hidden');
        toggleHiddenFromChevrons('add');
      } else {
        setImageZoomed(false);
        if (currentPic !== 0) {
          $('.carousel-control-prev').removeClass('hidden');
        }
        if (currentPic !== picCount - 1) {
          $('.carousel-control-next').removeClass('hidden');
        }
        $('.minimize').removeClass('hidden');
        $('.carousel-item img').css('cursor', 'cell');
        $('.carousel-item img').css({transform: 'translate(0, 0) scale(1)'});
      }
    }
  };

  const imageShrink = () => {
    if (imageExpanded) {
      $('#thumbnail-list').removeClass('hidden');
      $('.up-button').removeClass('hidden');
      $('.down-button').removeClass('hidden');
      $('.main-pic').removeClass('col-12').addClass('col-8');
      $('.carousel-item img').css('cursor', 'zoom-in');
      setImageExpanded(false);
      setImageZoomed(false);
      setTimeout(() => {
        $('.main-details').removeClass('hidden').addClass('col-4');
      }, 1000);
    }
  };

  return (
    <div id="main-image">
      <p className="up-button thumbNav" onClick={ slideThumbsUp }>&#9650;</p>
      <p className="down-button thumbNav" onClick={ slideThumbsDown }>&#9660;</p>
      <ThumbnailList
        stylesPhotos={ stylesPhotos }
        currentThumbs={ currentThumbs }
        makeActive={ makeActive }
        activeThumb={ activeThumb }/>
      <span onClick={ imageShrink } className={imageExpanded ? 'minimize' : 'hidden minimize'}>[default view]</span>
      <div id="carouselExampleIndicators" className="carousel slide" data-wrap="false" data-ride="false" data-interval="false">
        <ol className="carousel-indicators">
          {photoArr.map((photo, index) => {
            return (<li
              data-target="#carouselExampleIndicators"
              onClick={ selectThumbFromIndicator }
              data-slide-to={ index }
              key={ index }
              className={!imageExpanded ? 'hidden'
                : imageZoomed ? 'hidden'
                  : index === currentPic ? 'active'
                    : ''}>

            </li>);
          })}
        </ol>
        <div className="carousel-inner">
          {photoArr.map((imgObj, index) => {
            return (
              <div
                className={index === 0 ? 'carousel-item active' : 'carousel-item'} data-main-ind={ index }
                key={ index }>
                <img src={ imgObj.url }
                  className="d-block w-100 main-car img-fluid"
                  alt="..."
                  onClick={ imageExpand } >
                </img>
              </div>);
          })}
        </div>
        <a
          className="carousel-control-prev hidden"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
          onClick={ throttledPrevClick }>
          <span className={ currentPic > 0 ? 'carousel-control-prev-icon' : 'carousel-control-prev-icon hidden'} aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={ throttledNextClick }>
          <span className={ currentPic < picCount - 1 ? 'carousel-control-next-icon' : 'carousel-control-next-icon hidden'} aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default PrimaryImage;