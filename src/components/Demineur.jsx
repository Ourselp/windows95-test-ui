import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faWindowMaximize, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/demineur.scss';

const Demineur = () => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [mineCount, setMineCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [gameOverCell, setGameOverCell] = useState(null);
  const [hasWon, setHasWon] = useState(false);
  const [flaggedCells, setFlaggedCells] = useState(0);
  const timerRef = useRef(null);

  const initializeGrid = () => {
    const newGrid = [];
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        row.push({
          isMine: Math.random() < 0.15, // 15% de chance d'être une mine
          isRevealed: false,
          neighborMines: 0,
          isFlagged: false
        });
      }
      newGrid.push(row);
    }

    // Calcul du nombre de mines voisines
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (!newGrid[i][j].isMine) {
          let count = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;
              if (ni >= 0 && ni < 8 && nj >= 0 && nj < 8 && newGrid[ni][nj].isMine) {
                count++;
              }
            }
          }
          newGrid[i][j].neighborMines = count;
        }
      }
    }

    // Calculer le nombre total de mines
    const totalMines = newGrid.flat().filter(cell => cell.isMine).length;
    setMineCount(totalMines);

    setGrid(newGrid);
    setGameOver(false);
    setGameOverCell(null);
    setHasWon(false);
    setTime(0);
    setFlaggedCells(0);
    // Arrêter le timer existant s'il y en a un
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // Démarrer un nouveau timer
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    initializeGrid();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const checkWinCondition = (grid) => {
    const allNonMinesRevealed = grid.every(row =>
      row.every(cell => cell.isRevealed || cell.isMine)
    );
    if (allNonMinesRevealed) {
      setHasWon(true);
      setGameOver(true);
      // Arrêter le timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Révéler toutes les mines avec des drapeaux
      const newGrid = grid.map(row =>
        row.map(cell => cell.isMine ? { ...cell, isRevealed: true, isFlagged: true } : cell)
      );
      setGrid(newGrid);
    }
  };

  const handleCellClick = (row, col) => {
    if (gameOver || grid[row][col].isRevealed || grid[row][col].isFlagged) return;

    const newGrid = [...grid];
    if (newGrid[row][col].isMine) {
      setGameOver(true);
      setGameOverCell({ row, col });
      // Révéler toutes les mines
      newGrid.forEach(row => row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true;
      }));
    } else {
      revealCell(newGrid, row, col);
      checkWinCondition(newGrid);
    }
    setGrid(newGrid);
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    if (gameOver || grid[row][col].isRevealed) return;

    const newGrid = [...grid];
    const cell = newGrid[row][col];

    if (cell.isFlagged) {
      cell.isFlagged = false;
      setFlaggedCells(prev => prev - 1);
    } else if (flaggedCells < mineCount) {
      cell.isFlagged = true;
      setFlaggedCells(prev => prev + 1);
    }

    setGrid(newGrid);
  };

  const revealCell = (grid, row, col) => {
    if (row < 0 || row >= 8 || col < 0 || col >= 8 || grid[row][col].isRevealed) return;
    
    grid[row][col].isRevealed = true;
    
    if (grid[row][col].neighborMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          revealCell(grid, row + i, col + j);
        }
      }
    }
  };

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  return (
    <div className="window demineur-window">
      <div className="demineur-title-bar">
        <div className="title-bar-text">Démineur</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"><FontAwesomeIcon icon={faWindowMinimize} /></button>
          <button aria-label="Maximize"><FontAwesomeIcon icon={faWindowMaximize} /></button>
          <button aria-label="Close"><FontAwesomeIcon icon={faTimes} /></button>
        </div>
      </div>
      <div className="window-body">
        <div className="demineur-header">
          <div className="mine-counter retro-display">{(mineCount - flaggedCells).toString().padStart(3, '0')}</div>
          <button 
            className={`smiley ${gameOver ? (hasWon ? 'won' : 'dead') : isClicking ? 'oh' : ''}`}
            onClick={initializeGrid}
          >
            {gameOver ? (hasWon ? '😎' : '😵') : isClicking ? '😮' : '🙂'}
          </button>
          <div className="timer retro-display">{time.toString().padStart(3, '0')}</div>
        </div>
        <div className="demineur-grid" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="demineur-row">
              {row.map((cell, colIndex) => (
                <button
                  key={colIndex}
                  className={`demineur-cell ${cell.isRevealed ? 'revealed' : ''} ${
                    gameOver && gameOverCell && gameOverCell.row === rowIndex && gameOverCell.col === colIndex ? 'game-over-cell' : ''
                  } ${cell.isRevealed && !cell.isMine ? `number-${cell.neighborMines}` : ''} ${cell.isFlagged ? 'flagged' : ''}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                  disabled={gameOver}
                >
                  {cell.isRevealed ? (
                    cell.isMine ? '💣' : 
                    cell.neighborMines > 0 ? cell.neighborMines : ''
                  ) : cell.isFlagged ? '🚩' : ''}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demineur;