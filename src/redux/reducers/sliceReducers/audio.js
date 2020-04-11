import {
  ADD_AUDIO,
  REMOVE_AUDIO,
  REMOVE_USER_AUDIO,
  PLAY_AUDIO,
  PAUSE_AUDIO,
  MUTE_AUDIO,
  UNMUTE_AUDIO,
  TIME_UPDATE_AUDIO,
  SET_AUDIO
} from '../../../constants/actionTypes';

import {
  AUDIO_TYPE_BGM,
  AUDIO_TYPE_SE
} from '../../../constants/constants';

const AUDIO_BGM_EL = document.querySelector('#audio_bgm');
const AUDIO_SE_EL = document.querySelector('#audio_se');

function getAudioEl (type) {
  return type === AUDIO_TYPE_BGM ? AUDIO_BGM_EL : AUDIO_SE_EL;
}

// AUDIO_BGM_EL.addEventListener('timeupdate', )

const initialState = [
//   {
//     audioId:   id of the audio,
//     ownerId:   id of the owner of the audio,
//     title:     title of audio,
//     type:      BGM / SE,
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
      const AUDIO = state.find(audio => audio.audioId === action.audioId)
      if (AUDIO){
        if (AUDIO.isPlaying) {
          const AUDIO_EL0 = getAudioEl(AUDIO.type);
          AUDIO_EL0.id = '';
          AUDIO_EL0.pause();
          AUDIO_EL0.src = ''
        }
        return state.filter(audio => audio.audioId !== AUDIO.audioId);
      }
      return state;

    case REMOVE_USER_AUDIO:
      return state.filter(audio => {
        if (audio.ownerId === action.userId && audio.isPlaying) {
          const AUDIO_EL1 = getAudioEl(audio.type);
          AUDIO_EL1.id = '';
          AUDIO_EL1.pause();
          AUDIO_EL1.src = ''
        }
        return audio.ownerId === action.userId
      });
    
    default:
      return state;
  }
};

export default audioReducer;
