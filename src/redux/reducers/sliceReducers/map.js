import {
  EDIT_MAP_IMAGE,
  SET_MAP_MODE,
  EDIT_MAP_POSITION,
  EDIT_MAP_SCALE,
  TOGGLE_MAP_GRID,
  SET_CHAR_TO_PLACE
} from '../../../constants/actionTypes';

const initialState = {
  mapSetting: {
    image: {
      src: '',
      id: '',
      left: 0,
      top: 0,
      scale: 1.0
    },
    displayMapGrid: false,
    mode: '',
    charToPlace: ''
  }
};

const mapReducer = (state = initialState, action) => {
  switch(action.type){
    case EDIT_MAP_IMAGE:
      return {
        mapSetting: {
          ...state.mapSetting,
          image: {
            ...state.mapSetting.image,
            src: action.imageData.src,
            id:  action.imageData.id
          }
        }
      };

    case SET_MAP_MODE:
      return {
        mapSetting: {
          ...state.mapSetting,
          mode: action.mode
        }
      };

    case EDIT_MAP_POSITION:
      return {
        mapSetting: {
          ...state.mapSetting,
          image: {
            ...state.mapSetting.image,
            left: action.left,
            top: action.top
          }
        }
      };

    case EDIT_MAP_SCALE:
      return {
        mapSetting: {
          ...state.mapSetting,
          image: {
            ...state.mapSetting.image,
            scale: action.scale
          }
        }
      };

    case TOGGLE_MAP_GRID:
      return {
        mapSetting: {
          ...state.mapSetting,
          displayMapGrid: !state.mapSetting.displayMapGrid
        }
      };

    case SET_CHAR_TO_PLACE:
      return {
        mapSetting: {
          ...state.mapSetting,
          charToPlace: action.charId
        }
      };

    default:
      return state;
    }

};

export default mapReducer;
