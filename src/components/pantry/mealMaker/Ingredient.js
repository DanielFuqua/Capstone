import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddedFoodQuantity from "../AddedFoodQuantity";
import { QuantityTypeContext } from "../QuantityTypeProvider";
import { useMealMaker } from "../useMealMaker";

export default ({ food, addIngredient, removeIngredient }) => {
  const { quantityTypes } = useContext(QuantityTypeContext);
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { mealTrackerObject } = useMealMaker();
  const toggle = () => setModal(!modal);
  const quantityType = quantityTypes.find(
    (qT) => qT.id === food.quantityTypeId
  );
  useEffect(() => {
    const foodQuantity = mealTrackerObject[food.id];
    setQuantity(foodQuantity);
  }, [mealTrackerObject]);
  // need to find primary key on mealTrackerObj and get quantity user tyoed in
  //const quantity = mealTrackerObject[food.id];

  if (food.quantity === 1) {
    return (
      <>
        <section className="ingredient__component">
          <div className="ingredient">
            {quantityType.type} {food.name} x{mealTrackerObject[food.id]}
            <button onClick={toggle}>Adjust Quantity</button>
            <button
              onClick={() => {
                removeIngredient(food);
              }}
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
              food={food}
            />
          </ModalBody>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <section className="ingredient__component">
          <div className="ingredient">
            {food.quantity}
            {quantityType.type} {food.name} x{mealTrackerObject[food.id]}
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
              food={food}
            />
          </ModalBody>
        </Modal>
      </>
    );
  }
};
