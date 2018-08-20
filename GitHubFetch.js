const Card = (props) => {
	return (
  	<div>
    	<img style={{width: '75px', height: '75px'}} src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
      	<div style={{fontSize: '1.5em', fontWeight: 'bold'}}>
        	{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};


const CardList = (props) => {
	return (
  	<div>
    	{props.cards.map(card => <Card {...card} />)}
    </div>
  );
}

class Form extends React.Component {
	state = { userName: ''}
	handleSubmit = (event) => {
  	event.preventDefault(); //without this, form will refresh page and lose code
    console.log('Event: Form Submit', this.state.userName);
    //AJAX (fetch or axios)
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then(resp => {
    		this.props.onSubmit(resp.data);
        this.setState({ userName: ''});
    });
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
      	<input
        		type="text"
        		//THIS IS ONE WAY:  ref={(input) => this.userNameInput = input}
            value={this.state.userName}
            onChange={(event) => this.setState({ userName: event.target.value })}
        		placeholder="Github Username" required />
        <button type="submit">Add Card</button>
      </form>
    );
  }
}

//PARENT COMPONENT
class App extends React.Component {
//TO ALLOW BOTH THE FORM AND CARDLIST COMPONENTS TO ACCESS THE DATA ARRAY, MUST PUT IT IN STATE-OF
//

	state = {
  	cards: []
  };
  
  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }));
  };
  
  render() {
      return (
      	<div>
        	<Form onSubmit={this.addNewCard}/>
          <CardList cards={this.state.cards} />
        </div>
      );
    }
}


ReactDOM.render(<App />, mountNode);