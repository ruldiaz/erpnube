const { Sale } = require('../db');

// create sale handler
const postSaleHandler = ('/', async (req, res)=>{
  console.log(req.body);
  try {
    let {
      fecha,
      razon_social,
      data,
      clientId,
      userId,
      total
    } = req.body;

    let saleCreated = await Sale.create({
      fecha,
      razon_social,
      data,
      clientId,
      userId,
      total
    });

    res.status(201).send(saleCreated);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// read all sales
const getSaleHandler = ('/', async (req, res)=>{
  try {
    const allSales = await Sale.findAll();
    res.status(201).json(allSales);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

module.exports = {
  postSaleHandler,
  getSaleHandler
}