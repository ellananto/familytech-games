import { useState } from 'react';
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
    const [squareClasses, setSquareClasses] = useState(styles.incorrect);
    function handleChange(event) {
    handleSquareInput(event.target.value, row, col, inputLocation)
      setSquareClasses(squareClass(event)
      )
    }

  function handleDownKey(event) {
    handleKeyDown(event, row, col, inputLocation)
  }

  function squareClass (event) {
      switch (key_character) {
        case ('*'):
          return styles.star
        case  ('&'):
          return styles.ampersand
        case (event.target.value.toUpperCase()):
          return styles.correct
        case (!event.target.value.toUpperCase()):
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
            className={key_character === '*' ? styles.star : key_character === '&' ? styles.ampersand : squareClasses}
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
