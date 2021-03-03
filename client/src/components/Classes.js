import React, { Component } from "react";
import { connect } from "react-redux";
import { increment } from "../redux/actions/templateActions";

class Classes extends Component {
  render() {
    return (
      <>
        <h1>Classes</h1>
        <h2>{this.props.count}</h2>
        <button onClick={() => this.props.increment(5)}>Click Me</button>
      </>
    );
  }
}

//count is our props: this.props.count
const mapStateToProps = (state) => {
  return {
    count: state.counter,
  };
};

//increment is a prop: this.props.increment(n)
const mapDispatchToProps = (dispatch) => {
  return {
    //update functions for state
    increment: (n) => dispatch(increment(n)),
  };
};

//two funcs as arguments: mapStateToProps and mapDispatchToProps

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
