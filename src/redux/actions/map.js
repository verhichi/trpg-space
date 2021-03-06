import {
  ADD_MAP,
  EDIT_MAP,
  REMOVE_MAP,
  SET_MAP_MODE,
  EDIT_MAP_POSITION,
  EDIT_MAP_SCALE,
  TOGGLE_MAP_GRID,
  SET_CHAR_TO_PLACE,
  SET_SEL_GEO,
  EDIT_GEO_ON,
  EDIT_GEO_OFF
} from '../../constants/actionTypes';

export const addMap = (mapData) => {
  return {
    type: ADD_MAP,
    mapData
  };
};

export const editMap = (mapData) => {
  return {
    type: EDIT_MAP,
    mapData
  };
};

export const removeMap = (mapId) => {
  return {
    type: REMOVE_MAP,
    mapId
  };
};

export const setMapMode = (mapId, mode) => {
  return {
    type: SET_MAP_MODE,
    mapId,
    mode
  }
};

export const editMapPosition = (mapId, left, top) => {
  return {
    type: EDIT_MAP_POSITION,
    mapId,
    left,
    top
  };
};

export const editMapScale = (mapId, scale) => {
  return {
    type: EDIT_MAP_SCALE,
    mapId,
    scale
  };
};

export const toggleMapGrid = (mapId) => {
  return {
    type: TOGGLE_MAP_GRID,
    mapId
  };
};

export const setCharToPlace = (mapId, charId) => {
  return {
    type: SET_CHAR_TO_PLACE,
    mapId,
    charId
  };
};

export const setSelGeo = (mapId, geoId) => {
  return {
    type: SET_SEL_GEO,
    mapId,
    geoId
  };
};

export const editGeoOn = (mapId) => {
  return {
    type: EDIT_GEO_ON,
    mapId
  };
};

export const editGeoOff = (mapId) => {
  return {
    type: EDIT_GEO_OFF,
    mapId
  };
};
