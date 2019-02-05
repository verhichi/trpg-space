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
// const initialState = [
// //   {
// //     mapId:          id of the map itself,
// //     ownerId:        userId of the owner of the map,
// //     displayMapGrid: true/false,
// //     left:           x coordinate of map itself,
// //     top:            y coordinate of map itself,
// //     mode:           mapMode,
// //     charToPlace:    characterIdToPlace,
// //     src:            src of map image,
// //     name:           name of map,
// //     privacy:        [userId of users to show map to],
// //     charDots: [
// //       {
// //         charId: charId,
// //         left:   x position of charDot,
// //         top:    y position of charDot
// //       }
// //     ],
// //   }
// ];
//
// const mapReducer = (state = initialState, action) => {
//   switch(action.type){
//     case APP_MAP:
//       if (!state.some(map => map.mapId === action.mapData.mapId)){
//         return [ ...state, action.mapData ];
//       } else {
//         return state;
//       }
//
//     case EDIT_MAP:
//       return state.map(map => {
//         if (map.mapId === action.mapData.mapId){
//           return {
//             ...map,
//             src:     action.mapData.src,
//             name:    action.mapData.name,
//             privacy: action.mapData.privacy
//           };
//         } else {
//           return map;
//         }
//       });
//
//     case REMOVE_MAP:
//       return state.filter(map => map.mapId !== action.mapId);
//
//     case SET_MAP_MODE:
//       return state.map(map => {
//         if (map.mapId === action.mapId){
//           return {
//             ...map,
//             mode: action.mode
//           };
//         } else {
//           return map;
//         }
//       });
//
//     case EDIT_MAP_POSITION:
//       return state.map(map => {
//         if (map.mapId === action.mapId){
//           return {
//             ...map,
//             left: action.left,
//             top:  action.top
//           };
//         } else {
//           return map;
//         }
//       });
//
//     case EDIT_MAP_SCALE:
//       return state.map(map => {
//         if (map.mapId === action.mapData.mapId){
//           return {
//             ...map,
//             scale: action.scale
//           };
//         } else {
//           return map;
//         }
//       });
//
//     case TOGGLE_MAP_GRID:
//       return state.map(map => {
//         if (map.mapId === action.mapId){
//           return {
//             ...map,
//             displayMapGrid: !map.displayMapGrid
//           };
//         } else {
//           return map;
//         }
//       });
//
//     case SET_CHAR_TO_PLACE:
//       return state.map(map => {
//         if (map.mapId === action.mapId){
//           return {
//             ...map,
//             charToPlace: action.charId
//           };
//         } else {
//           return map;
//         }
//       });
//
//     case ADD_MAP_CHAR:
//       return state.map(map => {
//         if (map.mapId === action.mapId){
//           return {
//             ...map,
//             charDots: [...map.charDots, action.charData]
//           };
//         } else {
//           return map;
//         }
//       });
//
//     case EDIT_MAP_CHAR:
//       return state.map(map => {
//         if (map.mapId === action.mapId){
//           return {
//             ...map,
//             charDots: map.charDots.map(char => {
//               if (action.charData.charId === char.charId){
//                 return action.charData;
//               } else {
//                 return char;
//               }
//             });
//           };
//         } else {
//           return map;
//         }
//       });
//
//     case REMOVE_MAP_CHAR:
//       return state.map(map => {
//         if (map.mapId === action.mapId){
//           return {
//             ...map,
//             charDots: map.charDots.filter(char => char.charId !== action.charId)
//           };
//         } else {
//           return map;
//         }
//       });
//
//     default:
//       return state;
//   }
// };

export default mapReducer;
