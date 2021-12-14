import { Col, Row } from 'reactstrap';
import Chart from '../../components/chart/Chart';
import { Fragment } from 'react';

const Analytics = () => {
  return (
    <Fragment>
      <Row>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-2'}>
          <Chart height={'150px'} chartId={'61b1bacc-87e0-46bb-8f20-7b6cd13aef3d'} />
          <Chart height={'250px'} chartId={'61b1bacc-87e0-45d4-8468-7b6cd13aef3f'} />
        </Col>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-2'}>
          <Chart height={'400px'} chartId={'61b1bacc-87e0-4e1e-8c22-7b6cd13aef4d'} />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-2'}>
          <Chart height={'500px'} chartId={'61b1bacc-87e0-4a8f-8f1f-7b6cd13aef45'} />
        </Col>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-2'}>
          <Chart height={'500px'} chartId={'61b1bacc-87e0-4a6b-86c3-7b6cd13aef43'} />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-2'}>
          <Chart height={'500px'} chartId={'61b1bacc-87e0-4cfa-895d-7b6cd13aef41'} />
        </Col>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-2'}>
          <Chart height={'500px'} chartId={'61b1bacc-87e0-46fd-8420-7b6cd13aef47'} />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-2'}>
          <Chart height={'500px'} chartId={'61b1bacc-87e0-4404-8882-7b6cd13aef4b'} />
        </Col>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-2'}>
          <Chart height={'500px'} chartId={'61b1bacc-87e0-45e5-860d-7b6cd13aef4f'} />
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-2'}>
          <Chart height={'500px'} chartId={'61b1bacc-87e0-43fa-8f1e-7b6cd13aef49'} />
        </Col>
        <Col lg={6} md={12} sm={12} xs={12} className={'mb-5'}>
          <Chart height={'500px'} chartId={'45833b10-b589-4ece-a74b-edecbd138935'} />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Analytics