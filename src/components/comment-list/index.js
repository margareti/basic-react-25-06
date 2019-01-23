import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import Comment from '../comment'
import CommentForm from '../comment-form'
import Loader from '../common/loader'
import toggleOpen from '../../decorators/toggleOpen'
import { loadArticleComments } from '../../ac'
import { articleSelector } from '../../selectors'
import { commentsSelector } from '../../selectors'
import { Link } from 'react-router-dom'
import './style.css'

class CommentList extends Component {
  static propTypes = {
    article: PropTypes.object,
    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  /*
  static defaultProps = {
    comments: []
  }

*/
  componentDidMount() {
    const { article, loadArticleComments, pageNum } = this.props
    if (!article || !article.id) {
      return null
    }
    loadArticleComments(article.id, pageNum || 0)
  }
  componentDidUpdate(oldProps) {
    // console.log('did update comment list', this.props)
    const {
      article,
      loadArticleComments,
      pageNum,
      commentsLoading
    } = this.props
    if (article) {
      if (article.id && !oldProps.article) {
        return loadArticleComments(article.id, pageNum || 0)
      }
      // if (article.id !== oldProps.article.id) {
      //   return loadArticleComments(article.id, pageNum)
      // }
    }

    // if ((!this.props.comments.size || (pageNum !== oldProps.pageNum)) && !commentsLoading) {
    //   return loadArticleComments(article.id, pageNum)

    // }
  }

  render() {
    console.log('comment list', this.props)
    if (!this.props.article) return null
    return (
      <div>
        <CSSTransition
          transitionName="comments"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.getBody()}
        </CSSTransition>
      </div>
    )
  }

  getBody() {
    const {
      article: { id },
      commentsLoading
    } = this.props
    if (commentsLoading) {
      return <Loader />
    }

    return (
      <div className="test--comment-list__body">
        {/* {comments.size ? (
          this.comments
        ) : (
          <h3 className="test--comment-list__empty">No comments yet</h3>
        )} */}
        {this.props.comments.size > 0 && this.comments}
        <CommentForm articleId={id} />
      </div>
    )
  }

  get comments() {
    return (
      <ul>
        {this.props.comments.valueSeq().map((comment) => (
          <li key={comment.id} className="test--comment-list__item">
            <Comment comment={comment} />
          </li>
        ))}
        {this.pagination}
      </ul>
    )
  }

  get pagination() {
    return (
      <div>
        {this.props.pageNum > 0 && (
          <Link
            to={`/articles/${this.props.article.id}/comments/${this.props
              .pageNum - 1}`}
          >
            Prev
          </Link>
        )}
        {this.props.pageNum + 1}
        {this.props.maxPages > this.props.pageNum + 1 && (
          <Link
            to={`/articles/${this.props.article.id}/comments/${this.props
              .pageNum + 1}`}
          >
            Next
          </Link>
        )}
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    article: articleSelector(state, ownProps),
    comments: commentsSelector(state, ownProps),
    maxPages: state.comments.get('maxPages'),
    commentsLoading: state.comments.loading
  }),
  { loadArticleComments }
)(CommentList)
