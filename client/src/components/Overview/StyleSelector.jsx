import React, {useState, useEffect} from 'react';


const StyleSelector = ({ styles, setStyle }) => {

  const [styleThumb, setStyleThumb] = useState(0);

  const handleStyleClick = (e) => {
    // console.log(e.target);
    // console.log($(e.target).attr('data-style-num'));
    // send style up to parent
    setStyle(Number($(e.target).attr('data-style-num')));
    setStyleThumb(Number($(e.target).attr('data-style-num')));
    // indicate that a certain style is currently selected
    // overview needs this style info
    // console.log('current styles:', styles);
  };

  useEffect(() => {
    setStyleThumb(0);
  }, [styles]);

  return (
    <div>
      <h3 className="style-title">
      Style &#8250; {styles[styleThumb] ? styles[styleThumb].name : 'none'}
      </h3>
      <table>
        <tbody>
          <tr>
            {styles.slice(0, 4).map((style, index) => {
              return (
                <td key={index}>
                  <div className="img-cont">
                    <span className={index === styleThumb ? 'badge style-tnail bg-success' : 'badge style-tnail bg-success hidden'}>&#10003;</span>
                    <img
                      onClick={ handleStyleClick }
                      className="styles-thumb"
                      data-style-num={index}
                      src={style.photos[0].thumbnail_url}></img>
                  </div>
                </td>);
            })}
          </tr>
          <tr>
            {styles.slice(4, 8).map((style, index) => {
              return (
                <td key={index}>
                  <div className="img-cont">
                    <span className={index + 4 === styleThumb ? 'badge style-tnail bg-success' : 'badge style-tnail bg-success hidden'}>&#10003;</span>
                    <img
                      onClick={ handleStyleClick }
                      className="styles-thumb"
                      data-style-num={index + 4}
                      src={style.photos[0].thumbnail_url}>
                    </img>
                  </div>
                </td>);
            })}
          </tr>
          <tr>
            {styles.slice(8, 12).map((style, index) => {
              return (
                <td key={index}>
                  <div className="img-cont">
                    <span className={index + 8 === styleThumb ? 'badge style-tnail bg-success' : 'badge style-tnail bg-success hidden'}>&#10003;</span>
                    <img
                      onClick={ handleStyleClick }
                      className="styles-thumb"
                      data-style-num={index + 8}
                      src={style.photos[0].thumbnail_url}>
                    </img>
                  </div>
                </td>);
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StyleSelector;

// styles[somestylenum].photos[0].thumbnail_url