import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import CommentForm from '../comment-form'
import toggleOpen from '../../decorators/toggleOpen'
import { loadComments } from '../../ac'
import {
  createCommentListSelector,
  commentsLoadingSelector,
  commentsLoadedSelector
} from '../../selectors'
import './style.css'
import Loader from '../common/loader'

class CommentList extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    //from toggleOpen decorator
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  }

  /*
  static defaultProps = {
    comments: []
  }
*/

  render() {
    console.log('rerender comment list', this.props.comments)
    // console.log(this.comments.get(this.props.article.id))
    const { isOpen, toggleOpen } = this.props
    const text = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <button onClick={this.openArticle} className="test--comment-list__btn">
          {text}
        </button>
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

  openArticle = () => {
    this.props.toggleOpen()

    if (!this.props.comments.length) {
      this.props.loadComments(this.props.article.id)
    }
  }

  getBody() {
    const {
      article: { comments = [], id },
      isOpen
    } = this.props
    if (!isOpen) return null

    return (
      <div className="test--comment-list__body">
        {comments.length ? (
          this.comments
        ) : (
          <h3 className="test--comment-list__empty">No comments yet</h3>
        )}
        <CommentForm articleId={id} />
      </div>
    )
  }

  get comments() {
    return (
      <ul>
        {this.props.loading && <Loader />}
        {this.props.comments.length > 0 &&
          this.props.comments.map((comment) => (
            <li key={comment.id} className="test--comment-list__item">
              <Comment comment={comment} />
            </li>
          ))}
      </ul>
    )
  }
}

const initMapStateToProps = () => {
  const commentListSelector = createCommentListSelector()
  console.log('init comment list')
  return (state, ownProps) => ({
    comments: commentListSelector(state, ownProps.article),
    loading: commentsLoadingSelector(state),
    loaded: commentsLoadedSelector(state)
  })
}

export default connect(
  initMapStateToProps,
  { loadComments }
)(toggleOpen(CommentList))
