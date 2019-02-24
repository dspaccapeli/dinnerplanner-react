import React from "react"
import "./DishDetails.css";
import modelInstance from "../data/DinnerModel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Sidebar from "../Sidebar/Sidebar";
import Container from "react-bootstrap/Container";
import DOMPurify from 'dompurify'
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

class DishDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "LOADING",
            numberOfGuests: modelInstance.getNumberOfGuests(),
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        modelInstance
            .getDish (this.state.id)
            .then(thisDish => {
                this.setState({
                    status: "LOADED",
                    dish: thisDish
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
        modelInstance.addObserver(this);
    }

    componentWillUnmount() {
        modelInstance.removeObserver(this);
    }

    update() {
        this.setState({
            numberOfGuests: modelInstance.getNumberOfGuests()
        });
    }

    render() {
        let dishDetails = null;

        // depending on the state we either generate
        // useful message to the user or show the list
        // of returned dishes
        switch (this.state.status) {
            case "LOADING":
                dishDetails = <em>Loading...</em>;
                break;
            case "LOADED":
                dishDetails = (
                    <Row>
                        <Col md={3}>
                            <Sidebar model={this.props.model} />                            </Col>
                        <Col md={4}>
                            <DishDescription dish={this.state.dish}/>
                        </Col>
                        <Col md={5}>
                            <DishIngredients
                                dish={this.state.dish}
                                numberOfGuests={this.state.numberOfGuests}
                                id={this.state.id}
                            />
                        </Col>
                    </Row>
                );
                break;
            default:
                dishDetails = <b>Failed to load data, please try again</b>;
                break;
        }

        return (
            <Container fluid={"true"}>
                {dishDetails}
            </Container>
        );
    }
}

class DishDescription extends React.Component {

    render() {
        const dish = this.props.dish;

        return (
            <div>
                <h1 id="name"> {dish.name} </h1>
                <div id="image">
                    <img src={dish.image} alt={dish.name} className="image_responsive dish_image"/>
                </div>
                <div className="body_text" id="description" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(dish.description)}} />
                <hr/>
                <div className="left">
                    <Link to="/search">
                        <Button>Back to search</Button>
                    </Link>
                </div>
            </div>
        );
    }

}

class DishIngredients extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            numberOfGuests: this.props.numberOfGuests,
            dish: this.props.dish,
            id: this.props.id
        }
    }

    render() {
        let total = 0;
        let ingredientJsx = [];
        (this.props.dish.ingredients).forEach((entry) => {
                let quantity = entry.quantity*this.props.numberOfGuests;
                let price = entry.price*this.props.numberOfGuests;
                total += price;
                ingredientJsx.push(
                    <tr key={entry.name + entry.unit}>
                        <td>{quantity} {entry.unit}</td>
                        <td>{entry.name}</td>
                        <td>SEK {price}</td>
                    </tr>
                );
            }
        );
        return (
            <div className="ingredients">
                <h3 className="center"> INGREDIENTS FOR {this.props.numberOfGuests} </h3>
                <div className='padding_5'>
                    <table id="table" className="table">
                        <tbody>
                        {ingredientJsx}
                        </tbody>
                    </table>
                </div>
                <Row>
                    <Col className="center">
                        <Button onClick={() => {modelInstance.addDishToMenu(this.state.id)}}>
                            Add to menu
                        </Button>
                    </Col>
                    <Col/>
                    <Col>
                        <div id="total_ingredients" className="col-3">SEK {total}</div>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default DishDetails;