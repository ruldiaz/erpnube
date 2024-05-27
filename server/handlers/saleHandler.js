const { Sale, SaleProduct, Inventory } = require('../db'); // Adjust the path as necessary

const postSaleHandler = ('/make-sale', async (req, res) => {
  const { clientId, userId, products } = req.body;

  try {
    const sale = await Sale.create({ clientId, userId, totalAmount: 0 });
    
    let totalAmount = 0;

    for (const product of products) {
      const inventory = await Inventory.findOne({ where: { ProductId: product.productId } });
      
      if (inventory && inventory.inventario_actual >= product.quantity) {
        await SaleProduct.create({
          saleId: sale.id,
          productId: product.productId,
          quantity: product.quantity,
          price: product.price
        });

        inventory.inventario_actual -= product.quantity;
        await inventory.save();
        
        totalAmount += product.quantity * product.price;
      } else {
        return res.status(400).json({ message: `Insufficient inventory for product ${product.productId}` });
      }
    }

    sale.totalAmount = totalAmount;
    await sale.save();

    res.json({ message: 'Sale completed successfully', sale });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = {
  postSaleHandler
};
