import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';

const Profile = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Profile view</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>We can display some analytics / statistics for movies here with Apex charts or Echart</CardText>
        </CardBody>
      </Card>
    </div>
  )
};

export default Profile;