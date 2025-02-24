export const getSales = async (req, res) => {
  try {
      // Tu lógica aquí
      res.json({ message: "Get all sales" });
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
};

export const createSale = async (req, res) => {
  try {
      // Tu lógica aquí
      res.json({ message: "Sale created" });
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSale = async (req, res) => {
  try {
      // Tu lógica aquí
      res.json({ message: "Sale updated" });
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSale = async (req, res) => {
  try {
      // Tu lógica aquí
      res.json({ message: "Sale deleted" });
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
};