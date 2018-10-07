import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../comment-list'
import CSSTransition from 'react-addons-css-transition-group'
import { deleteArticle } from '../../ac'
import './style.css'

class Article extends Component {
  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  componentWillReceiveProps(next) {
    console.log('next', next)
  }

  render() {
    const { isOpen, article } = this.props
    console.log('render article', this.props)

    return (
      <div className="test--article-list__item">
        <div className="test--article__container">
          <h3>
            {article.title}
            <button onClick={this.handleClick} className="test--article__btn">
              {isOpen ? 'close' : 'open'}
            </button>
            <button onClick={this.handleDelete}>delete me</button>
          </h3>
          <CSSTransition
            transitionName="article"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {this.body}
          </CSSTransition>
        </div>
      </div>
    )
  }

  handleClick = () => this.props.toggleOpen(this.props.article.id)

  handleDelete = () => {
    const { article, deleteArticle } = this.props
    deleteArticle(article.id)
  }

  get body() {
    const { isOpen, comments, article } = this.props

    if (!isOpen || !article) return null
    return (
      <section className="test--article__body">
        {article.text}
        {!this.state.error && (
          <CommentList comments={comments} articleId={article.id} />
        )}
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
  }),

  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteArticle }
)(Article)
