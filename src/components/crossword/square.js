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
    const [squareClasses, setSquareClasses] = useState(squareClass());
    function handleChange(event) {
    handleSquareInput(event.target.value, row, col, inputLocation)
    setSquareClasses(squareClass(event))
    }

  function handleDownKey(event) {
    handleKeyDown(event, row, col, inputLocation)
  }

  function squareClass (event = {}) {
      switch (key_character) {
        case ('*'):
          console.log(`----------------HIT *------------------`)
          return styles.star
        case  ('&'):
          console.log(`----------------HIT &------------------`)
          return styles.ampersand
        case (event?.target?.value.toUpperCase()):
          console.log(`----------------HIT Correct------------------`)
          return styles.correct
        case (!event?.target?.value.toUpperCase()):
          console.log(`----------------HIT Incorrect------------------`)
          return styles.incorrect
        default:
          console.log(`----------------HIT Default------------------`)
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
            className={squareClasses}
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
