import {
  EDIT_MAP_IMAGE,
  SET_MAP_MODE,
  EDIT_MAP_POSITION,
  EDIT_MAP_SCALE,
  TOGGLE_MAP_GRID,
  SET_CHAR_TO_PLACE
} from '../../constants/actionTypes';

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

// import {
//   ADD_MAP,
//   EDIT_MAP,
//   REDUCER_MAP,
//   SET_MAP_MODE,
//   EDIT_MAP_POSITION,
//   EDIT_MAP_SCALE,
//   TOGGLE_MAP_GRID,
//   SET_CHAR_TO_PLACE,
//   ADD_MAP_CHAR,
//   EDIT_MAP_CHAR,
//   REMOVE_MAP_CHAR
// } from '../../../constants/actionTypes';
//
// export const addMap = (mapData) => {
//   return {
//     type: ADD_MAP,
//     mapData
//   };
// };
//
// export const editMap = (mapData) => {
//   return {
//     type: EDIT_MAP,
//     mapData
//   };
// };
//
// export const removeMap = (mapId) => {
//   return {
//     type: REMOVE_MAP,
//     mapId
//   };
// };
//
// export const setMapMode = (mapId, mode) => {
//   return {
//     type: SET_MAP_MODE,
//     mapId,
//     mode
//   }
// };
//
// export const editMapPosition = (mapId, left, top) => {
//   return {
//     type: EDIT_MAP_POSITION,
//     mapId,
//     left,
//     top
//   };
// };
//
// export const editMapScale = (mapId, scale) => {
//   return {
//     type: EDIT_MAP_SCALE,
//     mapId,
//     scale
//   };
// };
//
// export const toggleMapGrid = (mapId) => {
//   return {
//     type: TOGGLE_MAP_GRID,
//     mapId
//   };
// };
//
// export const setCharToPlace = (mapId, charId) => {
//   return {
//     type: SET_CHAR_TO_PLACE,
//     mapId,
//     charId
//   };
// };
//
// export const addMapChar = (mapId, charData) => {
//   return {
//     type: APP_MAP_CHAR,
//     mapId,
//     charData
//   };
// };
//
// export const editMapChar = (mapId, charData) => {
//   return {
//     type: EDIT_MAP_CHAR,
//     mapId,
//     charData
//   };
// };
//
// export const removeMapChar = (mapId, charId) => {
//   return {
//     type: REMOVE_MAP_CHAR,
//     mapId,
//     charId
//   };
// };
