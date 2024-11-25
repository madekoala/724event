import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const byDateDesc = useMemo(() => {
    if (!data?.focus) return [];
    return data.focus
      .slice()
      .sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date));
  }, [data]);

  useEffect(() => {
    if (!isPlaying || byDateDesc.length === 0) {
      return undefined; 
    }

    const timeout = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timeout); 
  }, [isPlaying, byDateDesc, index]);

  if (!data?.focus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SlideCardList">
      {isPlaying ? (
        <FaPauseCircle
          className="icon"
          onClick={() => setIsPlaying(false)}
          aria-label="Pause slider"
          role="button"
          tabIndex="0"
        />
      ) : (
        <FaPlayCircle
          className="icon"
          onClick={() => setIsPlaying(true)}
          aria-label="Play slider"
          role="button"
          tabIndex="0"
        />
      )}
      <div>
        {byDateDesc.map((event, idx) => (
          <div
            key={event.id}
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
          {byDateDesc.map((event) => (
            <input
              key={event.id} // Correction : Utilise `event.id` comme clé unique
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              onChange={() => setIndex(byDateDesc.indexOf(event))} // Permettre un clic pour changer d'index
              aria-label={`Slide ${byDateDesc.indexOf(event) + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
