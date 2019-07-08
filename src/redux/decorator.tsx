import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { History } from 'history';

export interface HOCProps {
  isAuthorized: boolean,
  history: History,
}

const HOC = ({
  component: Component,
  ...props
}) => {
  const { isAuthorized } = props;
  if (isAuthorized) {
    return <Component {...props} />

  } else {
    return <Redirect to="/login" />

  }
  
}

const ConnectedHOC = connect(
  (state) => (state),
)(HOC);

export default (component: Function) => (props: any) => <ConnectedHOC {...props} component={component} />;