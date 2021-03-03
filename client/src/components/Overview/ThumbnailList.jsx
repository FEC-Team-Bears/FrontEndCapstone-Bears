import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Thumbnail from './Thumbnail.jsx';

const ThumbnailList = ({stylesPhotos}) => {

  console.log('STYLESPHOTOS: ', stylesPhotos);
  let styleThumb;

  const [thumbIndShowing, setThumbIndShowing] = useState([0, 3]);

  return (
    <div id="thumbnailList">
      {stylesPhotos.map((stylePhoto, index) => {
        styleThumb = stylePhoto.thumbnail_url;
        if (index >= thumbIndShowing[0] && index <= thumbIndShowing[1]) {
          return (
            <Thumbnail styleThumb={styleThumb} key={index} />
          );
        }
      })}
    </div>
  );

};

export default ThumbnailList;