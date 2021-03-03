import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import sampleData from './sampleData';

// hi

const PrimaryImage = ({foculProduct, styles}) => {

  const [mainImage, setMainImage] = useState(foculProduct);
  let photoArr = styles.results[0].photos.slice(1);
  let firstPhoto = styles.results[0].photos[0];

  useEffect(() => {
    console.log('Log in Use Effect', styles);
    // $('#mainImage').css('background-image', `url(${foculProduct})`);
  }, [foculProduct, styles]);





  return (
    <div id="mainImage">
      <div>
        {/* thumbnail scroller goes here */}
      </div>
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
          <div className="carousel-item active">
            <img src={firstPhoto.url} className="d-block w-100 main-car" alt="..."></img>
          </div>
          {photoArr.map((imgObj, index) => {
            return (<div className="carousel-item" key={index}>
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