import React, { useContext, useState } from "react";
import "./Foods.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FoodContext } from "./FoodProvider";
import { FoodTypeContext } from "./FoodTypeProvider";
import AddFoodForm from "./AddFoodForm";
import { QuantityTypeContext } from "./QuantityTypeProvider";
import Food from "./Food";

export default ({ addIngredient }) => {
  const { foods } = useContext(FoodContext);
  const { foodTypes } = useContext(FoodTypeContext);
  const { quantityTypes } = useContext(QuantityTypeContext);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const userFoods = foods.filter(
    (food) => food.userId === parseInt(localStorage.getItem("pal_id"))
  );

  return (
    <>
      <h2>Food List</h2>

      <button onClick={toggle}>Add Food</button>

      <ul className="foods">
        {userFoods.map((food) => {
          const foodType = foodTypes.find((fT) => fT.id === food.foodTypeId);
          const quantityType = quantityTypes.find(
            (qT) => qT.id === food.quantityTypeId
          );

          return (
            <Food
              key={food.id}
              quantityType={quantityType}
              foodType={foodType}
              food={food}
              addIngredient={addIngredient}
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
