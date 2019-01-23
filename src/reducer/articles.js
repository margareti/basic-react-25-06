import { Record } from 'immutable'
import {
  DELETE_ARTICLE,
  ADD_COMMENT,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE_COMMENTS,
  SUCCESS,
  START,
  LOAD_ARTICLE
} from '../constants'
import { arrToMap } from './utils'

const ArticleRecord = Record({
  id: null,
  text: null,
  title: null,
  date: null,
  loading: false,
  commentsLoading: false,
  commentsLoaded: false,
  comments: []
})

const ReducerRecord = new Record({
  entities: arrToMap([], ArticleRecord),
  loading: null,
  loaded: false,
  error: null
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId, response } = action

  switch (type) {
    case DELETE_ARTICLE:
      return state.deleteIn(['entities', payload.id])

    case ADD_COMMENT:
      return state.updateIn(
        ['entities', payload.articleId, 'comments'],
        (comments) => comments.concat(randomId)
      )

    case 'LOAD_ALL_ARTICLES_START':
      console.log('start all')
      return state.set('loading', true)

    case LOAD_ALL_ARTICLES + SUCCESS:
      return state
        .set('entities', arrToMap(response, ArticleRecord))
        .set('loading', false)
        .set('loaded', true)

    case LOAD_ARTICLE + START:
      return state.set('loading', true)
    // .setIn(['entities', payload.id, 'loading'], true)

    case LOAD_ARTICLE + SUCCESS:
      return state
        .setIn(['entities', payload.id], new ArticleRecord(response))
        .set('loading', false)

    // case LOAD_ARTICLE_COMMENTS + START:
    //   return state.setIn(
    //     ['entities', payload.articleId, 'commentsLoading'],
    //     true
    //   )

    // case LOAD_ARTICLE_COMMENTS + SUCCESS:
    //   return state
    //     .setIn(['entities', payload.articleId, 'commentsLoading'], false)
    //     .setIn(['entities', payload.articleId, 'commentsLoaded'], true)

    default:
      return state
  }
}
