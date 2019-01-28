import {
  EDIT_MAP_IMAGE,
  SET_MAP_MODE,
  EDIT_MAP_POSITION,
  EDIT_MAP_SCALE,
  TOGGLE_MAP_GRID,
  SET_CHAR_TO_PLACE
} from '../../../constants/actionTypes';

const initialState = {
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
};

const mapReducer = (state = initialState, action) => {
  switch(action.type){
    case EDIT_MAP_IMAGE:
      return {
        ...state,
        image: {
          ...state.image,
          src: action.imageData.src,
          id:  action.imageData.id
        }
      };

    case SET_MAP_MODE:
      return {
        ...state,
        mode: action.mode
      };

    case EDIT_MAP_POSITION:
      return {
        ...state,
        image: {
          ...state.image,
          left: action.left,
          top: action.top
        }
      };

    case EDIT_MAP_SCALE:
      return {
        ...state,
        image: {
          ...state.image,
          scale: action.scale
        }
      };

    case TOGGLE_MAP_GRID:
      return {
        ...state,
        displayMapGrid: !state.displayMapGrid
      };

    case SET_CHAR_TO_PLACE:
      return {
        ...state,
        charToPlace: action.charId
      };

    default:
      return state;
  }

};

export default mapReducer;
