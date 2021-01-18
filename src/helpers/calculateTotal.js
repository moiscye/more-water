export default ({ manguera, pipa, extras, distance = 10 }) => {
  let distanceTotal = calculateDistancePrice(distance);
  let extrasTotal = extras && extras.bomba.status ? extras.bomba.price : 0;
  let total = manguera.price + pipa.price + extrasTotal + distanceTotal;
  return total;
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
