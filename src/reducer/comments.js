import {
  ADD_COMMENT,
  LOAD_ARTICLE_COMMENTS,
  SUCCESS,
  START
} from '../constants'
import { Record, OrderedMap } from 'immutable'
import { arrToMap } from './utils'

const CommentRecord = Record({
  id: null,
  text: null,
  user: null
})

const ReducerRecord = Record({
  entities: arrToMap([], CommentRecord),
  loading: false,
  loaded: false,
  error: null,
  pageSize: null,
  pageNum: null,
  maxPages: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case ADD_COMMENT:
      return state.setIn(
        ['entities', randomId],
        new CommentRecord({
          ...payload.comment,
          id: randomId
        })
      )

    case LOAD_ARTICLE_COMMENTS + SUCCESS:
      return state
        .set(['entities'], arrToMap(response.records, CommentRecord))
        .set('loaded', true)
        .set('loading', false)
        .set('maxPages', Math.ceil(response.total / 2))

    case LOAD_ARTICLE_COMMENTS + START:
      return state
        .set('loading', true)
        .set(['entities'], arrToMap([], CommentRecord))

    default:
      return state
  }
}
