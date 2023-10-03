import Clue from "./clue";
import {useEffect, useState} from "react";

function ClueList(props) {
  let { verticalClues, horizontalClues, result } = props;
  console.log('-----------------verticalClues----------------------')
  console.log(verticalClues)
  console.log('-----------------horizontalClues----------------------')
  console.log(horizontalClues)
  console.log('-----------------result----------------------')
  console.log(result)
  const [clueList, setClueList] = useState({VERTICAL: verticalClues, HORIZONTAL:horizontalClues});
  useEffect(() => {
    setClueList(makeClueList());
  }, []);
  function makeClueList() {
    for (let i = 0; i < verticalClues.length; i++) {
      verticalClues[i].CLUE = verticalClues[i].WORD;
    }
    for (let i = 0; i < horizontalClues.length; i++) {
      horizontalClues[i].CLUE = horizontalClues[i].WORD;
    }
    return {VERTICAL: verticalClues, HORIZONTAL: horizontalClues};
  }
  clueList.VERTICAL.sort((a, b) => a.CLUE_NUMBER - b.CLUE_NUMBER);
  clueList.HORIZONTAL.sort((a, b) => a.CLUE_NUMBER - b.CLUE_NUMBER); 

  for (let i = 0; i < clueList.VERTICAL.length; i++) {
    let clue = result.find(item => item.answer === clueList.VERTICAL[i].WORD);

    if (clue != null) {
      clueList.VERTICAL[i].CLUE = clue.clue
      clueList.VERTICAL[i].HINT = clue.hint
    }
    console.log('------------------clueList.VERTICAL[i]-------------------')
    console.log(clueList.VERTICAL[i])
  }

  for (let i = 0; i < clueList.HORIZONTAL.length; i++) {
    let clue = result.find(item => item.answer === clueList.HORIZONTAL[i].WORD);
    if (clue != null) {
      clueList.HORIZONTAL[i].CLUE = clue.clue
      clueList.HORIZONTAL[i].HINT = clue.hint
    }
  }

  return (
    <>
      <div>
        <h1>Clues</h1>
        <h2>Down</h2>
        {clueList.VERTICAL.map((clues) => {
          return (
            <div key={clues.CLUE_NUMBER}>
              <Clue number={clues.CLUE_NUMBER} word={clues.WORD} clue={clues.CLUE} hint={clues.HINT}/>
            </div>
          );
        })}
        <h2>Across</h2>
        {clueList.HORIZONTAL.map((clues) => {
          return (
            <div key={clues.CLUE_NUMBER}>
              <Clue number={clues.CLUE_NUMBER} word={clues.WORD} clue={clues.CLUE} hint={clues.HINT}/>
            </div>
          );
        })}
        <h3>Answers can be seen by right-clicking the clue</h3>
      </div>
    </>
  );
}
export default ClueList;