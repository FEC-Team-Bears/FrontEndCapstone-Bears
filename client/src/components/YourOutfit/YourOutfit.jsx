import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import RelatedProductCard from '../RelatedProducts/RelatedProductCard.jsx';

const YourOutfit = ({ productId, reviews }) => {

  const [yourOutfit, addToYourOutfit] = useState({ [productId]: {} });

  const updateYourOutfit = () => {
    let oldOutfit = {};
    if (JSON.parse(localStorage.getItem('yourOutfit'))) {
      oldOutfit = JSON.parse(localStorage.getItem('yourOutfit'));
    }
    oldOutfit[productId] = { outfit: true };
    addToYourOutfit(oldOutfit);
    localStorage.setItem('yourOutfit', JSON.stringify(oldOutfit));
  };

  const outfitCarousel = $(function() {
    $('.jcarousel').jcarousel();
  });

  return (
    <div className="wrapper">
      <div className="jcarousel">
        <ul>
          <li className='outfit-card'><Button className="addToYourOutfit" onClick={ updateYourOutfit } >+</Button></li>
          {localStorage.getItem('yourOutfit') ? Object.keys(JSON.parse(localStorage.getItem('yourOutfit'))).map(yourOutfitId =>
            <li key={ yourOutfitId } className='outfit-card' >
              <RelatedProductCard relatedProductId={ yourOutfitId } reviews={ reviews } />
            </li>
          ) : null}
        </ul>
      </div>
      <a href="#" className="jcarousel-control-prev" data-jcarouselcontrol="true">‹</a>
      <a href="#" className="jcarousel-control-next" data-jcarouselcontrol="true">›</a>
    </div>
  );
};

export default YourOutfit;