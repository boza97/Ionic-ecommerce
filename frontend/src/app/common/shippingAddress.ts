export class ShippingAddress {
  constructor(
    public shipping_address_id: number,
    public city: string,
    public city_code: number,
    public address: string,
    public phone: string,
    public contact_name: string,
    public user_id: number
  ) { }
}
