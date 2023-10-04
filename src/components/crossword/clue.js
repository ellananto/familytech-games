import { useState } from 'react';
import { Modal } from "@mui/material";
import Person from "@/components/person";
import { useUser } from "@/contexts/UserContext";
import { HiLightBulb} from "react-icons/hi";
import { BsFillPersonFill } from 'react-icons/bs'
import { MdQuestionAnswer } from 'react-icons/md'
import { BiSearchAlt2 } from 'react-icons/bi'
import styles from "@/styles/crossword.module.css";


function Clue(props) {
  const { number, word, clue, hint } = props;
  const [displayClue, setDisplayClue] = useState(true);
  const [showPersonInfo, setShowPersonInfo] = useState(false);
  const [showHint, setShowHint] = useState(false)
  const [currentPerson, setCurrentPerson] = useState(null);
  const { userFSData } = useUser();

  // Switches between clue and answer
  // function showAnswer(event) {
  //   event.preventDefault();
  //   setDisplayClue(!displayClue);
  // }

  // Shows the person Modal when their name is clicked (little convoluted, maybe fix later)
  function handleNameClick() {
    if (!displayClue) {
      const transformedMap = new Map([...userFSData.entries()].map(([key, value]) => [value.name.compressedName, { key }]));
      const foundPerson = transformedMap.get(word)
      const realFoundPerson = userFSData.get(Object.values(foundPerson)[0])
      if (foundPerson) {
        setCurrentPerson(realFoundPerson);
        setShowHint(false);
      }
    }
  }

  // useEffect(() => {
  //   setDisplayClue(false);
  // }, []);

  return (
    <>
      <div 
        // onContextMenu={ handleContextMenu }
        onClick={displayClue ? null : handleNameClick}
      >
        {number + ". " + (displayClue ? clue : word)}
          <div className={styles.hint_button_container}>
              {displayClue === true && (
              <div>
                  <button className={styles.hint_button} onClick={() => setShowHint(true)}>
                      <HiLightBulb /> Show hint
                  </button>
                  <button className={styles.answer_button} onClick={() => setDisplayClue(false)}>
                      <MdQuestionAnswer /> Show answer
                  </button>
              </div>
                  )}
          {displayClue === false && (
              <div>
              <button className={styles.clue_button} onClick={() => setDisplayClue(true)}>
                  <BiSearchAlt2 /> Show clue
              </button>
              <button className={styles.person_button} onClick={() => setShowPersonInfo(true)}>
                  <BsFillPersonFill /> Show person
              </button>
              </div>

          )}
        </div>
      </div>
      <Modal open={showPersonInfo} onClose={() => setShowPersonInfo(false)}>
        <Person personData={currentPerson}/>
      </Modal>
      <Modal open={showHint} onClose={() => setShowHint(false)}>
          <div className={styles.hint_container}>
            <p>{hint}</p>
          </div>
      </Modal>
    </>
  );
}

export default Clue;