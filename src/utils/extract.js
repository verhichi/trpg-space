import { YOUTUBE_URL_REGEXP } from '../constants/constants'
import { isYoutubeUrl } from './validate';
export const extractYoutubeId = url => {
  if (!isYoutubeUrl(url)) return ''
  const match = url.match(YOUTUBE_URL_REGEXP)
  if (!match || match.length < 1) return ''
  return match[1]
}