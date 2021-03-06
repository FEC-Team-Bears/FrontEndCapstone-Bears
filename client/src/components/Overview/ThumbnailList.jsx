import React, { useState, useEffect } from 'react';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailList = ({stylesPhotos, currentThumbs = [0, 3], activeThumb, setActiveThumb, makeActive}) => {

  let styleThumb;

  return (
    <div id="thumbnailList">
      {stylesPhotos.map((stylePhoto, index) => {
        styleThumb = stylePhoto.thumbnail_url;
        if (index >= currentThumbs[0] && index <= currentThumbs[1]) {
          return (
            <Thumbnail styleThumb={ styleThumb } index={ index } key={ index } makeActive={ makeActive }/>
          );
        }
      })}
    </div>
  );

};

export default ThumbnailList;