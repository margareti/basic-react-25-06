import { createSelector } from 'reselect'

export const filtersSelector = (state) => state.filters
export const articleListSelector = (state) => state.articles
export const commentsSelector = (state) => state.comments
export const idSelector = (_, props) => props.id

export const filteredArticlesSelector = createSelector(
  articleListSelector,
  filtersSelector,
  (articles, filters) => {
    console.log('---', 'articles selector')
    const {
      selected,
      dateRange: { from, to }
    } = filters
    let result = {}

    const filtered = Object.keys(articles).filter((articleId) => {
      const article = articles[articleId]
      const published = Date.parse(article.date)

      return (
        (!selected.length ||
          selected.find((selected) => {
            if (selected.value === article.id) {
              return article
            }
          })) &&
        (!from || !to || (published > from && published < to))
      )
    })
    filtered.map((item) => (result[item] = articles[item]))
    return result
  }
)

export const createCommentSelector = () =>
  createSelector(commentsSelector, idSelector, (comments, id) => {
    console.log('---', 'comment selector', id)
    return comments[id]
  })
