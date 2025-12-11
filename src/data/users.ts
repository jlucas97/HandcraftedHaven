export type User = {
  id: number;
  email: string;
  password: string;
  role: "seller" | "buyer";
  sellerId?: string;
  name: string;
};

export const users: User[] = [
  {
    id: 1,
    email: "seller@example.com",
    password: "seller321",
    role: "seller",
    sellerId: "artisan-woods",
    name: "Artisan Woods Co.",
  },
  {
    id: 2,
    email: "buyer@example.com",
    password: "buyer123",
    role: "buyer",
    name: "Regular Buyer",
  },

];
