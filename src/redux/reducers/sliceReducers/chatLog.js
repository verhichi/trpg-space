import uuid from 'uuid';
import { ADD_CHAT } from '../../../constants/actionTypes';
import { CHAT_TYPE_HELP } from '../../../constants/constants';

const initialState = [
  { type: CHAT_TYPE_HELP, id: 'abc' }
  // {
  //   type: 'text/help/image/join/leave/newHost/help,'
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

    default:
      return state;
  }

};

export default chatReducer;
