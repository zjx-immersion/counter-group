import React, { Component } from "react";
import Counter from "./Counter";
import { connect } from "react-redux";

class CounterGroup extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch({
      type: "GENERATE_COUNTERS",
      payload: parseInt(this.props.defaultCount)
    });
  }

  regenrateCounters = () => {
    this.props.dispatch({
      type: "GENERATE_COUNTERS",
      payload: parseInt(this.refs.countInput.value)
    });
  };

  counterUpdateCallback = changedNum => {
    // this.setState({ counterSum: this.state.counterSum + changedNum });
    this.props.dispatch({
      //this dispatch will wuto inject by connect() method
      type: "COUNTERSUM",
      payload: changedNum
    }); //{type: "", payload: xxx} named action, it will bo translated to ./reducer
  };

  increaseNumber = (changedNum, id) => {
    this.props.dispatch({
      type: "INCREASE_ONE_COUNTER",
      payload: { changedNum, id }
    });
  };

  decreaseNumber = (changedNum, id) => {
    this.props.dispatch({
      type: "DECREASE_ONE_COUNTER",
      payload: { changedNum, id }
    });
  };

  render() {
    console.log(this.props.counterItems);
    return (
      <div>
        {this.props.counterItems.map(counterItem => (
          <Counter
            key={counterItem.id}
            id={counterItem.id}
            countValue={counterItem.count}
            onCounterValueChanged={this.counterUpdateCallback}
            onClickIncreased={this.increaseNumber}
            onClickDecreased={this.decreaseNumber}
          />
        ))}
        <input type="text" ref="countInput" />
        <button onClick={this.regenrateCounters}>
          Regenerate indicated Counters
        </button>
        <br />
        <span>总和：{this.props.counterSum}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counterSum: state.counterSum,
  counterItems: state.counterItems
});
// counterSum is a prop in CounterGroup, it will give counterSum a new value of state.counterSum whitch come from ./reducer switch return
// you try to imagine counterSum will be passed to this.props.counterSum in CounterGroup like the result of <CounterGroup counterSum={state.counterSum}/>

export default connect(mapStateToProps)(CounterGroup); //let CounterGroup and Redux know each other
