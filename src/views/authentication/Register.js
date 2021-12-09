// React
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

// 3rd party
import * as Realm from 'realm-web';
import classnames from 'classnames';
import { Coffee } from 'react-feather';
import axios from 'axios';
import {
  Row,
  Col,
  Form,
  Input,
  Alert,
  Label,
  Button,
  CardText,
  CardTitle,
  FormGroup,
  CustomInput
} from 'reactstrap';
import { Slide, toast } from 'react-toastify';

// Own


// Own
import '@styles/base/pages/page-auth.scss';
import { isObjEmpty } from '../../utility/Utils';
import Avatar from '../../@core/components/avatar';
import InputPasswordToggle from '../../@core/components/input-password-toggle';
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner';
import { getRealmService } from '../../realm-cli';
import { ReactComponent as Logo } from '../../assets/images/logo/logo-secondary.svg';
import IntroScene from '../../components/intro-scene-3d';
import { EMPTY_STRING, HOME, LOGIN, REGISTER_CARD_TEXT, REGISTER_CARD_TITLE, REGISTER_FORM_BUTTON_R_MESSAGE, REGISTER_FORM_EMAIL_LABEL, REGISTER_FORM_PASSWORD_LABEL, REGISTER_FORM_USERNAME_LABEL, REGISTER_HEADER, REGISTER_P_S_B_LABEL, REGISTER_P_S_TOP_LABEL, REGISTER_PARAGRAPH_SPAN_TOP_LABEL, REGISTER_TERMS_ANCHOR, REGISTER_TERMS_BASE, REGISTER_TOAST_BODY_MESSAGE, REGISTER_TOAST_GREETING } from '../../@core/assets/Strings';

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
        {REGISTER_TERMS_BASE}
        <a className='ml-25' href={HOME} onClick={e => e.preventDefault()}>{REGISTER_TERMS_ANCHOR}</a>
      </Fragment>
    );
  };

  const ToastContent = ({ name }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          <h6 className='toast-title font-weight-bold'>{REGISTER_TOAST_GREETING} {name}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>{REGISTER_TOAST_BODY_MESSAGE}</span>
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
              history.push(HOME);
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
          <h2 className='brand-text text-primary ml-1'>{REGISTER_HEADER}</h2>
        </Link>
        <Col className='d-none d-lg-flex' lg='8' sm='12' style={{paddingLeft: 0, paddingRight: 0}}>
          <IntroScene/>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>{REGISTER_CARD_TITLE}</CardTitle>
            <CardText className='mb-2'>{REGISTER_CARD_TEXT}</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  {REGISTER_FORM_USERNAME_LABEL}
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
                  {REGISTER_FORM_EMAIL_LABEL}
                </Label>
                <Input
                  type='email'
                  value={email}
                  id='register-email'
                  name='register-email'
                  onChange={handleEmailChange}
                  className={classnames({ 'is-invalid': errors['register-email'] })}
                  innerRef={register({ required: true, validate: value => value !== EMPTY_STRING })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  {REGISTER_FORM_PASSWORD_LABEL}
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='register-password'
                  name='register-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['register-password'] })}
                  innerRef={register({ required: true, validate: value => value !== EMPTY_STRING })}
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
              <Button.Ripple type='submit' block color='primary'>{REGISTER_FORM_BUTTON_R_MESSAGE}</Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>{REGISTER_P_S_TOP_LABEL}</span>
              <Link to={LOGIN}>
                <span>{REGISTER_P_S_B_LABEL}</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;