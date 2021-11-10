import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'

const PopularMovies = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Popular movies view</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Popular movies from TMDB will be fetched and displayed here</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default PopularMovies
