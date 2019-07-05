import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

// SignIn in stateful component format, SignUp in stateless functional component format.
const SignUp = () => {
  const initialValues = {
    inputName: '',
    inputEmail: '',
    inputPassword: '',
    inputConfirmPassword: ''
  };

  const signUpValidationSchema = Yup.object().shape({
    inputName: Yup.string()
      .max(40, 'Please enter no more than 40 characters')
      .required('This field is mandatory'),
    inputEmail: Yup.string()
      .email('Please enter a valid email address')
      .required('This field is mandatory'),
    inputPassword: Yup.string()
      .min(8, 'Please enter at least 8 characters')
      .max(20, 'Please enter no more than 20 characters')
      .required('Password is required'),
    inputConfirmPassword: Yup.string()
      .oneOf([Yup.ref('inputPassword'), null], 'Passwords must match')
      .required('Password confirm is required')
  });

  const formikOnSubmit = (values, actions) => {
    actions.setSubmitting(false);
    actions.resetForm(initialValues);
    actions.setStatus({ status: 'comingsoon' });
  };

  const renderForm = formikProps => {
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
        <div className="container">
          <div className="row no-gutters">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="formGroup">
                <label htmlFor="inputName">
                  {'Full Name'}
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    name="inputName"
                    onChange={handleChange}
                    placeholder="Enter full name"
                    value={values.inputName}
                  />
                </label>
                {errors.inputName && touched.inputName ? (
                  <div className="red-text">{errors.inputName}</div>
                ) : null}
              </div>
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
              <div className="formGroup">
                <label htmlFor="inputConfirmPassword">
                  {'Confirm Password'}
                  <input
                    type="password"
                    className="form-control"
                    id="inputConfirmPassword"
                    name="inputConfirmPassword"
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    value={values.inputConfirmPassword}
                  />
                </label>
                {errors.inputConfirmPassword && touched.inputConfirmPassword ? (
                  <div className="red-text">{errors.inputConfirmPassword}</div>
                ) : null}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <button type="submit" disabled={isSubmitting} className="btn btn-dark">
                {isSubmitting ? 'Loading' : 'Sign Up'}
              </button>
              <button
                type="button"
                className="btn btn-white"
                disabled={!dirty}
                onClick={handleReset}
              >
                {'Reset'}
              </button>
              <div>
                {'Already have an account? '}
                <Link to="/signin"> -Sign In- </Link>
              </div>
              <div>
                {'Want to try the game first? '}
                <Link to="/"> -HOME- </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="FlexiHeightContainer">
      <div className="ThemeContainer SignUp">
        <h1>SIGN UP</h1>
        <p>
          {'Register to save your progress.'}
          <br />
          {'The game will trigger autosave after you won a battle or jumped into a new area.'}
        </p>
        <hr />
        <Formik
          initialValues={initialValues}
          validationSchema={signUpValidationSchema}
          onSubmit={formikOnSubmit}
          render={renderForm}
        />
      </div>
    </div>
  );
};

export default withRouter(connect()(SignUp));
