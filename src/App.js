import React from 'react';
import Draggable from 'react-draggable';
import './App.scss';
import Main from './components/Main';
import Demineur from './components/Demineur';
import computerIcon from './assets/computer.png';
import recycleIcon from './assets/recycle-bin.png';
import startIcon from './assets/start.png';
import folderIcon from './assets/folder.png';
import minesweeperIcon from './assets/minesweeper.png';

function App() {
  return (
    <div className="App">
      <div className="desktop">
        <div className="desktop-icons">
          <div className="desktop-icon">
            <img src={computerIcon} alt="My Computedr" />
            <span>My Computer</span>
          </div>
          <div className="desktop-icon">
            <img src={recycleIcon} alt="Recycle Bin" />
            <span>Recycle Bin</span>
          </div>
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
        handle=".demineur-title-bar"
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
            <span>Démineur</span>
          </div>
        </div>
        <div className="taskbar-right">
          <div className="taskbar-time">
            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;