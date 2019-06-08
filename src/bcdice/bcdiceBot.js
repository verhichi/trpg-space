import BCDiceJS from 'bcdice-js'
import 'bcdice-js/lib/preload-dicebots';

class BCDiceAPI {
  constructor (){
    this._bcDice = new BCDiceJS();
    this._type = 'DiceBot';
  }

  get type(){
    return this._type;
  }

  set type(type){
    this._type = type;
  }

  getDiceResult (message){
    this._bcDice.setGameByTitle(this._type);
    this._bcDice.setMessage(message);
    const result = this._bcDice.dice_command();
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
