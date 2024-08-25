import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './App.scss';
import Main from './components/Main';
import Demineur from './components/Minesweeper';
import computerIcon from './assets/computer.png';
import recycleIcon from './assets/recycle-bin.png';
import startIcon from './assets/start.png';
import folderIcon from './assets/folder.png';
import minesweeperIcon from './assets/minesweeper.png';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setIsBlinking(prev => !prev);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return (
      <>
        {hours}<span className={isBlinking ? 'blink' : ''}>:</span>{minutes}
      </>
    );
  };

  return (
    <div className="App">
      <div className="desktop">
        <div className="desktop-icons">
          <Draggable bounds="parent">
            <div className="desktop-icon">
              <img src={computerIcon} alt="My Computer" />
              <span>My Computer</span>
            </div>
          </Draggable>
          <Draggable bounds="parent">
            <div className="desktop-icon">
              <img src={recycleIcon} alt="Recycle Bin" />
              <span>Recycle Bin</span>
            </div>
          </Draggable>
        </div>
      </div>

      <Draggable
        handle=".title-bar"
        defaultPosition={{x: 200, y: 40}}
        bounds="parent"
      >
        <div className="draggable-window">
          <Main />
        </div>
      </Draggable>
      
      <Draggable
        handle=".minesweeper-title-bar"
        defaultPosition={{ x: 850, y: 350 }}
        bounds="parent"
      >
        <div className="draggable-window">
          <Demineur />
        </div>
      </Draggable>
      
      <div className="taskbar win95">
        <button className="start-button">
          <img src={startIcon} alt="Start" />
          Start
        </button>
        <div className="taskbar-divider"></div>
        <div className="taskbar-items">
          <div className="taskbar-item active">
            <img src={folderIcon} alt="Folders" />
            <span>Folders</span>
          </div>
          <div className="taskbar-item">
            <img src={minesweeperIcon} alt="Minesweeper" />
            <span>Minesweeper</span>
          </div>
        </div>
        <div className="taskbar-right">
          <div className="taskbar-time">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;