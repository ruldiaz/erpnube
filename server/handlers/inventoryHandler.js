const { Inventory } = require('../db'); // Adjust the path as necessary

const postInventoryHandler = ('/update-inventory', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const inventory = await Inventory.findOne({ where: { ProductId: productId } });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const newQuantity = inventory.inventario_actual - quantity;
    if (newQuantity < 0) {
      return res.status(400).json({ message: 'Insufficient inventory' });
    }

    inventory.inventario_actual = newQuantity;
    await inventory.save();

    res.json({ message: 'Inventory updated successfully', inventory });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = {
  postInventoryHandler
};
