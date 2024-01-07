export type TLocation = {
  pathname: string;
  search: string;
  state: {
    background?: {
      pathname: string;
      search: string;
      state: null | object;
      key: string;
    };
  };
  key: string;
};

export type TIngredientData = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: number | string;
};

export type TOrderCard = {
  ingredients: string[];
  number: number | string;
  updatedAt: string;
  createdAt: string;
  _id: string;
  name: string;
  status: string;
};
export type THistoryOfOrgers = {
  orders: Array<TOrderCard>;
  success: boolean;
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
  password?: string;
};
