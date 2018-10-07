//HOC === Higher Order Component === decorator
import React from 'react'

export default (OriginalComponent) =>
  class DecoratedComponent extends React.Component {
    state = {
      openItemId: null
    }

    toggleOpenItem = (openItemId) => {
      console.log(openItemId)
      this.setState({
        openItemId: openItemId === this.state.openItemId ? null : openItemId
      })
    }

    render() {
      console.log('accordion rerender')
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          toggleOpenItem={this.toggleOpenItem}
        />
      )
    }
  }
