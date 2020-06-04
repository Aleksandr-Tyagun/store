import { API_URL } from '../constants';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products.json`);

  return response.json();
};