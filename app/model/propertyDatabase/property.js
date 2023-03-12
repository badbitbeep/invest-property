export const PropertyType = {
    House: 'House',
    Apartment: 'Apartment',
    Flat: 'Flat',
    Villa: 'Villa',
}

export function createProperty(id, type, location, price, imageUrl, description) {
  return {
    id,
    type,
    location,
    price,
    imageUrl,
    description,
  };
}
