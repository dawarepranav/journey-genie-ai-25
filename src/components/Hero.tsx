import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Users, DollarSign } from "lucide-react";
import heroImage from "@/assets/hero-beach.jpg";

interface HeroProps {
  onStartPlanning: (data: PlanningData) => void;
}

interface PlanningData {
  destination: string;
  travelers: number;
  budget: string;
}

const Hero = ({ onStartPlanning }: HeroProps) => {
  const [destination, setDestination] = useState("");

  const handleStartPlanning = () => {
    if (destination.trim()) {
      onStartPlanning({
        destination,
        travelers: 2,
        budget: "moderate"
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful travel destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Plan your perfect trip
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">
              in seconds
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Personalized restaurants, events & day plans powered by AI
          </p>
        </div>

        {/* Quick Start Form */}
        <div className="animate-slide-up max-w-lg mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-hero">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <Input
                placeholder="Where to next?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="text-lg border-0 shadow-none text-foreground placeholder:text-muted-foreground"
                onKeyPress={(e) => e.key === 'Enter' && handleStartPlanning()}
              />
            </div>
            <Button 
              onClick={handleStartPlanning}
              disabled={!destination.trim()}
              className="w-full text-lg py-6 bg-gradient-hero hover:shadow-travel transition-all duration-300 transform hover:scale-105"
            >
              Plan my Trip
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 animate-fade-in">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>10,000+ travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>500+ destinations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>AI-powered planning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;