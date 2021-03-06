import React, { useState, useEffect } from 'react';
// import $ from 'jquery';
import jcarousel from 'jcarousel';
import sampleData from './sampleData';
import ThumbnailList from './ThumbnailList.jsx';


const PrimaryImage = ({styles}) => {

  // seperating the first image from the the rest of the images is necessary for carousel setup

  let photoArr = styles.results[0].photos;

  const [stylesPhotos, setStylesPhotos] = useState(photoArr);

  var mainCar;


  mainCar = $(function() {
    $('.connected-carousels').jcarousel({wrap: 'none'});
  });

  const scrollDown = (e) => {
    console.log('attempting to scrollDown');
    let prevTop = $('.thumb-scroller').css('top');
    prevTop = prevTop.split('').slice(0, -2).join('');
    console.log(prevTop);
    $('.thumb-scroller').css('top', `${prevTop - 80}px`);

  };

  useEffect(() => {
    console.log('MainCar being created');
    console.log('maincar:', mainCar);
  }, []);


  useEffect(() => {
    setStylesPhotos(photoArr);
    console.log('Component Mounting or changing');
  }, [styles]);

  return (
    // <ThumbnailList stylesPhotos={stylesPhotos}/>
    <div data-id="hello" className="wrapper jcarousel">
      {/* <button onClick={handleClick}>refresh</button> */}
      <div id="mainImage" className="connected-carousels">
        <div className="stage">
          <div className="carousel carousel-stage">
            <ul>
              {photoArr.map((imgObj, index) => {
                return (<li className="carousel-pic" key={index}>
                  <img src={imgObj.url} data-id="hello" alt="..."></img>
                </li>);
              })}
            </ul>
          </div>
          <a href="#" className="prev prev-stage"><span>&lsaquo;</span></a>
          <a href="#" className="next next-stage"><span>&rsaquo;</span></a>
        </div>
        <div className="navigation">
          <a href="#" className="prev prev-navigation">&#8679;</a>
          <a href="#" className="next next-navigation">&#8681;</a>
          <div className="carousel carousel-navigation">
            <ul className="thumb-scroller">
              {photoArr.map((imgObj, index) => {
                return (<li key={index}>
                  <img className="style-thumb" src={imgObj.thumbnail_url} alt="..."></img>
                </li>);
              })}
            </ul>
          </div>
        </div>
      </div>
      <button onClick={ scrollDown }>Lower</button>
    </div>
  );
};

export default PrimaryImage;