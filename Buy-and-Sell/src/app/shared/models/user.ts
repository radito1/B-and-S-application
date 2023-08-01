export interface User {
  uid: string;
  email?: string;
  firstName?: string;
  lastName?:string;
  address?:string;
  displayName: string;
  imageUrl?: string;
  phoneNumber?: string;
  listedItems?: string[];
}
