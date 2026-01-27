export interface Member {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age?: number;
  phoneNumber?: string;
  appartmentNumber?: string;
  isAdmin: boolean;
  residence?: {
    id: number;
    name?: string;
  };
}
