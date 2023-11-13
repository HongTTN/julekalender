import React, { useEffect, useState } from "react";
import "./App.css";
import doors from "./json/doors.json";
import VideoModal from "./VideoModal";
import ReactCardFlip from "react-card-flip";
import ErrorModal from "./ErrorModal";

function App() {
  const [isOpen, setIsOpen] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState();
  const [flipped, setIsFlipped] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoIsOpen, setVideoIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const convertDateToDay = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();

    return day;
  };

  const checkIfAllowedToOpen = (inputDate, videoUrl = null) => {
    const doorDate = new Date(inputDate);
    const today = new Date();
    const doorDay = convertDateToDay(inputDate);

    if (today >= doorDate) {
      openDoor(doorDay, videoUrl);
    } else {
      openModal();
    }
  };

  const openDoor = (doorDay, videoUrl = null) => {
    setSelectedVideo(videoUrl);
    if (!isOpen.includes(doorDay)) {
      setIsOpen((prevOpen) => [...prevOpen, doorDay]);
      localStorage.setItem("isOpen", JSON.stringify([...isOpen, doorDay]));
    }
    handleFlip(doorDay);
  };

  const resetDoors = () => {
    setIsOpen([]);
    localStorage.removeItem("isOpen");
    setSelectedVideo(null);
    setIsFlipped({});
  };

  useEffect(() => {
    const local = localStorage.getItem("isOpen");
    const isOpenArray = local ? JSON.parse(local) : [];

    setIsOpen(isOpenArray);

    const flippedState = {};
    isOpenArray.forEach((doorDay) => {
      flippedState[doorDay] = true;
    });

    setIsFlipped(flippedState);
  }, []);

  const handleFlip = (doorId) => {
    setIsFlipped((prevIsFlipped) => ({
      ...prevIsFlipped,
      [doorId]: !prevIsFlipped[doorId],
    }));
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Julekalender 2023</h1>
        <div className="calendar">
          {doors.map((door, i) => {
            return (
              <div key={i}>
                <ReactCardFlip
                  flipDirection="vertical"
                  isFlipped={flipped[convertDateToDay(door.day)]}
                >
                  <div
                    className="card"
                    onClick={() => {
                      checkIfAllowedToOpen(door.day, door.youtubeId);
                    }}
                  >
                    <p className="door-number">{convertDateToDay(door.day)}</p>
                  </div>
                  <div className="card card-back">
                    <p>{door.message}</p>
                    <p>{door.joke}</p>
                    {door.youtubeId && (
                      <span
                        className="link-button"
                        onClick={() => {
                          setSelectedVideo(door.youtubeId);
                          setVideoIsOpen(true);
                        }}
                      >
                        Julehilsen
                      </span>
                    )}
                  </div>
                </ReactCardFlip>
              </div>
            );
          })}
          <button className="resetbutton" onClick={resetDoors}>
            Lukk alle lukene
          </button>
          {modalIsOpen && (
            <ErrorModal
              title="Please be patient!"
              message="You're not allowed to open yet, kindly wait a few more days."
              closeModal={closeModal}
            />
          )}
          {selectedVideo && videoIsOpen && (
            <VideoModal
              youtubeId={selectedVideo}
              onClose={() => {
                setVideoIsOpen(false);
                setSelectedVideo(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
