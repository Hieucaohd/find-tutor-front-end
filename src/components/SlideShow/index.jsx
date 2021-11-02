import React, { useEffect } from 'react';
import "./styles.scss";

function SlideShow({imageList}) {
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);
    const delay = 4000;
    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
    
        return () => {
          resetTimeout();
        };
      }, [index, imageList.length]);

    

    return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {imageList.map((src, index) => (
          <div
            className="slide"
            key={index}
          >
              <img src={src} alt="banner" style={{width: "100%"}}/>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {imageList.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
    );
}

export default SlideShow;