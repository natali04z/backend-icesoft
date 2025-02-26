import Sale from "../models/Sales.js";

//  Reporte de ventas por fecha
export const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = {};
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const sales = await Sale.find(filter);
    const totalRevenue = sales.reduce((acc, sale) => acc + sale.price * sale.quantity, 0);

    res.json({ totalSales: sales.length, totalRevenue, sales });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving sales report" });
  }
};

// Reporte de clientes con más compras
export const getTopCustomers = async (req, res) => {
  try {
    const topCustomers = await Sale.aggregate([
      { $group: { _id: "$customer", totalSpent: { $sum: { $multiply: ["$price", "$quantity"] } } } },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 }
    ]);

    res.json(topCustomers);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving top customers report" });
  }
};

//  Reporte de productos más vendidos
export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Sale.aggregate([
      { $group: { _id: "$product", totalSold: { $sum: "$quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving top products report" });
  }
};
