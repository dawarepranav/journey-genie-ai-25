import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, Utensils, Calendar, Star, Clock, Plus, Check } from "lucide-react";

interface DiscoveryPageProps {
  planningData: {
    destination: string;
    checkIn: string;
    checkOut: string;
    travelers: number;
    budget: number;
    interests: string[];
  };
  onComplete: (selectedItems: SelectedItem[]) => void;
  onAutoplan: () => void;
  onBack: () => void;
}

interface SelectedItem {
  id: string;
  type: 'place' | 'restaurant' | 'event';
  title: string;
  cost: number;
  duration: number;
}

const MOCK_PLACES = [
  { id: 'p1', title: 'Red Fort', description: 'Historic Mughal fortress', rating: 4.5, price: 35, duration: 2, tags: ['Culture', 'History'], image: '/placeholder.svg' },
  { id: 'p2', title: 'India Gate', description: 'War memorial and landmark', rating: 4.3, price: 0, duration: 1, tags: ['Culture', 'Photography'], image: '/placeholder.svg' },
  { id: 'p3', title: 'Lotus Temple', description: 'Architectural marvel', rating: 4.6, price: 0, duration: 1.5, tags: ['Culture', 'Architecture'], image: '/placeholder.svg' },
  { id: 'p4', title: 'Qutub Minar', description: 'Ancient minaret complex', rating: 4.4, price: 30, duration: 2, tags: ['Culture', 'History'], image: '/placeholder.svg' },
];

const MOCK_RESTAURANTS = [
  { id: 'r1', title: 'Karim\'s', description: 'Legendary Mughlai cuisine', rating: 4.2, price: 800, duration: 1.5, tags: ['Mughlai', 'Traditional'], image: '/placeholder.svg' },
  { id: 'r2', title: 'Indian Accent', description: 'Modern Indian fine dining', rating: 4.7, price: 3500, duration: 2, tags: ['Fine Dining', 'Modern'], image: '/placeholder.svg' },
  { id: 'r3', title: 'Paranthe Wali Gali', description: 'Street food paradise', rating: 4.0, price: 200, duration: 1, tags: ['Street Food', 'Local'], image: '/placeholder.svg' },
  { id: 'r4', title: 'Bukhara', description: 'Award-winning restaurant', rating: 4.8, price: 4000, duration: 2, tags: ['Fine Dining', 'North Indian'], image: '/placeholder.svg' },
];

const MOCK_EVENTS = [
  { id: 'e1', title: 'Sound & Light Show', description: 'Red Fort evening show', rating: 4.3, price: 80, duration: 1, tags: ['Entertainment', 'Evening'], image: '/placeholder.svg' },
  { id: 'e2', title: 'Cooking Class', description: 'Learn authentic Indian cooking', rating: 4.6, price: 2500, duration: 3, tags: ['Culture', 'Food'], image: '/placeholder.svg' },
  { id: 'e3', title: 'Heritage Walk', description: 'Old Delhi guided tour', rating: 4.4, price: 500, duration: 4, tags: ['Culture', 'Walking'], image: '/placeholder.svg' },
  { id: 'e4', title: 'Rickshaw Tour', description: 'Chandni Chowk exploration', rating: 4.1, price: 300, duration: 2, tags: ['Adventure', 'Local'], image: '/placeholder.svg' },
];

const DiscoveryPage = ({ planningData, onComplete, onAutoplan, onBack }: DiscoveryPageProps) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [activeTab, setActiveTab] = useState('places');

  const totalBudget = planningData.budget * planningData.travelers;
  const selectedCost = selectedItems.reduce((sum, item) => sum + item.cost, 0);
  const selectedTime = selectedItems.reduce((sum, item) => sum + item.duration, 0);
  const budgetUsed = (selectedCost / totalBudget) * 100;

  const handleItemToggle = (item: any, type: 'place' | 'restaurant' | 'event') => {
    const selectedItem: SelectedItem = {
      id: item.id,
      type,
      title: item.title,
      cost: item.price,
      duration: item.duration
    };

    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, selectedItem];
      }
    });
  };

  const isSelected = (itemId: string) => selectedItems.some(item => item.id === itemId);

  const getPriceDisplay = (price: number) => {
    if (price === 0) return 'Free';
    return `₹${price}`;
  };

  const renderItemCard = (item: any, type: 'place' | 'restaurant' | 'event') => (
    <Card key={item.id} className="group cursor-pointer hover:shadow-travel transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button
            size="sm"
            onClick={() => handleItemToggle(item, type)}
            className={`rounded-full w-10 h-10 p-0 ${
              isSelected(item.id)
                ? "bg-primary text-white shadow-travel"
                : "bg-white/90 text-foreground hover:bg-white"
            }`}
          >
            {isSelected(item.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
          <Badge variant="secondary" className="text-primary font-medium">
            {getPriceDisplay(item.price)}
          </Badge>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{item.duration}hrs</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-sand to-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Discover {planningData.destination}</h1>
                <p className="text-muted-foreground">Choose what interests you most</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Budget Used</div>
              <div className="font-semibold text-foreground">₹{selectedCost.toLocaleString()} / ₹{totalBudget.toLocaleString()}</div>
              <Progress value={budgetUsed} className="w-24 mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="places" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Places</span>
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="flex items-center space-x-2">
              <Utensils className="w-4 h-4" />
              <span>Dining</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="places" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MOCK_PLACES.map(place => renderItemCard(place, 'place'))}
            </div>
          </TabsContent>

          <TabsContent value="restaurants" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MOCK_RESTAURANTS.map(restaurant => renderItemCard(restaurant, 'restaurant'))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MOCK_EVENTS.map(event => renderItemCard(event, 'event'))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-sm">
                <span className="font-semibold text-foreground">Selected: {selectedItems.length} items</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Est. cost: </span>
                <span className="font-semibold text-foreground">₹{selectedCost.toLocaleString()}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Time needed: </span>
                <span className="font-semibold text-foreground">{selectedTime}hrs</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onAutoplan}
                className="hover:shadow-travel transition-all duration-300"
              >
                Let AI Auto-Plan
              </Button>
              <Button
                onClick={() => onComplete(selectedItems)}
                disabled={selectedItems.length === 0}
                className="bg-gradient-hero hover:shadow-travel transition-all duration-300"
              >
                Generate Itinerary with Selected
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPage;