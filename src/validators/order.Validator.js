export const validateOrderData = (data) => {
  const errors = [];

  // Validate firstName
  if (!data.firstName || typeof data.firstName !== 'string') {
    errors.push({
      field: 'firstName',
      message: 'First name is required and must be a string'
    });
  } else if (data.firstName.trim().length === 0) {
    errors.push({
      field: 'firstName',
      message: 'First name cannot be empty'
    });
  } else if (data.firstName.trim().length < 2) {
    errors.push({
      field: 'firstName',
      message: 'First name must be at least 2 characters long'
    });
  }

  // Validate lastName
  if (!data.lastName || typeof data.lastName !== 'string') {
    errors.push({
      field: 'lastName',
      message: 'Last name is required and must be a string'
    });
  } else if (data.lastName.trim().length === 0) {
    errors.push({
      field: 'lastName',
      message: 'Last name cannot be empty'
    });
  } else if (data.lastName.trim().length < 2) {
    errors.push({
      field: 'lastName',
      message: 'Last name must be at least 2 characters long'
    });
  }

  // Validate address
  if (!data.address || typeof data.address !== 'string') {
    errors.push({
      field: 'address',
      message: 'Address is required and must be a string'
    });
  } else if (data.address.trim().length === 0) {
    errors.push({
      field: 'address',
      message: 'Address cannot be empty'
    });
  } else if (data.address.trim().length < 10) {
    errors.push({
      field: 'address',
      message: 'Address must be at least 10 characters long'
    });
  }

  // Validate cartItems
  if (!data.cartItems || !Array.isArray(data.cartItems)) {
    errors.push({
      field: 'cartItems',
      message: 'Cart items must be an array'
    });
  } else if (data.cartItems.length === 0) {
    errors.push({
      field: 'cartItems',
      message: 'Cart cannot be empty'
    });
  } else {
    // Validate each cart item
    data.cartItems.forEach((item, index) => {
      if (!item.id || !item.name || !item.price || !item.quantity) {
        errors.push({
          field: `cartItems[${index}]`,
          message: 'Each cart item must have id, name, price, and quantity'
        });
      }
      if (item.quantity <= 0) {
        errors.push({
          field: `cartItems[${index}].quantity`,
          message: 'Quantity must be greater than 0'
        });
      }
    });
  }

  // Validate totalAmount
  if (!data.totalAmount || typeof data.totalAmount !== 'number') {
    errors.push({
      field: 'totalAmount',
      message: 'Total amount is required and must be a number'
    });
  } else if (data.totalAmount <= 0) {
    errors.push({
      field: 'totalAmount',
      message: 'Total amount must be greater than 0'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
  };
