import { ADD_COMMENT_REQUEST } from '../constants'
import { generateId } from '../utils/utils'

export default (store) => (next) => (action) => {
  if (action.type === ADD_COMMENT_REQUEST) {
    const commentId = generateId()
    const { comment } = action.payload
    comment.id = commentId
  }
  next(action)
}
