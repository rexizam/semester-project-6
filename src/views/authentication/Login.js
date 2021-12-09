// React
import {useState, Fragment} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useHistory} from 'react-router-dom';

// 3rd party
import classnames from 'classnames';
import {toast, Slide} from 'react-toastify';
import {Coffee} from 'react-feather';
import * as Realm from 'realm-web';
import {
    Alert,
    Row,
    Col,
    CardTitle,
    CardText,
    Form,
    Input,
    FormGroup,
    Label,
    CustomInput,
    Button,
} from 'reactstrap';

// Own
import '@styles/base/pages/page-auth.scss';
import {isObjEmpty} from '../../utility/Utils';
import {getRealmService} from '../../realm-cli';
import IntroScene from '../../components/intro-scene-3d';
import Avatar from '../../@core/components/avatar';
import InputPasswordToggle from '../../@core/components/input-password-toggle';
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner';
import {ReactComponent as Logo} from '../../assets/images/logo/logo-secondary.svg';

const ToastContent = ({name}) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Coffee size={12}/>}/>
                <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span>You have successfully logged in. Now you can start to explore. Enjoy!</span>
        </div>
    </Fragment>
);

const Login = props => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

  const { register, errors, handleSubmit } = useForm({ reValidateMode: 'onBlur' });

    const onSubmit = async () => {
        if (isObjEmpty(errors)) {
            setLoading(true);
            const realmService = getRealmService();
            const credentials = Realm.Credentials.emailPassword(email, password);

            try {
                await realmService.logIn(credentials, true);
                setLoading(false);
                history.push('/');
                toast.success(
                    <ToastContent name={realmService.currentUser.customData.userName}/>,
                    {transition: Slide, hideProgressBar: true, autoClose: 3000}
                );
            } catch (err) {
                setLoading(false);
                setError(err.error);
            }
        }
    };

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
                            Welcome! 👋
                        </CardTitle>
                        <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
                        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
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
                            <FormGroup>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='login-password'>
                                        Password
                                    </Label>
                                    <Link to='/forgot-password'>
                                        <small>Forgot Password?</small>
                                    </Link>
                                </div>
                                <InputPasswordToggle
                                    value={password}
                                    id='login-password'
                                    name='login-password'
                                    className='input-group-merge'
                                    onChange={e => setPassword(e.target.value)}
                                    className={classnames({'is-invalid': errors['login-password']})}
                                    innerRef={register({required: true, validate: value => value !== ''})}
                                />
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me'/>
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
                            <Button.Ripple type='submit' color='primary' block>
                                Sign in
                            </Button.Ripple>
                        </Form>
                        <p className='text-center mt-2'>
                            <span className='mr-25'>New on our platform?</span>
                            <Link to='/register'>
                                <span>Create an account</span>
                            </Link>
                        </p>
                    </Col>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
