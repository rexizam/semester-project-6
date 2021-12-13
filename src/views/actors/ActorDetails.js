// React
import React, { useEffect, useState } from 'react';

// 3rd Party
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';

// Own
import './ActorDetails.scss';
import { api, base, imageUrlBase } from '../../network/Constants';

const ActorDetails = ({ actorDetails }) => {
  const [actorBio, setActorBio] = useState(null);

  useEffect(async () => {
    if (actorDetails.id) {
      await axios.get(`${base}/person/${actorDetails.id}?api_key=${api}`).then(result => {
        setActorBio(result.data);
      });
    }
  }, []);

  return (
    actorBio && (
      <Card>
        <CardBody>
          <h2 className='font-weight-bolder mb-0 ml-2 mt-2'>{actorBio.name}</h2>
          <div className='d-flex justify-content-between align-items-center'>
            <div className={'ml-2'}>
              <hr/>
              <h4 className='font-weight-bolder mb-0'>Birthday: {actorBio.birthday}</h4>
              <h4 className='font-weight-bolder mb-0'>Status: {actorBio.deathday === null ? 'Alive' : actorBio.deathday}</h4>
              <h4 className='font-weight-bolder mb-0'>Gender: {actorBio.gender === 2 ? 'Male' : 'Female'}</h4>
              <h4 className='font-weight-bolder mb-0'>Homepage: {actorBio.homepage !== '' && actorBio.homepage ? <a href={actorBio.homepage}>{actorBio.homepage}</a> : 'N/A'}</h4>
              <h4 className='font-weight-bolder mb-0'>Id: {actorBio.id ? actorBio.id : 'N/A'}</h4>
              <h4 className='font-weight-bolder mb-0'>Place of birth: {actorBio.place_of_birth !== '' ? actorBio.place_of_birth : 'N/A'}</h4>
              <h4 className='font-weight-bolder mb-0'>Popularity: {actorBio.popularity !== '' ? actorBio.popularity : 'N/A'}</h4>
              <hr/>
              <h5 className='card-text'>{actorBio.biography}</h5>
            </div>
            {actorBio.profile_path && (
              <div className={`avatar p-50 m-0 bg-light-white height-300`}>
                <img src={`${imageUrlBase}${actorBio.profile_path}`} alt={'An image of an actor.'} />
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    )
  );
};

export default ActorDetails;