import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import RelatedProduct_card from './RelatedProducts/RelatedProductCard.jsx'
import YourOutfit from './YourOutfit/YourOutfit.jsx';

const App = (props) => {

  const [currentId, setCurrentId] = useState(21116);

  const setNewId = (e) => {
    setCurrentId(e.currentTarget.attributes[0].nodeValue);
  }

  return (
    <div>
      <RelatedProducts currentId={ currentId } handleClick={ setNewId } />
      <YourOutfit />
    </div>
  )
}

export default App;