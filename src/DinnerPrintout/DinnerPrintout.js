import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Topbar from "../Topbar/Topbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <React.Fragment>
            <Topbar />
            <Container className="fill">
                <Printout />
            </Container>
        </React.Fragment>
    );
  }
}

class Printout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishName1: "No-Knead Bread",
      dishName2: "Kale and Quinoa Salad with Black Beans",
      dishName3: "Creamy Avocado Pasta",
      dishType: "useless",
      dishDescription1:
        "No-Knead Bread requires approximately 45 minutes from start to finish. One serving contains 127 calories, 9g of protein, and 3g of fat. For 33 cents per serving, this recipe covers 28% of your daily requirements of vitamins and minerals. This recipe serves 24. 84894 people were impressed by this recipe. It is a good option if you're following a dairy free, lacto ovo vegetarian, and vegan diet. A mixture of instant yeast, salt, wheat bran, and a handful of other ingredients are all it takes to make this recipe so tasty. It is brought to you by cooking.nytimes.com. With a spoonacular score of 100%, this dish is excellent. If you like this recipe, you might also like recipes such as No Knead Bread, No Knead Bread, and No Knead Rosemary Bread.",
      dishDescription2:
        "If you want to add more gluten free, dairy free, lacto ovo vegetarian, and vegan recipes to your repertoire, Kale and Quinoa Salad with Black Beans might be a recipe you should try. This side dish has 243 calories, 10g of protein, and 7g of fat per serving. This recipe serves 6. For $1.01 per serving, this recipe covers 24% of your daily requirements of vitamins and minerals. Head to the store and pick up carrot, cumin, chile powder, and a few other things to make it today. Many people made this recipe, and 50077 would say it hit the spot. It is brought to you by blog.fatfreevegan.com. From preparation to the plate, this recipe takes approximately 50 minutes. Overall, this recipe earns a great spoonacular score of 100%. Users who liked this recipe also liked Skip the Rice and Try Quinoa – Mexican Quinoa Salad with Black Beans and Corn, Black Quinoa & Kale Salad, and Black Quinoa & Kale Salad.",
      dishDescription3:
        "Need a dairy free, lacto ovo vegetarian, and vegan main course? Creamy Avocado Pasta could be an awesome recipe to try. One serving contains 484 calories, 15g of protein, and 16g of fat. This recipe serves 2. For $1.71 per serving, this recipe covers 33% of your daily requirements of vitamins and minerals. This recipe from Two Peas and Their Pod has 67131 fans. A mixture of avocado, whole wheat pasta, fresh cilantro, and a handful of other ingredients are all it takes to make this recipe so delicious. From preparation to the plate, this recipe takes approximately 15 minutes. Overall, this recipe earns an outstanding spoonacular score of 100%. Try Creamy Avocado Pasta, Creamy Avocado Pasta, and My Creamy Avocado Pasta for similar recipes."
    };
  }

  render() {
    return (
        <React.Fragment>
            <Col>
                <PrintoutItem />
                <PrintoutItem />
                <PrintoutItem />
            </Col>
      </React.Fragment>
    );
  }
}

class PrintoutItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dishName1: "No-Knead Bread",
        dishName2: "Kale and Quinoa Salad with Black Beans",
        dishName3: "Creamy Avocado Pasta",
        dishType: "useless",
        dishDescription1:
          "No-Knead Bread requires approximately 45 minutes from start to finish. One serving contains 127 calories, 9g of protein, and 3g of fat. For 33 cents per serving, this recipe covers 28% of your daily requirements of vitamins and minerals. This recipe serves 24. 84894 people were impressed by this recipe. It is a good option if you're following a dairy free, lacto ovo vegetarian, and vegan diet. A mixture of instant yeast, salt, wheat bran, and a handful of other ingredients are all it takes to make this recipe so tasty. It is brought to you by cooking.nytimes.com. With a spoonacular score of 100%, this dish is excellent. If you like this recipe, you might also like recipes such as No Knead Bread, No Knead Bread, and No Knead Rosemary Bread.",
        dishDescription2:
          "If you want to add more gluten free, dairy free, lacto ovo vegetarian, and vegan recipes to your repertoire, Kale and Quinoa Salad with Black Beans might be a recipe you should try. This side dish has 243 calories, 10g of protein, and 7g of fat per serving. This recipe serves 6. For $1.01 per serving, this recipe covers 24% of your daily requirements of vitamins and minerals. Head to the store and pick up carrot, cumin, chile powder, and a few other things to make it today. Many people made this recipe, and 50077 would say it hit the spot. It is brought to you by blog.fatfreevegan.com. From preparation to the plate, this recipe takes approximately 50 minutes. Overall, this recipe earns a great spoonacular score of 100%. Users who liked this recipe also liked Skip the Rice and Try Quinoa – Mexican Quinoa Salad with Black Beans and Corn, Black Quinoa & Kale Salad, and Black Quinoa & Kale Salad.",
        dishDescription3:
          "Need a dairy free, lacto ovo vegetarian, and vegan main course? Creamy Avocado Pasta could be an awesome recipe to try. One serving contains 484 calories, 15g of protein, and 16g of fat. This recipe serves 2. For $1.71 per serving, this recipe covers 33% of your daily requirements of vitamins and minerals. This recipe from Two Peas and Their Pod has 67131 fans. A mixture of avocado, whole wheat pasta, fresh cilantro, and a handful of other ingredients are all it takes to make this recipe so delicious. From preparation to the plate, this recipe takes approximately 15 minutes. Overall, this recipe earns an outstanding spoonacular score of 100%. Try Creamy Avocado Pasta, Creamy Avocado Pasta, and My Creamy Avocado Pasta for similar recipes."
      };
    }
  
    render() {
      return (
        <React.Fragment>
          <Row>
            <Col md={3} sm={4} className="media_box ver_align" >
              <div className="media-top padding_5">
                <img className="media-object" src="http://stonerdays.com/wp-content/uploads/2013/05/shutterstock_118739218-life-purpose.jpg" />
              </div>
            </Col>
            <Col md={3} sm={4} id="dish">
              <h3>{this.state.dishName1}</h3>
              <p className="body_text" id="randomText1">
                Type: &nbsp; {this.state.dishType}
              </p>
            </Col>{" "}
            <Col md={5}>
              <h4>Preparation</h4>
              <p className="body_text" id="randomText2">
                {this.state.dishDescription1}
              </p>
            </Col> 
          </Row>
          <ColoredLine color="grey" />
        </React.Fragment>
      );
    }
  }
  