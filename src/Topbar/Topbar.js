import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

export default class Topbar extends React.Component {
    render() {
        return (
            <Container className="fill" fluid="true">
                <TopbarView model={this.props.model}/>
            </Container>
        );
    }
}

class TopbarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col id="numOfPeople">
                        <h3>My Dinner: &nbsp; {this.props.model.getNumberOfGuests()} people</h3>
                    </Col>
                    <Col />
                    <Col />
                    <Col className="">
                        <Link to={"/search"}>
                            <Button
                                id="backToEdit"
                                variant="info">
                                Go back and edit dinner
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <ColoredLine color="grey" />
            </React.Fragment>
        );
    }
}