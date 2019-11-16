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
} from '../../constants/actionTypes';

export const addAudio = (audio) => ({
  type: ADD_AUDIO,
  audio
});

export const removeAudio = (audioId) => ({
  type: REMOVE_AUDIO,
  audioId
});

export const removeUserAudio = (userId) => ({
  type: REMOVE_USER_AUDIO,
  userId
});

export const setAudio = (audioId) => ({
  type: SET_AUDIO,
  audioId
});

export const playAudio = (audioId) => ({
  type: PLAY_AUDIO,
  audioId
});

export const pauseAudio = (audioId) => ({
  type: PAUSE_AUDIO,
  audioId
});

export const muteAudio = (audioId) => ({
  type: MUTE_AUDIO,
  audioId
});

export const unmuteAudio = (audioId) => ({
  type: UNMUTE_AUDIO,
  audioId
});

export const timeUpdateAudio = (audioId, curTime) => ({
  type: TIME_UPDATE_AUDIO,
  audioId,
  curTime
});