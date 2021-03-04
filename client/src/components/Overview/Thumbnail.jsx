import React, { useState, useEffect } from 'react';
import $ from 'jquery';


const Thumbnail = ({styleThumb}) => {
  // console.log('STYLETHUMB IN THUMBNAIL: ', styleThumb);
  return (
    <div className="thumbnail">
      <img className="style-thumb" src={styleThumb}></img>
    </div>
  );

};

export default Thumbnail;