import {
  ADD_AUDIO,
  REMOVE_AUDIO,
  REMOVE_USER_AUDIO,
  SET_AUDIO,
  UNSET_AUDIO
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

export const unsetAudio = (audioId) => ({
  type: UNSET_AUDIO,
  audioId
});