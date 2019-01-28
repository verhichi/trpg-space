import {
  ADD_CHAR,
  EDIT_CHAR,
  REMOVE_CHAR,
  ADD_MAP_CHAR,
  EDIT_MAP_CHAR,
  REMOVE_MAP_CHAR,
  REMOVE_ALL_MAP_CHAR
} from '../../../constants/actionTypes';

const initialState = {
  charList: [
    //   {
    //   charId: '23984743543',
    //   ownerId: '1234567',
    //   general: {
    //     name: 'Daichi',
    //     type: 'ally/enemy',
    //     color: '#010101',
    //     image: 'image-src',
    //     privacy: '0/1/2/3',
    //     link: 'link to an external character sheet link'
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
    //   ],
    //   map: {
    //     onMap: true/false,
    //     x: x-coordinate,
    //     y: y-coordinate
    //   }
    // }
  ]
};

const charReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_CHAR:
      if (!state.charList.some(char => char.charId === action.charData.charId)){
        return { charList: [...state.charList, action.charData] };
      } else {
        return state;
      }

    case EDIT_CHAR:
      return {
        charList: state.charList.map((char) => {
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
        })
      };

    case REMOVE_CHAR:
      return { charList: state.charList.filter(char => char.charId !== action.charId) };

    case ADD_MAP_CHAR:
      return {
        charList: state.charList.map((char) => {
          if (char.charId === action.charData.charId){
            return {
              ...char,
              map: {
                onMap: true,
                x: action.charData.x,
                y: action.charData.y
              }
            };
          } else {
            return char;
          }
        })
      };

    case EDIT_MAP_CHAR:
      return {
        charList: state.charList.map((char) => {
          if (char.charId === action.charData.charId){
            return {
              ...char,
              map: {
                ...char.map,
                x: action.charData.x,
                y: action.charData.y
              }
            };
          } else {
            return char;
          }
        })
      };

    case REMOVE_MAP_CHAR:
      return {
        charList: state.charList.map((char) => {
          if (char.charId === action.charId){
            return {
              ...char,
              map: {
                onMap: false,
                x: '',
                y: ''
              }
            };
          } else {
            return char;
          }
        })
      };

    case REMOVE_ALL_MAP_CHAR:
      return {
        charList: state.charList.map(char => {
          return {
            ...char,
            map: {
              onMap: false,
              x: '',
              y: ''
            }
          };
        })
      };

    default:
      return state;
  }

};

export default charReducer;
