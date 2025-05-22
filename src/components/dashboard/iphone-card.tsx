import Image from 'next/image';
import type { iPhoneListing } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, ShieldCheck, ShieldAlert, Smartphone } from 'lucide-react';

interface iPhoneCardProps {
  listing: iPhoneListing;
}

const conditionIcons = {
  New: <ShieldCheck className="h-4 w-4 text-green-500" />,
  'Like New': <ShieldCheck className="h-4 w-4 text-blue-500" />,
  Used: <ShieldAlert className="h-4 w-4 text-yellow-500" />,
  Fair: <ShieldAlert className="h-4 w-4 text-orange-500" />,
  Poor: <ShieldAlert className="h-4 w-4 text-red-500" />,
};

export function IPhoneCard({ listing }: iPhoneCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={listing.imageUrl}
            alt={listing.model}
            layout="fill"
            objectFit="cover"
            data-ai-hint={listing.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-1 flex items-center">
          <Smartphone className="mr-2 h-5 w-5 text-muted-foreground" />
          {listing.model}
        </CardTitle>
        <div className="flex items-center text-lg font-bold text-primary mb-2">
          <DollarSign className="mr-1 h-5 w-5 text-green-600" />
          {listing.price.toLocaleString()}
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            {conditionIcons[listing.condition]}
            <span className="ml-2">{listing.condition}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{listing.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant={listing.condition === 'New' ? 'default' : 'secondary'}>
          {listing.condition === 'New' ? 'Brand New' : 'Pre-owned'}
        </Badge>
      </CardFooter>
    </Card>
  );
}
