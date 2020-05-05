import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddedFoodQuantity from "../AddedFoodQuantity";
import { QuantityTypeContext } from "../QuantityTypeProvider";

export default ({ food, addIngredient, quantity, mealMakerTracker }) => {
  const { quantityTypes } = useContext(QuantityTypeContext);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const quantityType = quantityTypes.find(
    (qT) => qT.id === food.quantityTypeId
  );

  return (
    <>
      <section className="ingredient__component">
        <div className="ingredient">
          {quantityType.type} {food.name} x{quantity}
          <button onClick={toggle}>Adjust Quantity</button>
          <button
          //   onClick={() => {
          //     releaseFood(food.id);
          //   }}
          >
            Remove
          </button>
        </div>
      </section>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <AddedFoodQuantity
            toggle={toggle}
            addIngredient={addIngredient}
            mealMakerTracker={mealMakerTracker}
            food={food}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
