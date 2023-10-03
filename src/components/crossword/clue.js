import { useState } from 'react';
import { Modal } from "@mui/material";
import Person from "@/components/person";
import { useUser } from "@/contexts/UserContext";
import {HiLightBulb} from "react-icons/hi";
import styles from "@/styles/crossword.module.css";
import modalStyles from "@/styles/Person.module.css";


function Clue(props) {
  const { number, word, clue, hint } = props;
  const [displayClue, setDisplayClue] = useState(true);
  const [showPersonInfo, setShowPersonInfo] = useState(false);
  const [showHint, setShowHint] = useState(false)
  const [currentPerson, setCurrentPerson] = useState(null);
  const { userFSData } = useUser();

  // Switches between clue and answer
  function handleContextMenu(event) {
    event.preventDefault();
    setDisplayClue(!displayClue);
  }

  // Shows the person Modal when their name is clicked (little convoluted, maybe fix later)
  function handleNameClick() { 
    if (!displayClue) {
      const transformedMap = new Map([...userFSData.entries()].map(([key, value]) => [value.name.compressedName, { key }]));
      const foundPerson = transformedMap.get(word)
      const realFoundPerson = userFSData.get(Object.values(foundPerson)[0])
      if (foundPerson) {
        setCurrentPerson(realFoundPerson);
        setShowPersonInfo(true);
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
        onContextMenu={handleContextMenu}
        onClick={displayClue ? null : handleNameClick}
      >
        {number + ". " + (displayClue ? clue : word)}
          <div className={styles.hint_button_container}>
          <button className={styles.hint_button} onClick={() => setShowHint(true)}>
              <HiLightBulb />
          </button>
        </div>
      </div>
      <Modal open={showPersonInfo} onClose={() => setShowPersonInfo(false)}>
        <Person personData={currentPerson}/>
      </Modal>
      <Modal open={showHint} onClose={() => setShowHint(false)}>
          <div className={modalStyles.container}>
            <p>{hint}</p>
          </div>
      </Modal>
    </>
  );
}

export default Clue;