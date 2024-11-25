import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [Play, setPlay] = useState(true);

  const byDateDesc = useMemo(
    () =>
      data?.focus
        ?.slice()
        .sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)),
    [data]
  );

  useEffect(() => {
    if (Play) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) =>
          prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
        );
      }, 5000);

      return () => clearTimeout(timeout); // Fonction de nettoyage
    }
    // Ajout d'un return explicite pour respecter `consistent-return`
    return undefined;
  }, [Play, byDateDesc, index]);

  if (!data?.focus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SlideCardList">
      {Play ? (
        <FaPauseCircle
          className="icon"
          onClick={() => setPlay(false)}
          aria-label="Pause slider"
        />
      ) : (
        <FaPlayCircle
          className="icon"
          onClick={() => setPlay(true)}
          aria-label="Play slider"
        />
      )}
      <div>
        {byDateDesc.map((event, idx) => (
          <div
            key={event.id}
            className={`${
              Play ? "play-animation" : "pause-animation"
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
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
