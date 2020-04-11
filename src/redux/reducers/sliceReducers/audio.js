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
//     src:       src of audio,
//     isPlaying: is audio playing(true) or paused(false),
//     isMuted:   is audio muted(true) or unmuted(false),
//     curTime:   currentTime of audio(seconds),
//     duration:  duration of audio(seconds),
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
          isMuted: false,
          curTime: 0
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

    case SET_AUDIO:
      const AUDIO1 = state.find(audio => audio.audioId === action.audioId)
      if (AUDIO1) {
        const AUDIO_EL = getAudioEl(AUDIO1.type)
        AUDIO_EL.id = AUDIO1.audioId
        AUDIO_EL.muted = AUDIO1.isMuted
        AUDIO_EL.src = AUDIO1.src
      }
      return state

    case PLAY_AUDIO:
      const AUDIO2 = state.find(audio => audio.audioId === action.audioId)
      if (AUDIO2){
        const AUDIO_EL2 = getAudioEl(AUDIO2.type)
        return state.map(audio => {
          if (audio.audioId === AUDIO2.audioId) {
            AUDIO_EL2.currentTime = AUDIO2.curTime
            AUDIO_EL2.play()
  
            return {
              ...audio,
              isPlaying: true
            }
          } else if (audio.type === AUDIO2.type) {
            return {
              ...audio,
              isPlaying: false
            }
          } else {
            return audio
          }
        });
      }
      return state;

    case PAUSE_AUDIO:
      const AUDIO3 = state.find(audio => audio.audioId === action.audioId)
      if (AUDIO3){
        const AUDIO_EL3 = getAudioEl(AUDIO3.type)
        return state.map(audio => {
          if (audio.audioId === AUDIO3.audioId) {
            AUDIO_EL3.pause()
            return {
              ...audio,
              isPlaying: false
            }
          } else {
            return audio
          }
        });
      }
      return state;

    case MUTE_AUDIO:
      const AUDIO4 = state.find(audio => audio.audioId === action.audioId)
      if (AUDIO4){
        const AUDIO_EL4 = getAudioEl(AUDIO4.type)
        return state.map(audio => {
          if (audio.audioId ===AUDIO4.audioId) {
            if (AUDIO4.isPlaying) {
              AUDIO_EL4.muted = true
            }
            return {
              ...audio,
              isMuted: true
            }
          } else {
            return audio
          }
        });
      }
      return state


    case UNMUTE_AUDIO:
      const AUDIO5 = state.find(audio => audio.audioId === action.audioId)
      if (AUDIO5){
        const AUDIO_EL5 = getAudioEl(AUDIO5.type)
        return state.map(audio => {
          if (audio.audioId === AUDIO5.audioId) {
            if (AUDIO5.isPlaying) {
              AUDIO_EL5.muted = false
            }
            return {
              ...audio,
              isMuted: false
            }
          } else {
            return audio
          }
        });
      }
      return state


    case TIME_UPDATE_AUDIO:
      return state.map(audio => {
        if (audio.audioId === action.audioId){
          return {
            ...audio,
            curTime: action.curTime
          }
        } else {
          return audio
        }
      });
    
    default:
      return state;
  }
};

export default audioReducer;
