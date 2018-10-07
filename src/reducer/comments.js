import { ADD_COMMENT_REQUEST } from '../constants'
import { normalizedComments } from '../fixtures'

const defaultComments = normalizedComments.reduce(
  (acc, comment) => ({
    ...acc,
    [comment.id]: comment
  }),
  {}
)

export default (commentsState = defaultComments, action) => {
  const { type } = action
  switch (type) {
    case ADD_COMMENT_REQUEST:
      const newState = Object.assign(commentsState)
      commentsState[action.payload.comment.id] = action.payload.comment

      return newState

    default:
      return commentsState
  }
}
