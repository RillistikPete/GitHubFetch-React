// Write JavaScript here and press Ctrl+Enter to execute

// const Button = function (props) {
//   	return (
//     <button>5</button>
//     );
//   };
  
class Button extends React.Component {
		
    handleClick = () => {
				this.props.onClickFunction(this.props.incrementValue);
    };
    
    render() {
        return (
          <button onClick={this.handleClick}>
							+{this.props.incrementValue}
          </button>
        );
      }
 }
  const Result = (props) => {
  	return (
    	<div>{props.counter}</div>
      );
  }
  
  class App extends React.Component {
  state = {counter:10};
  
  moveUp = (incrementValue) => {
    	this.setState((prevState) => ({
        	counter: prevState.counter + incrementValue
        }));
  	};
  
  	render() {
    	return (
      		<div>
          	<Button incrementValue={1} onClickFunction={this.moveUp} />
            <Button incrementValue={5} onClickFunction={this.moveUp} />
            <Result counter={this.state.counter}/>
          </div>
      );
    }
  }
  ReactDOM.render(<App />, mountNode);
  