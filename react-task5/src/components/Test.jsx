import { Component } from "react";

class TimerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().toLocaleTimeString(),
      countdown: 0,
      countdownInput: "",
      isCountingDown: false,
      isCountingUp: false,
      elapsedTime: 0,
      elapsedTimes: [],
    };
    this.timerID = null;
    this.countdownInterval = null;
  }

  componentDidMount() {
    console.log("componentDidMount +");
    this.timerID = setInterval(() => this.updateCurrentTime(), 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate +");
    if (this.state.countdown === 0 && prevState.countdown !== 0) {
      clearInterval(this.countdownInterval);
      this.startCountingUp();
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount +");
    clearInterval(this.timerID);
    clearInterval(this.countdownInterval);
  }

  updateCurrentTime = () => {
    this.setState({
      currentTime: new Date().toLocaleTimeString(),
    });
  };

  handleInputChange = (event) => {
    this.setState({
      countdownInput: event.target.value,
    });
  };

  startCountdown = () => {
    const countdown = parseInt(this.state.countdownInput, 10);
    if (!isNaN(countdown) && countdown > 0) {
      this.setState({ countdown, isCountingDown: true, elapsedTime: 0 }, () => {
        this.countdownInterval = setInterval(() => {
          this.setState(
            (prevState) => ({
              countdown: prevState.countdown - 1,
            }),
            () => {
              if (this.state.countdown === 0) {
                clearInterval(this.countdownInterval);
                this.setState({ isCountingDown: false });
                this.startCountingUp();
              }
            }
          );
        }, 1000);
      });
    }
  };

  startCountingUp = () => {
    this.setState({ isCountingUp: true, elapsedTime: 0 });
    this.countdownInterval = setInterval(() => {
      this.setState((prevState) => ({
        elapsedTime: prevState.elapsedTime + 1,
      }));
    }, 1000);
  };

  stopCountdown = () => {
    this.setState((prevState) => ({
      elapsedTimes: [...prevState.elapsedTimes, prevState.elapsedTime],
    }));
  };

  resetCountdown = () => {
    clearInterval(this.countdownInterval);
    this.setState({
      countdown: 0,
      countdownInput: "",
      isCountingDown: false,
      isCountingUp: false,
      elapsedTime: 0,
      elapsedTimes: [],
    });
  };

  render() {
    return (
      <div>
        <h1>Current Time: {this.state.currentTime}</h1>
        <div>
          <input
            type="number"
            value={this.state.countdownInput}
            onChange={this.handleInputChange}
            placeholder="Write the countdown second"
          />
          <button onClick={this.startCountdown}>Start Countdown</button>
          <button onClick={this.startCountingUp}>Start Counting Up</button>
          <button onClick={this.stopCountdown}>Stop</button>
          <button onClick={this.resetCountdown}>Reset</button>
        </div>
        <h2>
          Countdown:{" "}
          {this.state.countdown > 0
            ? this.state.countdown
            : "Countdown is over!"}
        </h2>
        <h2>
          {this.state.isCountingUp
            ? `Counting Up: ${this.state.elapsedTime} seconds`
            : this.state.elapsedTime > 0
            ? `Elapsed Time: ${this.state.elapsedTime} seconds`
            : ""}
        </h2>
        <div>
          <h3>Elapsed Times:</h3>
          <ul>
            {this.state.elapsedTimes.map((time, index) => (
              <li key={index}>
                Elapsed Time {index + 1}: {time} seconds
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TimerApp;
