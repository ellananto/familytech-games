import Board from "@/components/crossword/board";
import styles from "@/styles/crossword.module.css"
import {useState} from "react";
import { Modal } from "@mui/material";
import DifficultyModal from "@/components/crossword/difficultyModal";


function CrosswordPage() {
  const [showDifficultyModal, setShowDifficultyModal] = useState(true)
    const [dimension, setDimension] = useState(24)

    const handleDifficultySelect = (dimension) => {
        // You can do something with the selected difficulty here
        setDimension(dimension)
        console.log(dimension)
        setShowDifficultyModal(false)
    };

  if (!showDifficultyModal) {
    return (
        <>
          <h1></h1>
          <div className={styles.container}>
            <Board dimension={dimension}/>
          </div>
        </>
    );
  } else {
    return (
        <Modal open={showDifficultyModal} onClose={() => {setShowDifficultyModal(false)}}>
          <div>
            <DifficultyModal onSelectDimension={handleDifficultySelect}></DifficultyModal>
          </div>
        </Modal>
    )
  }
}

export default CrosswordPage;