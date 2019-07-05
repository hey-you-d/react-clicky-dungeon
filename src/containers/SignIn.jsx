import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

// SignIn in stateful component format, SignUp in stateless functional component format.
class SignIn extends Component {
  static renderForm(formikProps) {
    /* eslint react/prop-types: 0 */
    const {
      handleSubmit,
      handleChange,
      handleReset,
      isSubmitting,
      values,
      errors,
      touched,
      dirty,
      status
    } = formikProps;

    return (
      <form onSubmit={handleSubmit}>
        {status !== undefined && status.status === 'comingsoon' ? (
          <div className="alert alert-success" role="alert">
            {'Coming Soon! POST request to backend.'}
          </div>
        ) : null}
        <div className="formGroup">
          <label htmlFor="inputEmail">
            {'Email address'}
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="inputEmail"
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={values.inputEmail}
            />
          </label>
          <small id="emailHelp" className="form-text text-mute">
            {'We will never share your email with anyone else.'}
          </small>
          {errors.inputEmail && touched.inputEmail ? (
            <div className="red-text">{errors.inputEmail}</div>
          ) : null}
        </div>
        <div className="formGroup">
          <label htmlFor="inputPassword">
            {'Password'}
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="inputPassword"
              onChange={handleChange}
              placeholder="Password"
              value={values.inputPassword}
            />
          </label>
          {errors.inputPassword && touched.inputPassword ? (
            <div className="red-text">{errors.inputPassword}</div>
          ) : null}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-dark">
          {isSubmitting ? 'Loading' : 'Sign Up'}
        </button>
        <button type="button" className="btn btn-white" disabled={!dirty} onClick={handleReset}>
          {'Reset'}
        </button>
      </form>
    );
  }

  constructor(props) {
    super(props);

    this.initialValues = {
      inputEmail: '',
      inputPassword: ''
    };

    this.signInValidationSchema = Yup.object().shape({
      inputEmail: Yup.string()
        .email('Please enter a valid email address')
        .required('This field is mandatory'),
      inputPassword: Yup.string().required('This field is mandatory')
    });
  }

  formikOnSubmit(values, actions) {
    actions.setSubmitting(false);
    actions.resetForm(this.initialValues);
    actions.setStatus({ status: 'comingsoon' });
  }

  render() {
    return (
      <div className="FlexiHeightContainer">
        <div className="ThemeContainer SignIn">
          <h1>SIGN IN</h1>
          <p>Login to continue from your most recent progress</p>
          <hr />
          <Formik
            initialValues={this.initialValues}
            validationSchema={this.signInValidationSchema}
            onSubmit={this.formikOnSubmit}
            render={formikProps => SignIn.renderForm(formikProps)}
          />
          <div>
            {"Don't have an account? "}
            <Link to="/signup"> -Sign Up- </Link>
          </div>
          <div>
            {'Want to try the game first? '}
            <Link to="/"> -HOME- </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(SignIn));
