// import React from "react";

// export default ({ ingredients }) => {
//   // Nutrition State
//   const [calories, setCalories] = useState();
//   const addCalories = (cal) => {
//     const newCalories = calories.slice();
//     newCalories += cal.then(setCalories(newCalories));
//   };

//   const [protein, setProtein] = useState();
//   const addProtein = (pro) => {
//     const newProtein = protein.slice();
//     newProtein += pro.then(setProtein(newProtein));
//   };

//   const [fat, setFat] = useState();
//   const addFat = (f) => {
//     const newFat = fat.slice();
//     newFat += f.then(setFat(newFat));
//   };

//   const [carbohydrate, setCarbohydrate] = useState();
//   const addCarbs = (carb) => {
//     const newCarbs = carbohydrate.slice();
//     newCarbs += carb.then(setCarbohydrate(newCarbs));
//   };

//   const [sugar, setSugar] = useState();
//   const addSugar = (sug) => {
//     const newSugar = sugar.slice();
//     newSugar += sug.then(setSugar(newSugar));
//   };

//   useEffect(() => {
//     ingredients.map((ingredient) => {
//       const cal = ingredient.calories;
//       const pro = ingredient.protein;
//       const f = ingredient.fat;
//       const carb = ingredient.carbohydrate;
//       const sug = ingredient.sugar;
//       addCalories(cal);
//       addProtein(pro);
//       addFat(f);
//       addCarbs(carb);
//       addSugar(sug);
//     });
//   }, [ingredients]);
//   return (
//     <>
//       <section className="nutrientsList">
//         <div className="calories">Calories: {calories}</div>
//         <div className="protein">Protein: {protein}g</div>
//         <div className="fat">Fat: {fat}g</div>
//         <div className="carbohydrate">Carbohydrate: {carbohydrate}g</div>
//         <div className="sugar">Sugar: {sugar}g</div>
//       </section>
//     </>
//   );
// };
