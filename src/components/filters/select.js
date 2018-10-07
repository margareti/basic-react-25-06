import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { connect } from 'react-redux'
import { changeSelection } from '../../ac'
import { articleListSelector, filtersSelector } from '../../selectors'

class SelectFilter extends Component {
  static propTypes = {
    // articles: PropTypes.array.isRequired
  }

  handleChange = (selected) => {
    this.props.changeSelection(selected)
  }

  get options() {
    return Object.keys(this.props.articles).map((articleId) => {
      const article = this.props.articles[articleId]
      return {
        label: article.title,
        value: article.id
      }
    })
  }

  render() {
    return (
      <Select
        options={this.options}
        value={this.props.selected}
        onChange={this.handleChange}
        isMulti
      />
    )
  }
}

export default connect(
  (state) => ({
    selected: filtersSelector(state).selected,
    articles: articleListSelector(state)
  }),
  { changeSelection }
)(SelectFilter)
