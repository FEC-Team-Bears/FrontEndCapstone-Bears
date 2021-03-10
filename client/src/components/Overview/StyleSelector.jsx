import React, {useState, useEffect} from 'react';


const StyleSelector = ({ styles, getStyles }) => {
  console.log(styles);
  return (
    <div>
      <h3 className="style-title">
      Style &#8250; {styles[0] ? styles[0].name : 'none'}
      </h3>
      <table>
        <tbody>
          <tr>
            {styles.slice(0, 4).map((style, index) => {
              return (<td key={index}> <img className="styles-thumb" data-style-num={index} src={style.photos[0].thumbnail_url}></img></td>);
            })}
          </tr>
          <tr>
            {styles.slice(4, 8).map((style, index) => {
              return (<td key={index}><img className="styles-thumb" data-style-num={index} src={style.photos[0].thumbnail_url}></img></td>);
            })}
          </tr>
          <tr>
            {styles.slice(8, 12).map((style, index) => {
              return (<td key={index}><img className="styles-thumb" data-style-num={index} src={style.photos[0].thumbnail_url}></img></td>);
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StyleSelector;

// styles[somestylenum].photos[0].thumbnail_url