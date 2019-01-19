import { ADD_COMMENT, GET_COMMENTS, SUCCESS, START } from '../constants'
//import { normalizedComments } from '../fixtures'
import { arrToMap } from './utils'
import { Record } from 'immutable'

const CommentRecord = Record({
  id: null,
  user: null,
  text: null
})

const ReducerState = Record({
  entities: arrToMap([], CommentRecord),
  loading: false,
  loaded: false,
  error: null
})

export default (comments = new ReducerState(), action) => {
  const { type, payload, response, randomId } = action

  switch (type) {
    case GET_COMMENTS + START:
      return comments
        .set('loading', true)
        .set('entities', arrToMap([], CommentRecord))

    case GET_COMMENTS + SUCCESS:
      return comments
        .setIn(['entities', payload.articleId], response)
        .set('loading', false)
        .set('loaded', true)
    case ADD_COMMENT:
      const newComment = new CommentRecord({ ...payload.comment, id: randomId })
      return comments.updateIn(['entities', payload.articleId], (comments) =>
        comments.concat(newComment)
      )

    default:
      return comments
  }
}
