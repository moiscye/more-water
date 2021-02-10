export default ({ manguera, pipa, extras, distance = 10 }) => {
  let distanceTotal = calculateDistancePrice(distance);
  let extrasTotal = extras && calculateExtras(extras);
  let total = manguera.price + pipa.price + extrasTotal + distanceTotal;
  return total;
};
const calculateExtras = (e) => {
  console.log(e);
  return e.reduce((acc, item) => {
    console.log(acc);
    return item.status ? acc + item.price : acc;
  }, 0);
};

const calculateDistancePrice = (d) => {
  let price = 0;
  let startDistance = 7000;
  let kmGapPrice = 3;
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
