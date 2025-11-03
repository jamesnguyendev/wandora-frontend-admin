export interface tour {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  priceBase: number;
  type: "room" | "experience";
}

export type CreateTour = Omit<tour, "id">;
