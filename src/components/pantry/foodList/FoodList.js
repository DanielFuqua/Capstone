import React, { useContext, useState } from "react";
import "../Foods.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FoodContext } from "./FoodProvider";
import { FoodTypeContext } from "./FoodTypeProvider";
import AddFoodForm from "./AddFoodForm";
import { QuantityTypeContext } from "../QuantityTypeProvider";
import Food from "./Food";
import { UserFoodsContext } from "./UserFoodsProvider";

export default ({ addIngredient, mealMakerTracker }) => {
  const { foods } = useContext(FoodContext);
  const { foodTypes } = useContext(FoodTypeContext);
  const { quantityTypes } = useContext(QuantityTypeContext);
  const { userFoods } = useContext(UserFoodsContext);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const thisUsersFoods = userFoods.filter(
    (userFood) => userFood.userId === parseInt(localStorage.getItem("pal_id"))
  );
  const theFoods = thisUsersFoods.map((tUF) => {
    return foods.find((f) => f.id === tUF.foodId) || {};
  });
  console.log(theFoods);
  return (
    <>
      <h2>Food List</h2>

      <button onClick={toggle}>Add Food</button>

      <ul className="foods">
        {theFoods.map((food) => {
          const foodType =
            foodTypes.find((fT) => fT.id === food.foodTypeId) || {};
          const quantityType =
            quantityTypes.find((qT) => qT.id === food.quantityTypeId) || {};

          return (
            <Food
              key={`fd--${food.id}`}
              quantityType={quantityType}
              foodType={foodType}
              food={food}
              addIngredient={addIngredient}
              mealMakerTracker={mealMakerTracker}
            />
          );
        })}
      </ul>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Food</ModalHeader>
        <ModalBody>
          <AddFoodForm toggler={toggle} />
        </ModalBody>
      </Modal>
    </>
  );
};
