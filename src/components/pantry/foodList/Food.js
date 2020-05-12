import React, { useContext, useState } from "react";
import { FoodContext } from "./FoodProvider";
import AddedFoodQuantity from "../AddedFoodQuantity";
import { Modal, ModalBody } from "reactstrap";

export default ({ food, quantityType, foodType, addIngredient }) => {
  const { releaseFood } = useContext(FoodContext);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <section className="food">
        <h3 className="food__name">{food.name}</h3>
        <div className="food__quantity">Quantity: {food.quantity}</div>
        <div className="food__quantityType">
          Quantity Type: {quantityType.type}
        </div>
        <div className="food__foodType">Food Type: {foodType.name}</div>
        <div className="food__calories">Calories: {food.calories}</div>
        <div className="food__protein">Protein: {food.protein}g</div>
        <div className="food__fat">Fat: {food.fat}g</div>
        <div className="food__carbohydrate">
          Carbohydrate: {food.carbohydrate}g
        </div>
        <div className="food__sugar">Sugar: {food.sugar}g</div>
        <button onClick={toggle}>Add To Meal</button>
        <button
          onClick={() => {
            releaseFood(food.id);
          }}
        >
          {/* <i class="far fa-trash-alt"></i> */}
          Trash
        </button>
      </section>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <AddedFoodQuantity
            toggle={toggle}
            addIngredient={addIngredient}
            food={food}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
