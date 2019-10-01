import React from 'react'
import { Button, Input } from 'semantic-ui-react';
import { Visible, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';

const searchBook = ({ onSearchEvent, isbn, onClickEvent, onIsbnChange }) => {
  return (
    <Row align="center">
      <Col align="center" xs={12} sm={6} md={5}>
        <Input type="number" fluid
          value={isbn} onChange={(event) => onIsbnChange(event)} placeholder="Add book through ISBN" />
      </Col>
      <Visible xs> <br /> <br /> <br /> </Visible>
      <Col align="center" xs={12} sm={6} md={7}>
        <Button.Group>
          <Button positive  disabled={!isbn} onClick={() => onSearchEvent()}>Search ISBN</Button>
          <Button.Or />
          <Button primary disabled={!isbn} onClick={() => onClickEvent()}>Add Manually</Button>
        </Button.Group>
      </Col>
    </Row>)
}
searchBook.propTypes = {
  onSearchEvent: PropTypes.func,
  isbn:PropTypes.string,
  onClickEvent: PropTypes.func,
  onIsbnChange: PropTypes.func,
}

export default searchBook;