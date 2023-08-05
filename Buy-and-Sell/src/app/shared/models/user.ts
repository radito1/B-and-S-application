export interface User {
  uid: string;
  email?: string | null;
  firstName?: string;
  lastName?: string;
  address?: string;
  displayName: string;
  imageUrl?: string;
  phoneNumber?: string;
  listedItems: string[];
  description?: string;
}
