export interface Message {
  message: string;
}
export interface Idea {
  id: string;
  date: string;
  ideaName: string;
  description: string;
  personal: boolean;
  business: boolean;
  romance: boolean;
}
export const emptyIdea = {
  id: '',
  date: '',
  ideaName: '',
  description: '',
  personal: false,
  business: false,
  romance: false,
};

export interface Referral {
  id: string;
  name: string;
  facility: string;
  phoneNumber: string;
  roomNumber: string;
  processed: boolean;
}

export const emptyReferral = {
  id: '',
  name: '',
  facility: '',
  phoneNumber: '',
  roomNumber: '',
  processed: false,
};

export interface Adventure {
  id: string;
  adventureName: string;
  destination: string;
  adventureDate: string;
  mileage: number;
  adventureComplete: boolean;
}

export const emptyAdventure = {
  id: '',
  adventureName: '',
  destination: '',
  adventureDate: '',
  mileage: 0,
  adventureComplete: false,
};
