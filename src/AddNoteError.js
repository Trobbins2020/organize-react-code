import React, { Component } from "react";
import PropTypes from "prop-types";
class AddNoteError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>There is some Error in Component, We are working on a Fix</h2>;
    }
    return this.props.children;
  }
}
AddNoteError.propTypes = {
  children: PropTypes.array.isRequired,
};

export default AddNoteError;
