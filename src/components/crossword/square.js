import { useState, useEffect } from 'react';
import styles from "@/styles/crossword.module.css";

function Square(props) {
  let {
    character,
    key_character,
    handleSquareInput,
    handleKeyDown,
    row,
    col,
    clueNumber,
    dimensions,
    inputLocation,
  } = props;
    const [squareClasses, setSquareClasses] = useState(squareClass());
    function handleChange(event) {
    handleSquareInput(event.target.value, row, col, inputLocation)
    setSquareClasses(squareClass(event))
    }

  function handleDownKey(event) { // stays to the right of the letter
    if (
        event.key === "Tab" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
    ) {
      event.preventDefault();
    }
    handleKeyDown(event, row, col, inputLocation);
  }

  const [clueHoverValue, setClueHoverValue] = useState(localStorage.getItem('clueHover') || '')

  useEffect(() => {
    const handleClueHover = (e) => {
      setClueHoverValue(localStorage.getItem('clueHover'))
    };
    window.addEventListener('hoverClue', handleClueHover);
    return () => {
      window.removeEventListener('hoverClue', handleClueHover);
    };
  }, []);

  function squareClass (event = {}) {
      switch (key_character) {
        case ('*'):
          return styles.star
        case  ('&'):
          return styles.ampersand
        case (event?.target?.value.toUpperCase()):
          return styles.correct
        case (!event?.target?.value.toUpperCase()):
          return styles.incorrect
        default:
          return styles.incorrect
      }
  }

  return (
    <>
      <div className={styles.div}>

        {clueNumber !== 0 ? <p className={styles.number}>{clueNumber}</p> : null}
        <input
            ref={(element) =>
                (inputLocation.current[row * dimensions + col] = element)
            }
            className={`${squareClasses} ${clueHoverValue === clueNumber.toString() ? styles.clueHover : null}`}
            readOnly={key_character === '*' || key_character === '&'}
            maxLength={1}
            type="text"
            onChange={handleChange}
            onKeyDown={handleDownKey}
            disabled={key_character === '*' || key_character === '&'}
        />

      </div>
    </>
  )
}

export default Square
