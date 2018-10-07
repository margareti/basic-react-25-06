import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createCommentSelector } from '../selectors'

function Comment({ comment }) {
  return (
    <div>
      {comment.text} <b>by {comment.user}</b>
    </div>
  )
}

Comment.propTypes = {
  id: PropTypes.string,
  // from connect
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string
  })
}

const initMapStateToProps = () => {
  const commentSelector = createCommentSelector()
  // console.log(commentSelector)

  return (state, ownProps) => ({
    comment: commentSelector(state, ownProps)
  })
}

export default connect(initMapStateToProps)(Comment)
