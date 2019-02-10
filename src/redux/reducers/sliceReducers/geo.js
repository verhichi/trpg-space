import {
  ADD_GEO,
  EDIT_GEO,
  REMOVE_GEO,
} from '../../../constants/actionTypes';

const initialState = [
//   {
//     geoId:  id of the div block,
//     mapId:  id of the map,
//     left:   x coordinate of div,
//     top:    y coordinate of div,
//     width:  width of div block,
//     height: height of div block
//   }
];

const geoReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_GEO:
      return [ ...state, action.geoData ];

    case EDIT_GEO:
      return state.map(geo => {
        if (geo.geoId === action.geoData.geoId && geo.mapId === action.geoData.mapId){
          return {
            ...geo,
            left:   action.geoData.left,
            top:    action.geoData.top,
            width:  action.geoData.width,
            height: action.geoData.height
          }
        } else {
          return geo;
        }
      });

    case REMOVE_GEO:
      return state.filter(geo => !(geo.geoId === action.geoId && geo.mapId === action.mapId));

    default:
      return state;
  }
};

export default geoReducer;
