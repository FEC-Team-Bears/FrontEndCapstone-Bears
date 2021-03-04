import React, { useState, useEffect } from 'react';
// import $ from 'jquery';
import jcarousel from 'jcarousel';
import sampleData from './sampleData';
import ThumbnailList from './ThumbnailList.jsx';


const PrimaryImage = ({foculProduct, styles}) => {

  // seperating the first image from the the rest of the images is necessary for carousel setup
  let photoArr = styles.results[0].photos;

  const [stylesPhotos, setStylesPhotos] = useState(photoArr);

  $(function() {
    $('.jcarousel').jcarousel();
  });

  useEffect(() => {
    // console.log('Log in Use Effect', styles);
    setStylesPhotos(photoArr);
  }, [foculProduct, styles, photoArr]);

  return (
    // <ThumbnailList stylesPhotos={stylesPhotos}/>
    <div className="wrapper">
      <div id="mainImage" className="connected-carousels">
        <div className="stage">
          <div className="carousel carousel-stage">
            <ul>
              {photoArr.map((imgObj, index) => {
                return (<li className="carousel-pic" key={index}>
                  <img src={imgObj.url} alt="..."></img>
                </li>);
              })}
            </ul>
          </div>
          <a href="#" className="prev prev-stage"><span>&lsaquo;</span></a>
          <a href="#" className="next next-stage"><span>&rsaquo;</span></a>
        </div>
        <div className="navigation">
            <a href="#" className="prev prev-navigation">&lsaquo;</a>
            <a href="#" className="next next-navigation">&rsaquo;</a>
            <div className="carousel carousel-navigation">
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryImage;