import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { addCommentRequest } from '../../ac'
import { connect } from 'react-redux'
import './style.css'

class CommentForm extends Component {
  static propTypes = {
    articleId: PropTypes.string
  }

  state = {}

  componentDidMount() {
    // console.log(this.props);
    this.setState({
      articleId: this.props.articleId
    })
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.sendComment}>
        <input
          type="text"
          placeholder="Your name"
          name="user"
          onChange={this.handleChange}
        />
        <textarea
          placeholder="Comment body..."
          name="text"
          onChange={this.handleChange}
        />

        <button type="submit">Submit comment</button>
      </form>
    )
  }

  handleChange = (ev) => {
    ev.preventDefault()
    const update = {}
    update[ev.target.name] = ev.target.value

    this.setState(update)
  }

  sendComment = (ev) => {
    ev.preventDefault()
    if (
      this.state.user &&
      this.state.text &&
      this.state.user.length > 3 &&
      this.state.text.length > 3
    ) {
      this.props.addCommentRequest(this.state)
    }
  }
}

//dispatch ADD_COMMENT event with the payload

export default connect(
  null,
  { addCommentRequest }
)(CommentForm)
