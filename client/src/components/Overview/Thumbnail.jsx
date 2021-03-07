import React, { useState, useEffect } from 'react';


const Thumbnail = ({ styleThumb, activeThumb, setActiveThumb, index, makeActive}) => {

  return (
    <div className="thumbnail">
      <img className={index == activeThumb ? 'style-thumb activeThumb' : 'style-thumb'} src={ styleThumb } onClick={ makeActive } data-index={index}></img>
    </div>
  );

};

export default Thumbnail;