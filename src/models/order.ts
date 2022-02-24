import { OrderItem } from "./order_item";

export class Order {
    constructor(
        public id: number,
        public full_name: string,
        public email: string,
        public total_price: number,
        public order_items: OrderItem[]
    ) {

    }
}