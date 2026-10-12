export interface ServiceItem {
  id: string;
  title: string;
  category: 'servicing' | 'mechanical' | 'specialist';
  description: string;
  details: string[];
  priceEstimate: string;
  duration: string;
  imageUrl: string;
  recommendedInterval?: string;
}

export interface MotCheckCategory {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  checkItems: string[];
  commonFailReasons: string[];
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  carModel: string;
  serviceReceived: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface BookingFormData {
  serviceId: string;
  serviceName: string;
  registration: string;
  makeModel: string;
  fuelType: string;
  mileage: string;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}

export interface VehicleLookupResult {
  registration: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  colour: string;
  engineSize: string;
  motStatus: 'VALID' | 'DUE_SOON' | 'EXPIRED';
  motExpiryDate: string;
  daysRemaining: number;
}
