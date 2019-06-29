/**
 * Return object containing result of dice roll based on diceSetting argument
 *
 * @input diceSetting - [Object] data that contains the dice setting for the roll
 *          diceNumber - [Number] number of dice to roll
 *          diceType   - [Number] number of faces the dice has
 *          symbol     - [String] + or -, the value of the modifier.
 *          modifier   - [Number] bonus value
 */
export const getDiceRollResult = (diceSetting) => {
  let resultArray = [];

  for (let idx = 0; idx < diceSetting.diceNumber; idx++){
    const roll = Math.floor(Math.random() * diceSetting.diceType) + 1
    resultArray.push(roll);
  }

  const result = resultArray.join(', ') + '(' + diceSetting.symbol + diceSetting.modifier + ')';
  const total = resultArray.reduce((prev, next) => {
    return prev + next;
  }, Number(diceSetting.symbol + diceSetting.modifier));

  return {
    result, total
  };
};
