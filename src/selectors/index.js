import { createSelector } from 'reselect'

export const filtersSelector = (state) => state.filters
export const articlesLoadingSelector = (state) => state.articles.loading
export const articlesLoadedSelector = (state) => state.articles.loaded

export const commentsLoadingSelector = (state) => state.comments.loading
export const commentsLoadedSelector = (state) => state.comments.loaded

export const articlesMapSelector = (state) => state.articles.entities
export const articleListSelector = createSelector(
  articlesMapSelector,
  (articlesMap) => articlesMap.valueSeq().toArray()
)
export const commentsSelector = (state) => state.comments
export const idSelector = (_, props) => props.id

export const filtratedArticlesSelector = createSelector(
  articleListSelector,
  filtersSelector,
  (articles, filters) => {
    console.log('---', 'articles selector')
    const {
      selected,
      dateRange: { from, to }
    } = filters

    return articles.filter((article) => {
      const published = Date.parse(article.date)
      return (
        (!selected.length ||
          selected.find((selected) => selected.value === article.id)) &&
        (!from || !to || (published > from && published < to))
      )
    })
  }
)

export const createCommentSelector = () =>
  createSelector(commentsSelector, idSelector, (comments, id) => {
    console.log('---', 'comment selector', id)
    console.log(comments.get(id))
    return comments.get(id)
  })

export const createCommentListSelector = () =>
  createSelector(commentsSelector, idSelector, (commentList, articleId) => {
    console.log('in selector', commentList.getIn(['entities', articleId]))
    return commentList.getIn(['entities', articleId]) || []
  })
