// React
import { Link, useHistory } from 'react-router-dom';

// 3rd party
import { ChevronLeft } from 'react-feather';
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Button, Alert } from 'reactstrap';
import { useState } from 'react';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
// Own
import '@styles/base/pages/page-auth.scss';
import InputPassword from '../../@core/components/input-password-toggle';
import { ReactComponent as Logo } from '../../assets/images/logo/logo-secondary.svg';
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner';
import { isObjEmpty } from '../../utility/Utils';
import { getRealmService } from '../../realm-cli';
import {
  LOGIN,
  RESET_PASSWORD_HEADER,
  RESET_PASSWORD_CARD_TEXT,
  RESET_PASSWORD_SPAN_LABEL,
  RESET_PASSWORD_CARD_TITLE,
  RESET_PASSWORD_BUTTON_R_MESSAGE,
  RESET_PASSWORD_NEW_PASSWORD_LABEL,
  RESET_PASSWORD_CONFIRM_PASSWORD_LABEL
} from '../../@core/assets/Strings';

const ResetPasswordV1 = () => {

  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { register, errors, handleSubmit } = useForm({ reValidateMode: 'onBlur' });

  // ** Get App id from RealmAPI
  const realmService = getRealmService();
  const history = useHistory();

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const tokenId = params.get('tokenId');

  const redirectToLogIn = () => {
    setTimeout(() => {
      history.push('/login');
    }, 5000)
  }

  const onPasswordReset = async () => {
    setLoading(true);
    if (isObjEmpty(errors)) {
      if (token && tokenId) {
        try {
          await realmService.emailPasswordAuth.resetPassword({ password, token, tokenId });
          setInfoMessage('Your password was successfully changed. You may now log in with your new password.');
          setLoading(false);
          redirectToLogIn();
        } catch (error) {
          setError(error.error);
          setLoading(false);
        }
      } else {
        setError('You can only reset your password if you followed the password reset confirmation link sent to your email.');
        setLoading(false);
      }
    }
  };

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      {loading && (<SpinnerComponent />)}
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <Logo style={{width: 40.95, height: 28}}/>
              <h2 className='brand-text text-primary ml-1'>{RESET_PASSWORD_HEADER}</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>{RESET_PASSWORD_CARD_TITLE}</CardTitle>
            <CardText className='mb-2'>{RESET_PASSWORD_CARD_TEXT}</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit(onPasswordReset)}>
              <FormGroup>
                <Label className='form-label' for='new-password'>
                  {RESET_PASSWORD_NEW_PASSWORD_LABEL}
                </Label>
                <InputPassword
                  className='input-group-merge'
                  id='new-password'
                  name='new-password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['new-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                  autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirm-password'>
                  {RESET_PASSWORD_CONFIRM_PASSWORD_LABEL}
                </Label>
                <InputPassword
                  className='input-group-merge'
                  id='confirm-password'
                  name='new-password-confirm'
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                  className={classnames({ 'is-invalid': errors['new-password-confirm'] })}
                  innerRef={register({ required: true, validate: value => value === password })} />
              </FormGroup>
              {error ? (
                <Alert color='danger'>
                  <div className='alert-body font-small-2 text-center'>
                    <p>
                      <small className='mr-50'>
                        <span className='font-weight-bold'>{error}</span>
                      </small>
                    </p>
                  </div>
                </Alert>
              ) : null}
              {infoMessage ? (
                <Alert color='success'>
                  <div className='alert-body font-small-2 text-center'>
                    <p>
                      <small className='mr-50'>
                        <span className='font-weight-bold'>{infoMessage}</span>
                      </small>
                    </p>
                  </div>
                </Alert>
              ) : null}
              <Button.Ripple type='submit' color='primary' block>
                {RESET_PASSWORD_BUTTON_R_MESSAGE}
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <Link to={LOGIN}>
                <ChevronLeft className='mr-25' size={14} />
                <span className='align-middle'>{RESET_PASSWORD_SPAN_LABEL}</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordV1;