import React, { useState, useEffect } from 'react';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailList = ({stylesPhotos, currentThumbs, activeThumb, setActiveThumb, makeActive}) => {

  let styleThumb;

  return (
    <div id="thumbnail-list">
      {stylesPhotos.map((stylePhoto, index) => {
        styleThumb = stylePhoto.thumbnail_url;
        if (index >= currentThumbs[0] && index <= currentThumbs[1]) {
          return (
            <Thumbnail styleThumb={ styleThumb } index={ index } key={ index } makeActive={ makeActive } activeThumb={ activeThumb }/>
          );
        }
      })}
    </div>
  );

};

export default ThumbnailList;