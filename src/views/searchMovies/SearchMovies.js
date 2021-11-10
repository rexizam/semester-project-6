import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'

const SearchMovies = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Search movies view</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>This view will have a search bar and filters on the side</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default SearchMovies
