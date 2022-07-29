import classnames from 'classnames';
import Avatar from '../../@core/components/avatar';
import { Card, CardBody } from 'reactstrap';
import './profiles.scss';
import placeholder from '../../assets/images/icons/profile-placeholder.png';
import { Link } from 'react-router-dom';

const Profiles = ({ data, profileType }) => {

  const renderProfiles = () => {
    return data?.map((profile, index) => {
      return (
        <Link to={`/personDetails/${profile.id}`} key={index}>
          <div className={classnames('d-flex justify-content-start align-items-center', { 'mb-1': index !== data.length - 1 })}>
            <Avatar
              className='mr-1'
              img={profile.profile_path ? `https://image.tmdb.org/t/p/w185/${profile.profile_path}` : placeholder}
              imgHeight={70}
              imgWidth={70}
              imgClassName={'profileImg'}
            />
            <div className='profile-user-info'>
              <h6 className='mb-0 text-break'>{profile.name}</h6>
              {profile.character && (
                <small className='text-muted'>As {profile.character}</small>
              )}
            </div>
          </div>
        </Link>
      )
    })
  }

  return (
    <>
      {data?.length > 0 && (
        <Card>
          <CardBody className='profile-suggestion'>
            <h5 className='mb-2'>{profileType}</h5>
            {renderProfiles()}
          </CardBody>
        </Card>
      )}
    </>
  )
}

export default Profiles