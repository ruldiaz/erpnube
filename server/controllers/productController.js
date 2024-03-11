const axios = require('axios');
require('dotenv').config();

const { Product } = require('../db');

const getAllProducts = async () => {
  try {
    return await Product.findAll();

  } catch (error) {
      throw new Error(error);
  }
}

module.exports = {
  getAllProducts
}