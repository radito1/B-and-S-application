export interface User {
  uid: string;
  email?: string ;
  firstName?: string;
  lastName?: string;
  address?: string;
  displayName: string;
  imageUrl?: string;
  phone?: string;
  listedItems: string[];
  description?: string;
}
