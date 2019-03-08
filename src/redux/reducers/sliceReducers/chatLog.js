import uuid from 'uuid';
import { ADD_CHAT, REMOVE_ALL_CHAT } from '../../../constants/actionTypes';
import { CHAT_TYPE_HELP } from '../../../constants/constants';

const initialState = [
  { type: CHAT_TYPE_HELP, id: 'abc' }
  // {
  //   id:   uuid.v4(),
  //   type: text/help/image/join/leave/newHost/help,
  //   time: hh24:mm string,
  //   name: string of name of sender,
  //   private: true/false,
  //   self: true/false,
  //   sendTo: [list of userId],
  //   sendToNames: string of comma separated name list,
  //   diceSetting: n-d-m (n=number of dice, m=type of dice)(i.e. 2d6),
  //   result: string of comma separated roll result and bonus value(i.e. 1, 2, 3(+/-bonus)),
  //   total: string of total of value,
  //   src: string of src of image
  // }
  //
  // {
  //   id:   uuid.v4(),
  //   type: text/help/image/join/leave/newHost/help,
  //   time: hh24:mm string,
  //   chatProps: {
  //     name:        string of name of sender,
  //     self:        true/false,
  //     private:     true/false,
  //     sendTo:      [list of userId],
  //     sendToNames: string of comma separated name list,
  //     diceSetting: n-d-m (n=number of dice, m=type of dice)(i.e. 2d6),
  //     result:      string of comma separated roll result and bonus value(i.e. 1, 2, 3(+/-bonus)),
  //     total:       string of total of value,
  //     src:         string of src of image
  //   }
  // }
];

const chatReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_CHAT:
      const id = uuid.v4();

      const now  = new Date();
      const hour = now.getHours().toString().padStart(2, '0');
      const min  = now.getMinutes().toString().padStart(2, '0');
      const time = `${hour}:${min}`;

      return [...state, {
        ...action.content,
        time,
        id
      }];

    case REMOVE_ALL_CHAT:
      return [];

    default:
      return state;
  }

};

export default chatReducer;
