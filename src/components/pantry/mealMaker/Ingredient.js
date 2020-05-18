import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddedFoodQuantity from "../AddedFoodQuantity";
import { QuantityTypeContext } from "../QuantityTypeProvider";
import { useMealMaker } from "../useMealMaker";
import { MealQuantityContext } from "../MealQuantityProvider";
import { MealFoodsContext } from "../../meals/MealFoodsProvider";

export default ({
  food,
  addIngredient,
  removeIngredient,
  selectedMealId,
  editMode,
}) => {
  const { quantityTypes } = useContext(QuantityTypeContext);
  const { quantities } = useContext(MealQuantityContext);
  const { mealFoods, releaseMealFoods } = useContext(MealFoodsContext);

  const [modal, setModal] = useState(false);
  const toggle = (e) => {
    if (e) e.preventDefault();
    setModal(!modal);
  };

  const quantityType = quantityTypes.find(
    (qT) => qT.id === food.quantityTypeId
  );

  // need to find primary key on mealTrackerObj and get quantity user tyoed in
  //const quantity = mealTrackerObject[food.id];

  return (
    <>
      <section className="ingredient__component">
        <div className="ingredient">
          {food.quantity > 1 && food.quantity}
          {quantityType.type} {food.name} x{quantities[food.id]}
          <i className="fa fa-lg fa-plus" onClick={toggle}></i>
          <i
            className="fa fa-lg fa-trash"
            onClick={() => {
              // if (!editMode) {
              removeIngredient(food);
              // } else {
              //   const relatedMealFoods =
              //     mealFoods.filter((mF) => mF.mealId === selectedMealId) || [];
              //   const chosenMealFood =
              //     relatedMealFoods.find((rMF) => rMF.foodId === food.id) || {};
              //   releaseMealFoods(chosenMealFood);
              // }
            }}
          ></i>
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
};
