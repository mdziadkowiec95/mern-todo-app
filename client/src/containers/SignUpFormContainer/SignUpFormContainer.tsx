import React, { Component } from 'react';
import TextField from '../../components/atoms/TextField/TextField';
import Button from '../../components/atoms/Button/Button';
import styles from './SignUpFormContainer.module.scss';

type SignUpFormProps = {};

type SignUpFormState = {
  userEmail: string;
  userName: string;
  password: string;
  passwordConfirm: string;
};

class SignUpFormContainer extends Component<SignUpFormProps, SignUpFormState> {
  state: SignUpFormState = {
    userName: '',
    userEmail: '',
    password: '',
    passwordConfirm: ''
  };

  handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    this.setState(
      {
        ...this.state,
        [name]: value
      },
      () => console.log(this.state)
    );
  };

  render() {
    const { userName, userEmail, password, passwordConfirm } = this.state;

    return (
      <>
        <TextField
          isFlex
          onChangeFn={this.handleFieldChange}
          inputValue={userName}
          name="userName"
          placeholder="Your name"
        />
        <form className={styles.wrapper}>
          <TextField
            isSolid
            onChangeFn={this.handleFieldChange}
            inputValue={userName}
            name="userName"
            placeholder="Your name"
          />
          <TextField
            isSolid
            onChangeFn={this.handleFieldChange}
            inputValue={userEmail}
            name="userEmail"
            placeholder="Your email"
          />
          <TextField
            isSolid
            onChangeFn={this.handleFieldChange}
            inputValue={password}
            name="password"
            placeholder="Password"
          />
          <TextField
            isSolid
            onChangeFn={this.handleFieldChange}
            inputValue={passwordConfirm}
            name="passwordConfirm"
            placeholder="Confirm Password"
          />
          <Button isBlock primary>
            Sign Up
          </Button>
        </form>
      </>
    );
  }
}

export default SignUpFormContainer;
