import { YOUTUBE_URL_REGEXP } from '../constants/constants'
export const isYoutubeUrl = url => YOUTUBE_URL_REGEXP.test(url)