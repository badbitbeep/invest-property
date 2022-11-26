export const PropertyType = {
    House: 'House',
    Apartment: 'Apartment',
    Flat: 'Flat',
    Villa: 'Villa',
}

export function createProperty(type, location, price, imageUrl, description) {
  return {
    type,
    location,
    price,
    imageUrl,
    description,
  };
}
