// ** React Imports
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// ** Custom Components
import Avatar from 'react-avatar';

// ** Utils
import { getRandomColor } from '../../../components/avatar/AvatarUtils';

// ** Store & Actions
import { useDispatch } from 'react-redux';

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { User, Power, Star } from 'react-feather';

// ** Realm-Web
import { getRealmService } from '../../../../realm-cli';
import { Stars } from '@react-three/drei';

const customColors = [
  '#5E005E',
  '#AB2F52',
  '#E55D4A',
  '#E88554',
  '#4194A6',
  '#82CCD9',
  '#FFCC6B',
  '#F2855C',
  '#7D323B'
];

const UserDropdown = () => {
  // ** Get App id from RealmAPI
  const realmService = getRealmService();

  // ** Store Vars
  const dispatch = useDispatch();

  // ** State
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  const toProfilePage = () => {
    history.push('/profile');
  }

  const handleLogOut = async () => {
    await realmService.currentUser.logOut();
    history.push('/login');
  }

  const refreshUserCustomData = async () => {
    await realmService.currentUser.refreshCustomData();
    return realmService.currentUser.customData.userName;
  };

  //** ComponentDidMount
  useEffect(() => {
    if (realmService.currentUser) {
      setUserData(realmService.currentUser.customData.userName);
    }
  }, []);

  const toFavouritesPage = () => {
    history.push('/favourites');
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>{userData}</span>
        </div>
        <Avatar
          name={userData}
          color={getRandomColor(userData, customColors)}
          size={40}
          round={true}
          textSizeRatio={2}
          textMarginRatio={0.30}
        />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to='/profile' onClick={() => toProfilePage()}>
          <User size={14} className='mr-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={() => handleLogOut()}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/favourites' onClick={() => toFavouritesPage()}>
          <Star size={14} className='mr-75' />
          <span className='align-middle'>Favourites</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
