import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../comment-list'
import Loader from '../common/loader'
import CSSTransition from 'react-addons-css-transition-group'
import { deleteArticle, loadArticle } from '../../ac'
import './style.css'
import { commentsLoadedSelector } from '../../selectors'

class Article extends PureComponent {
  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  componentDidUpdate(oldProps) {
    const { isOpen, loadArticle, article } = this.props

    if (!oldProps.isOpen && isOpen && !article.text) loadArticle(article.id)
  }

  render() {
    const { article, isOpen } = this.props
    console.log('article', article)
    return (
      <div className="test--article__container">
        <h3>
          {article.title}
          <button onClick={this.handleClick} className="test--article__btn">
            {isOpen ? 'close' : 'open'}
          </button>
          <button onClick={this.handleDelete}>delete me</button>
        </h3>
        {article.loading && <Loader />}
        <CSSTransition
          transitionName="article"
          transitionEnterTimeout={700}
          transitionLeaveTimeout={500}
        >
          {article.loaded && this.body}
        </CSSTransition>
      </div>
    )
  }

  handleClick = () => {
    this.props.toggleOpen(this.props.article.id)
  }

  handleDelete = () => {
    const { article, deleteArticle } = this.props
    deleteArticle(article.id)
  }

  get body() {
    const { isOpen, article } = this.props
    if (!isOpen) return null
    return (
      <section className="test--article__body" style={{ background: 'pink' }}>
        {article.text}
        {!this.state.error && <CommentList article={article} />}
      </section>
    )
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    comments: PropTypes.array
  }).isRequired,

  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteArticle, loadArticle }
)(Article)
