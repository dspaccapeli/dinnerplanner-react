import React from "react";
import Container from "react-bootstrap/Container";
import Topbar from "../Topbar/Topbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DOMPurify from 'dompurify'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

export default class DinnerPrintout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Topbar model={this.props.model}/>
                <Container className="fill">
                    <Printout model={this.props.model} />
                </Container>
            </React.Fragment>
        );
    }
}

class Printout extends React.Component {
    getAllMenuItems() {
        const menu = this.props.model.getFullMenu();
        let returnTemp = [];
        menu.forEach((entry) => returnTemp.push(<PrintoutItem type={entry.type} description={entry.description} name={entry.name} imgSrc={entry.image}/>))
        return returnTemp;
    }

    render() {
        return (
            <React.Fragment>
                <Col>
                    {this.getAllMenuItems()}
                </Col>
            </React.Fragment>
        );
    }
}

class PrintoutItem extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col md={3} sm={4} className="media_box ver_align" >
                        <div className="media-top padding_5">
                            <img
                                alt={this.props.imgSrc}
                                className="media-object"
                                src={this.props.imgSrc} />
                        </div>
                    </Col>
                    <Col md={3} sm={4} id="dish">
                        <h3>{this.props.name}</h3>
                        <p className="body_text" id="randomText1">
                            Type: &nbsp; {this.props.type}
                        </p>
                    </Col>{" "}
                    <Col md={5}>
                        <h4>Preparation</h4>
                        <div className="body_text" id="randomText2" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.props.description)}}/>
                    </Col>
                </Row>
                <ColoredLine color="grey" />
            </React.Fragment>
        );
    }
}