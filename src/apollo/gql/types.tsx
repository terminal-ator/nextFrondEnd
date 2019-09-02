export interface Order{
  id: string;
  delivered: boolean;
  amount: number;
  orderDate: string;
  deliverDate: string;
  eta: string;
  user: User;
}

export interface User{
  id: string;
  name: string;
  email: string;
}

export interface Item{
  id: string;
  product: object;
  variant: object;
  quantity: number;
}
// export interface Cart{
//   id: string;
//   items: Item[]
// }