import React from "react";
import "./Header.css"

import Container from "react-bootstrap/Container"


class Header extends React.Component {
    render() {
        return (
            <Container fluid={"true"}>
                <a href={"./"} className="header">
                    <span>
                        <h1>{this.props.title}</h1>
                    </span>
                </a>
            </Container>
        );
    }
}

export default Header;