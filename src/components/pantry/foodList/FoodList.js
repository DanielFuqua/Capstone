import React, { useContext, useState } from "react";
import "../Pantry.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FoodContext } from "./FoodProvider";
import { FoodTypeContext } from "./FoodTypeProvider";
import AddFoodForm from "./AddFoodForm";
import { QuantityTypeContext } from "../QuantityTypeProvider";
import Food from "./Food";
import { UserFoodsContext } from "./UserFoodsProvider";

export default ({ addIngredient }) => {
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

  return (
    <>
      <section className="pantry_container">
        <h1>Pantry</h1>

        <button className="button__addFood" onClick={toggle}>
          Add Food
        </button>

        <ul className="foods">
          {theFoods.map((food, index) => {
            const foodType =
              foodTypes.find((fT) => fT.id === food.foodTypeId) || {};
            const quantityType =
              quantityTypes.find((qT) => qT.id === food.quantityTypeId) || {};

            return (
              <Food
                key={`fd--${index}`}
                quantityType={quantityType}
                foodType={foodType}
                food={food}
                addIngredient={addIngredient}
              />
            );
          })}
        </ul>
      </section>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <AddFoodForm toggler={toggle} />
        </ModalBody>
      </Modal>
    </>
  );
};
