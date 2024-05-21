const { Sale } = require('../db');

// create sale handler
const postSaleHandler = ('/', async (req, res)=>{
  console.log(req.body);
  try {
    let {
      fecha,
      folio,
      metodo_pago,
      total
    } = req.body;

    let saleCreated = await Sale.create({
      fecha,
      folio,
      metodo_pago,
      total
    });

    res.status(201).send(saleCreated);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = {
  postSaleHandler
}