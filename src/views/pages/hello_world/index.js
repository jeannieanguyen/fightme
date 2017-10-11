import React, { Component } from 'react';
import { errorHandlingDecorator } from 'views/enhancers/index';

@errorHandlingDecorator()
class HelloWorldPage extends Component {

	render() {

		return (
			<h1>here is my home page</h1>
		);
	}

}

export default HelloWorldPage;
