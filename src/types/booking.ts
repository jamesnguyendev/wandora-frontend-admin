export interface booking {
  id: string;
  userId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseBooking {
  status: string;
  code: number;
  message: string;
  data: booking[];
  timestamp: string;
}
