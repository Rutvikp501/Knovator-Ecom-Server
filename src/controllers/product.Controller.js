import products from "../config/products.js"

export const getAllProducts = (req, res) => {
    try {
        // You can add query parameters for filtering/sorting here
        const { category, minPrice, maxPrice, sort } = req.query;
        
        let filteredProducts = [...products];
    
        // Filter by category
        if (category) {
          filteredProducts = filteredProducts.filter(
            p => p.category.toLowerCase() === category.toLowerCase()
          );
        }
    
        // Filter by price range
        if (minPrice) {
          filteredProducts = filteredProducts.filter(
            p => p.price >= parseFloat(minPrice)
          );
        }
        if (maxPrice) {
          filteredProducts = filteredProducts.filter(
            p => p.price <= parseFloat(maxPrice)
          );
        }
    
        // Sort products
        if (sort) {
          if (sort === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
          } else if (sort === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
          } else if (sort === 'name') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          }
        }
    
        res.status(200).json({
          success: true,
          count: filteredProducts.length,
          data: filteredProducts
        });
      } catch (error) {
        next(error);
      }
};

export const getProductById = (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
    };