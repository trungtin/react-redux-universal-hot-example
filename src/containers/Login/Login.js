import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    this.props.login(email.value, email.password);
    email.value = '';
    password.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title="React Redux Example: Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <input type="text" ref="email" placeholder="Enter your username"/>
            <input type="password" ref="password" placeholder="and password"/>
            <button className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
