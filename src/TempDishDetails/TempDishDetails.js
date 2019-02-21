import React from 'react';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router'


class TempDishDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div id="dishDetails">DISH DETAILS for {this.props.match.params.id}</div>
                <div id="ingredients">INGREDIENTS</div>
                <Button variant="info" id="search_button">
                    Add to menu
                </Button>
                <Link to="/search">
                    <Button variant="info" id="search_button">
                        Back to search
                    </Button>
                </Link>
            </div>
        );
    }
}

export default withRouter(TempDishDetails);