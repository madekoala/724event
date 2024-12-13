/* eslint-disable import/no-unresolved */
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Trier les événements par date
  const events = useMemo(
    () => data?.focus?.slice().sort((a, b) => new Date(a.date) - new Date(b.date)) || [],
    [data]
  );

  useEffect(() => {
    if (!isPlaying || events.length === 0) {
      return undefined; 
    }

    const timeout = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < events.length - 1 ? prevIndex + 1 : 0));
    }, 5000);

    return () => clearTimeout(timeout); 
  }, [isPlaying, events, index]);

  if (events.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SlideCardList">
      {isPlaying ? (
        <FaPauseCircle
          className="icon"
          onClick={() => setIsPlaying(false)}
          aria-label="Pause slider"
        />
      ) : (
        <FaPlayCircle
          className="icon"
          onClick={() => setIsPlaying(true)}
          aria-label="Play slider"
        />
      )}
      <div>
        {events.map((event, idx) => (
          <div
            key={event.id || `event-${idx}`} 
            className={`${
              isPlaying ? "play-animation" : "pause-animation"
            } SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination" />
          {events.map((event, idx) => (
            <input
              key={event.id || `pagination-${idx}`} 
              type="radio"
              name="radio-button"
              checked={index === idx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
