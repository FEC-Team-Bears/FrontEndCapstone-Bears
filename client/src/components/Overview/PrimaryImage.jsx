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
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={firstPhoto.url} key={-1} class="d-block w-100 main-car" alt="..."></img>
          </div>
          {photoArr.map((imgObj, index) => {
            console.log('LOG IN MAP: ', imgObj.url);
            return (<div class="carousel-item">
              <img src={imgObj.url} key={index} class="d-block w-100 main-car img-fluid" alt="..."></img>
            </div>);
          })}
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default PrimaryImage;