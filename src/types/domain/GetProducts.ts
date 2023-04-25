interface PartialApiItems {
  brand: string;
  name: string;
  price: string;
  image_link: string;
  rating: number;
  category: string;
  product_type: string;
}

export interface GetProducts extends Partial<PartialApiItems> {
  id: number;
}
