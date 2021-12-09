// React
import { Link } from 'react-router-dom';

// 3rd party
import { Button } from 'reactstrap';

// Own
import '@styles/base/pages/page-misc.scss';
import errorImg from '../../assets/images/pages/error-dark.svg';
import { ReactComponent as Logo } from '../../assets/images/logo/logo-secondary.svg';
import {
  HOME,
  ERROR_HEADER,
  ERROR_H_MESSAGE,
  ERROR_P_MESSAGE,
  ERROR_BUTTON_R_MESSAGE,
  ERROR__IMAGE_ALT_MESSAGE
} from '../../@core/assets/Strings';

const Error = () => {
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <Logo style={{width: 40.95, height: 28}}/>
        <h2 className='brand-text text-primary ml-1'>{ERROR_HEADER}</h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>{ERROR_H_MESSAGE}</h2>
          <p className='mb-2'>{ERROR_P_MESSAGE}</p>
          <Button.Ripple tag={Link} to={HOME} color='primary' className='btn-sm-block mb-2'>{ERROR_BUTTON_R_MESSAGE}</Button.Ripple>
          <img className='img-fluid' src={errorImg} alt={ERROR__IMAGE_ALT_MESSAGE} />
        </div>
      </div>
    </div>
  );
};
export default Error;
