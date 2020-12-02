import { Product } from "./product";

export class OrderItem {
  constructor(
    public order_item_id: number,
    public product: Product,
    public quantity: number,
    public amount?: number
  ) { }
}
