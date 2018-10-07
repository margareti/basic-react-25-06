import { DELETE_ARTICLE, ADD_COMMENT_REQUEST } from '../constants'
import { normalizedArticles } from '../fixtures'

const defaultArticles = normalizedArticles.reduce(
  (acc, article) => ({
    ...acc,
    [article.id]: article
  }),
  {}
)

export default (articlesState = defaultArticles, action) => {
  const { type, payload } = action
  const articles = { ...articlesState }
  switch (type) {
    case DELETE_ARTICLE:
      // return articlesState.filter((article) => article.id !== payload.id)
      console.log('deleting', articles[payload.id])
      delete articles[payload.id]
      return articles

    case ADD_COMMENT_REQUEST:
      const article = articles[payload.comment.articleId]
      article.comments = article.comments ? article.comments.slice(0) : []
      article.comments.push(payload.comment.id)

      return articles

    default:
      return articles
  }
}
