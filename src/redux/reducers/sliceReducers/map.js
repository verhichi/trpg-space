import {
  ADD_MAP,
  EDIT_MAP,
  REMOVE_MAP,
  SET_MAP_MODE,
  EDIT_MAP_POSITION,
  EDIT_MAP_SCALE,
  TOGGLE_MAP_GRID,
  SET_CHAR_TO_PLACE,
} from '../../../constants/actionTypes';

const initialState = [
//   {
//     mapId:          id of the map itself,
//     ownerId:        userId of the owner of the map,
//     displayMapGrid: true/false,
//     left:           x coordinate of map itself,
//     top:            y coordinate of map itself,
//     mode:           mapMode,
//     charToPlace:    characterIdToPlace,
//     src:            src of map image,
//     name:           name of map,
//     private:        true/false,
//   }
];

const mapReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_MAP:
      if (!state.some(map => map.mapId === action.mapData.mapId)){
        return [ ...state, {
          mapId:          action.mapData.mapId,
          ownerId:        action.mapData.ownerId,
          displayMapGrid: false,
          left:           0,
          top:            0,
          scale:          1.0,
          mode:           '',
          charToPlace:    '',
          src:            action.mapData.src,
          name:           action.mapData.name,
          private:        action.mapData.private,
        } ];
      } else {
        return state;
      }

    case EDIT_MAP:
      return state.map(map => {
        if (map.mapId === action.mapData.mapId){
          return {
            ...map,
            src:     action.mapData.src,
            name:    action.mapData.name,
            private: action.mapData.private,
          };
        } else {
          return map;
        }
      });

    case REMOVE_MAP:
      return state.filter(map => map.mapId !== action.mapId);

    case SET_MAP_MODE:
      return state.map(map => {
        if (map.mapId === action.mapId){
          return {
            ...map,
            mode: action.mode
          };
        } else {
          return map;
        }
      });

    case EDIT_MAP_POSITION:
      return state.map(map => {
        if (map.mapId === action.mapId){
          return {
            ...map,
            left: action.left,
            top:  action.top
          };
        } else {
          return map;
        }
      });

    case EDIT_MAP_SCALE:
      return state.map(map => {
        if (map.mapId === action.mapId){
          return {
            ...map,
            scale: action.scale
          };
        } else {
          return map;
        }
      });

    case TOGGLE_MAP_GRID:
      return state.map(map => {
        if (map.mapId === action.mapId){
          return {
            ...map,
            displayMapGrid: !map.displayMapGrid
          };
        } else {
          return map;
        }
      });

    case SET_CHAR_TO_PLACE:
      return state.map(map => {
        if (map.mapId === action.mapId){
          return {
            ...map,
            charToPlace: action.charId
          };
        } else {
          return map;
        }
      });

    default:
      return state;
  }
};

export default mapReducer;
