import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Article from './article'
import accordion from '../decorators/accordion'
import { filteredArticlesSelector } from '../selectors'

export class ArticleList extends Component {
  static propTypes = {
    // articles: PropTypes.,
    fetchData: PropTypes.func,

    //from accordion decorator
    openItemId: PropTypes.string,
    toggleItem: PropTypes.func
  }

  componentDidMount() {
    this.props.fetchData && this.props.fetchData()
  }

  render() {
    console.log('article list props', this.props)
    return <ul>{this.articles}</ul>
  }

  get articles() {
    return Object.keys(this.props.articles).map((articleId) => (
      <li key={articleId}>
        <Article
          article={this.props.articles[articleId]}
          comments={this.props.articles[articleId].comments}
          toggleOpen={this.props.toggleOpenItem}
          isOpen={this.props.openItemId === articleId}
        />
      </li>
    ))
  }
}

export default connect((state) => {
  return {
    articles: filteredArticlesSelector(state)
  }
})(accordion(ArticleList))
