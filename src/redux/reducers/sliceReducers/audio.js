import {
  ADD_AUDIO,
  REMOVE_AUDIO,
  REMOVE_USER_AUDIO,
  SET_AUDIO,
  UNSET_AUDIO,
} from '../../../constants/actionTypes';

const initialState = [
//   {
//     audioId:   id of the audio,
//     ownerId:   id of the owner of the audio,
//     title:     title of audio,
//     url:       youtube link of audio,
//     youtubeId: youtube video id,
//     isPlaying: is audio playing(true) or paused(false),
//   }
];

const audioReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_AUDIO:
      if (state.find(audio => audio.audioId === action.audio.audioId)) {
        return state
      } else {
        return [ ...state, {
          ...action.audio,
          isPlaying: false,
        } ];
      }

    case REMOVE_AUDIO:
      return state.filter(audio => action.audioId !== audio.audioId);

    case REMOVE_USER_AUDIO:
      return state.filter(audio => audio.ownerId !== action.userId);

    case SET_AUDIO:
      return state.map(audio => {
        return {
          ...audio,
          isPlaying: audio.audioId === action.audioId
        }
      })

    case UNSET_AUDIO:
      return state.map(audio => {
        if (audio.audioId === action.audioId) return { ...audio, isPlaying: false }
        return audio
      })
    
    default:
      return state;
  }
};

export default audioReducer;
