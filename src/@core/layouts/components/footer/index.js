// ** Icons Import
import { ReactComponent as TMDbLogo } from '../../../../assets/images/logo/tmdb_blue_long.svg';
import { ReactComponent as MongoDBLogo } from '../../../../assets/images/logo/MongoDB_Logo.svg';
import { ReactComponent as RealmLogo } from '../../../../assets/images/logo/realmio.svg';

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        2021 SEP6
      </span>
      <span className='float-md-right d-none d-md-block'>
        <MongoDBLogo style={{width: 100}} />
      </span>
      <span className='float-md-right d-none d-md-block'>
        <RealmLogo style={{width: 100}} />
      </span>
      <span className='float-md-right d-none d-md-block'>
        <TMDbLogo style={{width: 150}} />
      </span>
    </p>
  )
}

export default Footer
