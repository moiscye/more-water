export const calculateDistancePrice = (d) => {
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
