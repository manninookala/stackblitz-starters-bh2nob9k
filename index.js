const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

// Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getTotalCartPrice(newItemPrice, cartTotal).toString());
});

function getTotalCartPrice(newItemPrice, cartTotal) {
  return cartTotal + newItemPrice;
}

// Endpoint 2 : Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = Boolean(req.query.isMember);
  res.send(getMembershipDiscount(cartTotal, isMember).toString());
});

function getMembershipDiscount(cartTotal, isMember) {
  if (isMember === true) {
    let discountedPrice = cartTotal - (cartTotal * discountPercentage) / 100;
    return discountedPrice;
  } else {
    return cartTotal;
  }
}

// Endpoint 3 : Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getTaxRate(cartTotal).toString());
});

function getTaxRate(cartTotal) {
  let finalTax = (cartTotal * taxRate) / 100;
  return finalTax;
}

//Endpoint 4 : Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(getEstimateDelivery(shippingMethod, distance).toString());
});

function getEstimateDelivery(shippingMethod, distance) {
  let daysTaken;
  if (shippingMethod === 'express') {
    daysTaken = distance / 100;
    return daysTaken;
  } else if (shippingMethod === 'standard') {
    daysTaken = distance / 50;
    return daysTaken;
  }
}

//Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(getShippingCost(weight, distance).toString());
});

function getShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost;
}

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(getLoyaltyPoints(purchaseAmount).toString());
});

function getLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
