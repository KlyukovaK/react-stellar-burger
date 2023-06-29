import React from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import {
  CurrencyIcon,
  Counter,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: one,
    };
  }
	setCurrent = (e) => {

  };
  render() {
    return (
      <div>
        <h1>Соберите бургер</h1>
        <div style={{ display: "flex" }}>
          <Tab value="one" active={current === "one"} onClick={this.setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={this.setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={this.setCurrent}>
            Начинка
          </Tab>
        </div>
        <div>
          <h2>Булки</h2>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div>
          <h2>Соусы</h2>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div>
          <h2>Начинка</h2>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
}
export default BurgerIngredients;
