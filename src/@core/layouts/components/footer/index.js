// ** Icons Import
import { ReactComponent as Logo } from '../../../../assets/images/logo/tmdb_blue_long.svg';

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        {new Date().getFullYear()}{' '}
        Semester project
        <span className='d-none d-sm-inline-block'>, Team members: Toma, Eduard, Vaclav</span>
      </span>
      <span className='float-md-right d-none d-md-block'>
        Powered by
        <Logo style={{width: 170, height: 12, marginBottom: 4}}/>
      </span>
    </p>
  )
}

export default Footer
