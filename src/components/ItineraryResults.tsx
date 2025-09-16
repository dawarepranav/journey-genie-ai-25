import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, MapPin, Star, DollarSign, Utensils, Camera, 
  Navigation, Bookmark, Share2, Download, RefreshCw,
  Sun, Sunset, Moon
} from "lucide-react";

interface PlanningData {
  destination: string;
  checkIn: string;
  checkOut: string;
  travelers: number;
  budget: number;
  interests: string[];
}

interface ItineraryResultsProps {
  planningData: PlanningData;
  onRegeneratePlan: () => void;
  onBackToPlanning: () => void;
}

// Mock data for demonstration
const MOCK_ITINERARY = [
  {
    day: 1,
    date: "2024-03-15",
    activities: [
      {
        time: "9:00 AM",
        period: "morning",
        type: "restaurant",
        title: "Beachside Café",
        description: "Start your day with fresh tropical fruits and coffee",
        rating: 4.8,
        priceLevel: 2,
        duration: "1 hour",
        location: "Main Beach Boulevard"
      },
      {
        time: "11:00 AM",
        period: "morning",
        type: "attraction",
        title: "Historic Old Town Walking Tour",
        description: "Explore colonial architecture and local markets",
        rating: 4.6,
        priceLevel: 1,
        duration: "2 hours",
        location: "Old Town Square"
      },
      {
        time: "1:30 PM",
        period: "afternoon",
        type: "restaurant",
        title: "Ocean View Grill",
        description: "Fresh seafood with panoramic ocean views",
        rating: 4.9,
        priceLevel: 3,
        duration: "1.5 hours",
        location: "Coastal Highway"
      },
      {
        time: "4:00 PM",
        period: "afternoon",
        type: "attraction",
        title: "Sunset Beach Activities",
        description: "Snorkeling, kayaking, or beach volleyball",
        rating: 4.7,
        priceLevel: 2,
        duration: "3 hours",
        location: "Paradise Beach"
      },
      {
        time: "8:00 PM",
        period: "evening",
        type: "restaurant",
        title: "Rooftop Bar & Grill",
        description: "Craft cocktails and live music under the stars",
        rating: 4.5,
        priceLevel: 3,
        duration: "2 hours",
        location: "Downtown District"
      }
    ]
  },
  {
    day: 2,
    date: "2024-03-16",
    activities: [
      {
        time: "8:30 AM",
        period: "morning",
        type: "restaurant",
        title: "Local Market Breakfast",
        description: "Authentic street food and fresh juices",
        rating: 4.4,
        priceLevel: 1,
        duration: "45 minutes",
        location: "Central Market"
      },
      {
        time: "10:30 AM",
        period: "morning",
        type: "attraction",
        title: "Cultural Museum & Gallery",
        description: "Discover local art and historical artifacts",
        rating: 4.3,
        priceLevel: 2,
        duration: "2.5 hours",
        location: "Arts District"
      },
      {
        time: "2:00 PM",
        period: "afternoon",
        type: "restaurant",
        title: "Garden Terrace Restaurant",
        description: "Farm-to-table cuisine in a tropical setting",
        rating: 4.8,
        priceLevel: 3,
        duration: "1.5 hours",
        location: "Botanical Gardens"
      },
      {
        time: "5:30 PM",
        period: "afternoon",
        type: "attraction",
        title: "Adventure Nature Trail",
        description: "Hiking through rainforest with waterfalls",
        rating: 4.9,
        priceLevel: 2,
        duration: "3 hours",
        location: "National Park"
      }
    ]
  }
];

const getPeriodIcon = (period: string) => {
  switch (period) {
    case 'morning': return Sun;
    case 'afternoon': return Sunset;
    case 'evening': return Moon;
    default: return Clock;
  }
};

const getPriceDisplay = (level: number) => {
  return '$'.repeat(level) + '$'.repeat(3 - level).split('').map(() => '○').join('');
};

const ItineraryResults = ({ planningData, onRegeneratePlan, onBackToPlanning }: ItineraryResultsProps) => {
  const [selectedDay, setSelectedDay] = useState(1);

  const selectedDayData = MOCK_ITINERARY.find(day => day.day === selectedDay);

  const handleExportPDF = () => {
    // Mock export functionality
    alert("PDF export functionality would be implemented here!");
  };

  const handleShare = () => {
    // Mock share functionality
    alert("Share functionality would be implemented here!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-sand to-white py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Perfect Trip to{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              {planningData.destination}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {new Date(planningData.checkIn).toLocaleDateString()} - {new Date(planningData.checkOut).toLocaleDateString()} • {planningData.travelers} travelers
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button onClick={onRegeneratePlan} variant="outline" className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate Plan</span>
            </Button>
            <Button onClick={handleExportPDF} variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </Button>
            <Button onClick={handleShare} className="flex items-center space-x-2 bg-gradient-hero">
              <Share2 className="w-4 h-4" />
              <span>Share Trip</span>
            </Button>
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <div className="flex space-x-2 bg-white rounded-2xl p-2 shadow-card">
            {MOCK_ITINERARY.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedDay === day.day
                    ? "bg-gradient-hero text-white shadow-travel"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* Itinerary Content */}
        {selectedDayData && (
          <div className="animate-scale-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Day {selectedDayData.day} - {new Date(selectedDayData.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
            </div>

            {/* Timeline */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-travel-sunset to-travel-ocean hidden md:block" />

                {/* Activities */}
                <div className="space-y-6">
                  {selectedDayData.activities.map((activity, index) => {
                    const PeriodIcon = getPeriodIcon(activity.period);
                    
                    return (
                      <div key={index} className="relative flex items-start space-x-8">
                        {/* Timeline Marker */}
                        <div className="hidden md:flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-full shadow-travel flex-shrink-0">
                          <PeriodIcon className="w-6 h-6 text-white" />
                        </div>

                        {/* Activity Card */}
                        <Card className="flex-1 p-6 shadow-card bg-gradient-card hover:shadow-travel transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {activity.time}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {activity.duration}
                                </Badge>
                              </div>
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {activity.title}
                              </h3>
                              <p className="text-muted-foreground mb-3">
                                {activity.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="font-medium">{activity.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <DollarSign className="w-4 h-4 text-travel-mountain" />
                                  <span>{getPriceDisplay(activity.priceLevel)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">{activity.location}</span>
                                </div>
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex space-x-2 ml-4">
                              <Button size="sm" variant="outline" className="p-2">
                                <Bookmark className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="p-2">
                                <Navigation className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Activity Type Badge */}
                          <div className="flex items-center justify-between">
                            <Badge 
                              className={`${
                                activity.type === 'restaurant' 
                                  ? 'bg-travel-forest/10 text-travel-forest'
                                  : 'bg-travel-ocean/10 text-travel-ocean'
                              }`}
                            >
                              {activity.type === 'restaurant' ? (
                                <Utensils className="w-3 h-3 mr-1" />
                              ) : (
                                <Camera className="w-3 h-3 mr-1" />
                              )}
                              {activity.type === 'restaurant' ? 'Dining' : 'Attraction'}
                            </Badge>
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-12">
          <Button onClick={onBackToPlanning} variant="outline" size="lg">
            Plan Another Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryResults;