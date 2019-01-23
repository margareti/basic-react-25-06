import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ArticleList from '../components/article-list'
import Article from '../components/article'
import CommentList from '../components/comment-list'

class ArticlesRoute extends Component {
  static propTypes = {}

  render() {
    console.log('--- ArticlesRoute match', this.props.match)
    return (
      <div>
        <ArticleList />
        <Route
          path="/articles"
          render={() => <h1>Please select an article</h1>}
          exact
        />
        <Route path="/articles/:id" render={this.getArticle} />
        <Switch>
          <Route
            path="/articles/:id/comments/:pageNum"
            render={this.getCommentList}
          />
          <Route path="/articles/:id/comments/" render={this.getCommentList} />
        </Switch>
      </div>
    )
  }

  getArticle = ({ match }) => {
    console.log('--- article match', match)
    return <Article id={match.params.id} isOpen key={match.params.id} />
  }

  getCommentList = ({ match }) => {
    return (
      <CommentList
        id={match.params.id}
        isOpen
        key={match.params.id + match.params.pageNum}
        pageNum={parseInt(match.params.pageNum, 10) || 0}
      />
    )
  }
}

export default ArticlesRoute
