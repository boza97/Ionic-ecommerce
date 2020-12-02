import { Brand } from './brand';
import { Category } from './category';

export class Product {
  constructor( 
    public product_id: number,
    public title: string,
    public price: number,
    public brand: Brand,
    public category: Category,
    public image: string,
    public description: string,
    public featured: number,
    public quantity: number){} 
}
