import React, { useEffect, useState } from 'react';
import './myComponent.css';
import {
  FaCircleArrowLeft,
  FaCircleArrowRight,
  FaCircle,
  FaLessThanEqual,
} from 'react-icons/fa6';

function MyComponent({ url, page = 1, limit = 5 }) {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [IsError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrev = () => {
    setCurrentImage(currentImage == 0 ? images.length - 1 : currentImage - 1);
  };
  const handleNext = () => {
    setCurrentImage(currentImage == images.length - 1 ? 0 : currentImage + 1);
  };
  const handleCircleClick = (index) => {
    setCurrentImage(index);
  };

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}?limit=${limit}&page${page}`);
      const data = await response.json();
      console.log(data);
      setImages(data);
      setIsLoading(false);
      /*  console.log(data); */
    } catch (e) {
      setIsError(e.message);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [url]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (IsError) {
    return <div>{IsError}</div>;
  }
  if (images)
    return (
      <div className="wrapper">
        {images.map((item, index) => {
          return (
            <img
              className={index == currentImage ? 'show ' : 'hide'}
              src={item.download_url}
              alt={item.download_url}
              key={index}
            />
          );
        })}

        <FaCircleArrowLeft
          onClick={handlePrev}
          className="left btn"
        />
        <FaCircleArrowRight
          onClick={handleNext}
          className="right btn "
        />

        <div className="circles-container">
          {[...Array(10)].map((_, index) => {
            return (
              <FaCircle
                size={'13'}
                className={index == currentImage ? 'active circle' : 'circle'}
                key={index}
                onClick={() => {
                  handleCircleClick(index);
                }}
              />
            );
          })}
        </div>
      </div>
    );
}

export default MyComponent;
