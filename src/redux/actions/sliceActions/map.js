import {
  EDIT_MAP_IMAGE,
  SET_MAP_MODE,
  EDIT_MAP_POSITION,
  EDIT_MAP_SCALE,
  TOGGLE_MAP_GRID,
  SET_CHAR_TO_PLACE
} from '../../../constants/actionTypes';

export const editMapImage = (imageData) => {
  return {
    type: EDIT_MAP_IMAGE,
    imageData
  };
};

export const setMapMode = (mode) => {
  return {
    type: SET_MAP_MODE,
    mode
  };
};

export const editMapPosition = (left, top) => {
  return {
    type: EDIT_MAP_POSITION,
    left,
    top
  };
};

export const editMapScale = (scale) => {
  return {
    type: EDIT_MAP_SCALE,
    scale
  }
};

export const toggleMapGrid = () => {
  return { type: TOGGLE_MAP_GRID };
};

export const setCharToPlace = (charId) => {
  return {
    type: SET_CHAR_TO_PLACE,
    charId
  };
};
