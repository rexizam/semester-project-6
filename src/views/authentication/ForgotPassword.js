import { useSkin } from '../../utility/hooks/useSkin';
import { ChevronLeft } from 'react-feather';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import { getRealmService } from '../../realm-cli';
import { ReactComponent as Logo } from '../../assets/images/logo/logo-secondary.svg';
import classnames from 'classnames';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isObjEmpty } from '../../utility/Utils';
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner';

const ForgotPassword = () => {

  // ** Get App id from RealmAPI
  const realmService = getRealmService();

  const [skin, setSkin] = useSkin();
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [infoMessage, setInfoMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm({ reValidateMode: 'onBlur' });

  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const handlePasswordReset = async () => {
    setLoading(true);
    if (isObjEmpty(errors)) {
      try {
        await realmService.emailPasswordAuth.sendResetPasswordEmail({email});
        setInfoMessage('We have sent a password reset link to the specified email. You may now close the page.')
        setLoading(false);
      } catch (error) {
        setError(error.error);
        setLoading(false);
      }
    }
  }

  if (!realmService.currentUser) {
    return (
      <div className='auth-wrapper auth-v2'>
        {loading && (<SpinnerComponent/>)}
        <Row className='auth-inner m-0'>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            <Logo style={{width: 40.95, height: 28}}/>
            <h2 className='brand-text text-primary ml-1'>Movies App</h2>
          </Link>
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={source} alt='Login V2' />
            </div>
          </Col>
          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <CardTitle tag='h2' className='font-weight-bold mb-1'>
                Forgot Password? 🔒
              </CardTitle>
              <CardText className='mb-2'>
                Enter your email and we'll send you instructions to reset your password
              </CardText>
              <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(handlePasswordReset)}>
                <FormGroup>
                  <Label className='form-label' for='login-email'>
                    Email
                  </Label>
                  <Input
                    autoFocus
                    type='email'
                    value={email}
                    id='login-email'
                    name='login-email'
                    onChange={e => setEmail(e.target.value)}
                    className={classnames({'is-invalid': errors['login-email']})}
                    innerRef={register({required: true, validate: value => value !== ''})}
                  />
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
                  Send reset link
                </Button.Ripple>
              </Form>
              <p className='text-center mt-2'>
                <Link to='/login'>
                  <ChevronLeft className='mr-25' size={14} />
                  <span className='align-middle'>Back to login</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default ForgotPassword;
