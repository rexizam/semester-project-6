// ** Reactstrap Imports
import { Button, ButtonGroup, Row, Col, CardText } from 'reactstrap';

const ToggleSwitchButton = ({ rSelected, setRSelected }) => {

  return (
    <>
      <Row>
        <Col>
          <CardText className={'font-medium-3 text-center mb-1'}>Search by</CardText>
        </Col>
      </Row>
      <Row>
        <Col className={'d-flex justify-content-center align-items-center'}>
          <ButtonGroup className='mb-2'>
            <Button color='primary' onClick={() => setRSelected('movieName')} active={rSelected === 'movieName'} outline>
              Movie Name
            </Button>
            <Button color='primary' onClick={() => setRSelected('movieGenre')} active={rSelected === 'movieGenre'} outline>
              Movie Genre
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </>
  )
}

export default ToggleSwitchButton