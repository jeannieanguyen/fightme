import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { templateActions } from 'ducks/template';

let { connectSocket, disconnectSocket, sendMessage } = templateActions; 

class SocketMessages extends Component {
	render(){
		return (
			<div>
				<h2>MESSAGES HERE YO</h2>
			</div>
		);
	}
}

class SocketTestPage extends Component {
	componentWillMount(){
		this.setState({
			socketMessage: ''
		});
	}
	connect(){
		this.props.connectSocket(); 
	}
	disconnect(){
		this.props.disconnectSocket();
	}
	updateSocketMessage(e){
		this.setState({
			socketMessage: e.target.value
		});
	}
	sendMessage(){
		this.props.sendMessage(this.state.socketMessage);
	}
	render(){
		return (
			<div>
				<h1>SOCKET TEST PAGE EY.</h1>
				<div>
					<button className="btn primary-btn"onClick={::this.connect}>CONNECT</button>
				</div>
				<br />
				<div>
					<button className="btn primary-btn"onClick={::this.disconnect}>DISCONNECT</button>
				</div>
				<input 
					type="text" 
					value={this.state.socketMessage} 
					onChange={::this.updateSocketMessage} />
				<button 
					className="btn primary-btn" 
					onClick={::this.sendMessage}> SEND MESSAGE</button>
				<SocketMessages />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {}; 
}

export default connect(mapStateToProps, { connectSocket, disconnectSocket, sendMessage })(SocketTestPage); 