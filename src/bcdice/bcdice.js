import BCDice from 'bcdice-js'


class BCDiceAPI {
  bcDice;

  constructor (){
    this.bcDice = new BCDice();
  }

  setGameType (type){
    this.bcDice.setGameByTitle(type);
  }

  getDiceResult (message){
    this.bcDice.setMessage(message);
    const result = this.bcDice.dice_command();
    result[0] = result[0].substr(1)

    if (result[0]){
      return result;
    } else {
      return null;
    }
  }
}


const bcDice = new BCDiceAPI();
export default bcDice;
