import React, { useState, useEffect } from 'react';


const Thumbnail = ({ styleThumb, activeThumb, setActiveThumb, index, makeActive}) => {


  return (
    <div className="thumbnail">
      <img className="style-thumb" src={ styleThumb } onClick={ makeActive } data-index={index}></img>
    </div>
  );

};

export default Thumbnail;