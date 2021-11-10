import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'

const FeaturedMovies = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Featured movies view</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Featured movies from TMDB will be fetched and displayed here</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default FeaturedMovies
