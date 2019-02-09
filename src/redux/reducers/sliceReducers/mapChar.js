import {
  ADD_MAP_CHAR,
  EDIT_MAP_CHAR,
  REMOVE_MAP_CHAR,
  REMOVE_ALL_CHAR_FROM_SEL_MAP,
  REMOVE_SEL_CHAR_FROM_ALL_MAP
} from '../../../constants/actionTypes';

const initialState = [
//  {
//    mapId: mapId,
//    charId:  charId,
//    left:    x position of charDot,
//    top:     y position of charDot
//  }
];

const mapReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_MAP_CHAR:
      if (state.some(mapChar => mapChar.mapId === action.mapId && mapChar.charId === action.charId)){
        return state;
      } else {
        return [...state, {
          mapId:       action.mapCharData.mapId,
          charId:      action.mapCharData.charId,
          left:        action.mapCharData.left,
          top:         action.mapCharData.top
        }];
      }

    case EDIT_MAP_CHAR:
      return state.map(mapChar => {
        if (mapChar.mapId === action.mapCharData.mapId && mapChar.charId === action.mapCharData.charId){
          return {
            ...mapChar,
            left: action.mapCharData.left,
            top:  action.mapCharData.top
          }
        } else {
          return mapChar;
        }
      });

    case REMOVE_MAP_CHAR:
      return state.filter(mapChar => !(mapChar.mapId === action.mapId && mapChar.charId === action.charId));

    case REMOVE_ALL_CHAR_FROM_SEL_MAP:
      return state.filter(mapChar => mapChar.mapId !== action.mapId);

    case REMOVE_SEL_CHAR_FROM_ALL_MAP:
      return state.filter(mapChar => mapChar.charId !== action.charId)

    default:
      return state;
  }
};

export default mapReducer;
