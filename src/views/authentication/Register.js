import { Fragment, useState } from 'react';
import { isObjEmpty } from '../../utility/Utils';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import InputPasswordToggle from '../../@core/components/input-password-toggle';
import { Coffee } from 'react-feather';
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, CustomInput, Alert } from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import * as Realm from 'realm-web';
import { getRealmService } from '../../realm-cli';
import { Slide, toast } from 'react-toastify';
import Avatar from '../../@core/components/avatar';
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner';
import { ReactComponent as Logo } from '../../assets/images/logo/logo-secondary.svg';
import IntroScene from '../../components/intro-scene-3d';
import axios from 'axios';

const Register = () => {

  const history = useHistory();
  const realmService = getRealmService();
  const { register, errors, handleSubmit } = useForm({ reValidateMode: 'onBlur' });

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    );
  };

  const ToastContent = ({ name }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>You have successfully logged in. Now you can start to explore. Enjoy!</span>
      </div>
    </Fragment>
  );

  const refreshUserCustomData = async () => {
    await realmService.currentUser.refreshCustomData();
    return realmService.currentUser.customData.userName;
  };

  const onSubmit = async () => {
    if (isObjEmpty(errors)) {
      setLoading(true);

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };

      axios.post('https://data.mongodb-api.com/app/sep6-xsgre/endpoint/validateUserName', {username}, {headers}).then(async response => {
        if (response.data === 'Username available.') {
          try {
            // Create user
            await realmService.emailPasswordAuth.registerUser(email, password);
            // Authenticate user
            await realmService.logIn(Realm.Credentials.emailPassword(email, password));
            // Save profile information
            const mongodb = realmService.currentUser.mongoClient(process.env.REACT_APP_MONGO_CLIENT);
            const collection = mongodb.db(process.env.REACT_APP_MONGODB_DB_NAME).collection('user_profiles');
            await collection.insertOne(
              {
                userID: realmService.currentUser.id,
                userName: username
              }
            )
            //const favourites = ['1213', '1341', '3214'];
            //await collection.updateOne({userID: realmService.currentUser.id}, { $set: { favouriteMovies: favourites } })
            refreshUserCustomData().then(res => {
              setLoading(false);
              history.push('/');
              toast.success(
                <ToastContent name={res} />,
                { transition: Slide, hideProgressBar: true, autoClose: 3000 }
              );
            })
          } catch (err) {
            setLoading(false);
            if (err.statusCode === 409) {
              setError('Email address already registered.');
            } else {
              setError(err.error);
            }
          }
        } else if (response.data === 'Username taken.') {
          setError('Username taken.');
          setLoading(false);
        }
      })
    }
  };

  const handleUsernameChange = e => {
    if (e.target.value.length < 5) {
      setError('Username must contain at least 5 characters.');
    } else if (e.target.value.length >= 5) {
      setError(null);
    }
    setUsername(e.target.value);
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  return (
    <div className='auth-wrapper auth-v2'>
      {loading && (<SpinnerComponent/>)}
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <Logo style={{width: 40.95, height: 28}}/>
          <h2 className='brand-text text-primary ml-1'>Movies App</h2>
        </Link>
        <Col className='d-none d-lg-flex' lg='8' sm='12' style={{paddingLeft: 0, paddingRight: 0}}>
          <IntroScene/>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>
            <CardText className='mb-2'>Register and start exploring new movies and TV shows!</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Username
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={username}
                  id='register-username'
                  name='register-username'
                  onChange={handleUsernameChange}
                  className={classnames({ 'is-invalid': errors['register-username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input
                  type='email'
                  value={email}
                  id='register-email'
                  name='register-email'
                  onChange={handleEmailChange}
                  className={classnames({ 'is-invalid': errors['register-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='register-password'
                  name='register-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['register-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  id='terms'
                  name='terms'
                  value='terms'
                  label={<Terms />}
                  className='custom-control-Primary'
                  innerRef={register({ required: true })}
                  onChange={e => setTerms(e.target.checked)}
                  invalid={errors.terms && true}
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
              <Button.Ripple type='submit' block color='primary'>
                Sign up
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
