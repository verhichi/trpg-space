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
