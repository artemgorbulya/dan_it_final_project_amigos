import React from 'react';
import PropTypes from "prop-types";
import ErrorPage from '../ErrorPage';

export default class ErrorBoundary extends React.PureComponent {

	state = {
		hasError: false,
	}

	componentDidCatch = (error, errorInfo) => {
		console.log({error, errorInfo});
		this.setState({hasError: true});
	}

	render () {
		return this.state.hasError ? <ErrorPage /> : this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
}