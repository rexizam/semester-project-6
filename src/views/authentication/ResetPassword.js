// React
import { Link } from 'react-router-dom';

// 3rd party
import { ChevronLeft } from 'react-feather';
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Button } from 'reactstrap';

// Own
import '@styles/base/pages/page-auth.scss';
import InputPassword from '../../@core/components/input-password-toggle';
import { ReactComponent as Logo } from '../../assets/images/logo/logo-secondary.svg';
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
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <Logo style={{width: 40.95, height: 28}}/>
              <h2 className='brand-text text-primary ml-1'>{RESET_PASSWORD_HEADER}</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>{RESET_PASSWORD_CARD_TITLE}</CardTitle>
            <CardText className='mb-2'>{RESET_PASSWORD_CARD_TEXT}</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Label className='form-label' for='new-password'>{RESET_PASSWORD_NEW_PASSWORD_LABEL}</Label>
                <InputPassword className='input-group-merge' id='new-password' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirm-password'>{RESET_PASSWORD_CONFIRM_PASSWORD_LABEL}</Label>
                <InputPassword className='input-group-merge' id='confirm-password' />
              </FormGroup>
              <Button.Ripple color='primary' block>{RESET_PASSWORD_BUTTON_R_MESSAGE}</Button.Ripple>
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
