export default ({ manguera, pipa, extras, distance = 10 }) => {
  let distanceTotal = calculateDistancePrice(distance);
  let extrasTotal = extras && calculateExtras(extras);
  console.log("extrasTotal", extrasTotal);
  let total = manguera.price + pipa.price + extrasTotal + distanceTotal;
  console.log("total after adding everything", total);
  return total;
};
const calculateExtras = (e) => {
  let sum = e.reduce((acc, item) => {
    return item.status ? acc + item.price : acc;
  }, 0);
  console.log("Sum inside calculateExtras", sum);
  return sum;
};

const calculateDistancePrice = (d) => {
  let price = 0;
  //7000 metres or 7Km are free
  let startDistance = 7000;
  //Number of Kms that the price changues after the startDistance
  let kmGapPrice = 3;
  //Price per Km
  let pricePerKm = 10;
  if (d > startDistance) {
    let startDistanceInKm = startDistance / 1000;
    let distanceInKm = d / 1000;
    let distanceDiference = distanceInKm - startDistanceInKm;
    let kmToBeChargue = distanceDiference / kmGapPrice;
    price = Math.ceil(kmToBeChargue) * pricePerKm;
  }
  return price;
};
