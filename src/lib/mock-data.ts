export interface iPhoneListing {
  id: string;
  model: string;
  price: number;
  condition: 'New' | 'Like New' | 'Used' | 'Fair' | 'Poor';
  location: string;
  imageUrl: string;
  imageHint: string;
}

export const mockIPhoneListings: iPhoneListing[] = [
  {
    id: '1',
    model: 'iPhone 15 Pro Max',
    price: 1199,
    condition: 'New',
    location: 'Cupertino, CA',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'iPhone smartphone',
  },
  {
    id: '2',
    model: 'iPhone 15 Pro',
    price: 999,
    condition: 'Like New',
    location: 'San Francisco, CA',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'iPhone device',
  },
  {
    id: '3',
    model: 'iPhone 14 Pro Max',
    price: 899,
    condition: 'Used',
    location: 'New York, NY',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cell phone',
  },
  {
    id: '4',
    model: 'iPhone 14',
    price: 650,
    condition: 'Used',
    location: 'Chicago, IL',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'Apple product',
  },
  {
    id: '5',
    model: 'iPhone 13 Pro',
    price: 750,
    condition: 'Like New',
    location: 'Austin, TX',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mobile tech',
  },
  {
    id: '6',
    model: 'iPhone SE (3rd gen)',
    price: 399,
    condition: 'New',
    location: 'Miami, FL',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'budget smartphone',
  },
  {
    id: '7',
    model: 'iPhone 12',
    price: 450,
    condition: 'Fair',
    location: 'Seattle, WA',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'older iPhone',
  },
   {
    id: '8',
    model: 'iPhone 15 Pro Max', // Duplicate model for filtering test
    price: 1150,
    condition: 'Like New',
    location: 'Boston, MA',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'new iPhone',
  },
];

export const getAvailableModels = (): string[] => {
  const models = mockIPhoneListings.map(listing => listing.model);
  return Array.from(new Set(models)).sort();
};
