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
    const [squareClasses, setSquareClasses] = useState(styles.square_incorrect);
    function handleChange(event) {
    handleSquareInput(event.target.value, row, col, inputLocation)
    const isCorrect = event.target.value.toUpperCase() === key_character
    setSquareClasses(isCorrect ? styles.square_correct : styles.square_incorrect);
    console.log('----------------------------------')
    console.log(squareClasses)
    }

  function handleDownKey(event) {
    handleKeyDown(event, row, col, inputLocation)
  }

  return (
    <>
      <div className={styles.div}>
          {clueNumber !== 0 ? <p className={styles.number}>{clueNumber}</p> : null}

          <input
              ref={(element) =>
                  (inputLocation.current[row * dimensions + col] = element)
              }
              className={squareClasses} // Apply the correct or incorrect class
      readOnly={key_character === "*" || key_character === "&"}
      style={
        key_character === "*"
          ? { backgroundColor: "black", borderColor: "black" }
          : key_character === "&"
          ? {
              backgroundColor: "white",
              height: 0,
              width: 0,
              border: 0,
            } : {}
          //: { backgroundColor: "white", borderColor: "black" }
      }
      maxLength={1}
      type="text"
      onChange={handleChange}
      onKeyDown={handleDownKey}
      disabled={
        key_character === "*" || key_character === "&"
      }
    ></input>
  </div>
    </>
  )
}

export default Square
