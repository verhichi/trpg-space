import {
  ADD_CHAR,
  EDIT_CHAR,
  REMOVE_CHAR,
  EDIT_CHAR_STAT
} from '../../../constants/actionTypes';

const initialState = [
    //   {
    //   charId: '23984743543',
    //   ownerId: '1234567',
    //   general: {
    //     name: 'Daichi',
    //     type: 'ally/enemy',
    //     color: '#010101',
    //     image: 'image-src',
    //     privacy: '0/1/2/3',
    //   },
    //   status: [
    //     {
    //        id: 'statId',
    //        type: 'value/param',
    //        label: 'labelName',
    //        value: 'currentValue',
    //        maxValue: 'maximumValue'(only if type is param)
    //     }
    //   ],
    //   detail: [
    //     {
    //        id: 'statId',
    //        type: 'value/param',
    //        label: 'labelName',
    //        value: 'currentValue',
    //        maxValue: 'maximumValue'(only if type is param)
    //     }
    //   ]
    // }
];

const charReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_CHAR:
      if (!state.some(char => char.charId === action.charData.charId)){
        return [ ...state, action.charData];
      } else {
        return state;
      }

    case EDIT_CHAR:
      return state.map((char) => {
        if (char.charId === action.charData.charId){
          return {
            ...char,
            general: action.charData.general,
            status:  action.charData.status,
            detail:  action.charData.detail
          };
        } else {
          return char;
        }
      });

    case REMOVE_CHAR:
      return state.filter(char => char.charId !== action.charId);

    case EDIT_CHAR_STAT:
      return state.map(char => {
        if (char.charId === action.charId){
          return {
            ...char,
            status: char.status.map(stat => {
              if (stat.id === action.statId){
                return {
                  ...stat,
                  value: action.value
                }
              } else {
                return stat;
              }
            })
          }
        } else {
          return char;
        }
      });

    default:
      return state;
  }

};

export default charReducer;
