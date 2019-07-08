import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import constants from '../constants';
import { setUser } from '../redux/actions';
import { User } from '../redux/reducer';


export interface LoginState {
  login: string,
  password: string,
  isModalOpen: boolean,
}

const classes = {
  '@global': {
    body: {
      backgroundColor: '#ffffff',
    },
  },
  paper: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '1px',
  },
  submit: {
    margin: '3px 0px 2px',
  },
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    width: 400,
    backgroundColor: '#FFFFFF',
    boxShadow: '5px',
    padding: '4px',
    outline: 'none',
  }
};


class Login extends React.Component<any, LoginState> {
  state = {
    login: '',
    password: '',
    isModalOpen: false,
  }

  onClickHandler = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const { login, password } = this.state;
    const { history: { push }, setUser } = this.props;
    if (login === 'Admin' && password === '12345') {
      const user = {
        isAuthorized: true,
        name: login,
      }
      window.localStorage.setItem(constants.USER, JSON.stringify(user));
      setUser(user);
      push('/profile');
    } else {
      this.setState({ isModalOpen: true });
    }
  }

  handleModalClose = (): void => this.setState({ isModalOpen: false })

  onTextChangeHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value }  = e.target;
    if (id === 'login') {
      this.setState({ login: value });
    } else {
      this.setState({ password: value })
    }
  }

  render() {
    const { isModalOpen } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isModalOpen}
        onClose={this.handleModalClose}
      >
        <div style={classes.modal} >
          <Typography variant="h6" id="modal-title">
            Ошибка!!!
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Имя пользователя или пароль введены не верно 
          </Typography>
        </div>
      </Modal>
      <CssBaseline />
      <div style={{
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form style={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="name"
            autoComplete="login"
            autoFocus
            onChange={this.onTextChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onTextChangeHandler}
          />
          <Button
            type="submit"
            onClick={this.onClickHandler}
            fullWidth
            variant="contained"
            color="primary"
            style={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    setUser: (user: User) => dispatch(setUser(user)),
  }),
)(Login);
