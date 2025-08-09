export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type SortField = "postId" | "name" | "email" | null;
export type SortOrder = "asc" | "desc" | null;

export interface DashboardState {
  searchTerm: string;
  currentPageNum: number;
  pageSize: number;
  sortField: SortField;
  sortOrder: SortOrder;
}
