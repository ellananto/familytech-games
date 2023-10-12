import React from 'react'
import styles from '../../styles/crossword.module.css'

const difficultyEnum = [
    {
        difficulty: 'Easy',
        dimension: 15
    },
    {
        difficulty: 'Medium',
        dimension: 20
    },
    {
        difficulty: 'Hard',
        dimension: 25
    }
];

function DifficultyModal({ onSelectDimension }) {
    return (
        <div className={styles.modal_container}>
            <h2>Select Difficulty</h2>
            <div >
                {difficultyEnum.map((level) => (
                    <button className={styles.difficulty_button}
                        key={level.dimension}
                        onClick={() => onSelectDimension(level.dimension)}
                    >
                        {level.difficulty}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DifficultyModal;
