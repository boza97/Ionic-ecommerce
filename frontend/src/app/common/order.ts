import { OrderItem } from './orderItem';

export class Order {
    constructor(
        public order_id: number,
        public contact_name: string,
        public city: string,
        public city_code: number,
        public address: string,
        public phone: string,
        public total: number,
        public user_id: number,
        public order_items: OrderItem[],
        public created_at: Date
    ) { }
}