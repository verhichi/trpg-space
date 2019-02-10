import {
  ADD_GEO,
  EDIT_GEO,
  REMOVE_GEO,
} from '../../../constants/actionTypes';

export const addGeo = (geoData) => {
  return {
    type: ADD_GEO,
    geoData
  };
};

export const editGeo = (geoData) => {
  return {
    type: EDIT_GEO,
    geoData
  };
};

export const removeGeo = (geoId, mapId) => {
  return {
    type: REMOVE_GEO,
    geoId,
    mapId
  };
};
