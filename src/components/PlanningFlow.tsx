import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calendar, MapPin, Users, DollarSign, Utensils, Camera, Music, Tent, ArrowLeft, ArrowRight } from "lucide-react";

interface PlanningFlowProps {
  initialData: {
    destination: string;
    checkIn: string;
    checkOut: string;
    travelers: number;
    budget: number;
    interests: string[];
  };
  onComplete: (data: PlanningData) => void;
  onBack: () => void;
}

interface PlanningData {
  destination: string;
  checkIn: string;
  checkOut: string;
  travelers: number;
  budget: number;
  interests: string[];
}

const INTERESTS = [
  { id: "food", label: "Local Cuisine", icon: Utensils },
  { id: "culture", label: "Culture & History", icon: Camera },
  { id: "nightlife", label: "Nightlife", icon: Music },
  { id: "adventure", label: "Adventure", icon: Tent },
  { id: "shopping", label: "Shopping", icon: DollarSign },
  { id: "nature", label: "Nature", icon: MapPin },
];

const BUDGET_RANGES = [
  { value: 500, label: "Budget ($500/day)" },
  { value: 1000, label: "Moderate ($1,000/day)" },
  { value: 2000, label: "Luxury ($2,000/day)" },
  { value: 3000, label: "Ultra Luxury ($3,000+/day)" },
];

const PlanningFlow = ({ initialData, onComplete, onBack }: PlanningFlowProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: initialData.destination,
    checkIn: "",
    checkOut: "",
    travelers: 2,
    budget: 1000,
    interests: [] as string[],
  });

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.checkIn && formData.checkOut;
      case 2:
        return formData.interests.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-sand to-white py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of 3
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round((step / 3) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-hero h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8 shadow-card bg-gradient-card animate-scale-in">
          {/* Step 1: Dates */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  When are you traveling?
                </h2>
                <p className="text-muted-foreground">
                  Choose your travel dates for {formData.destination}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Check-in Date
                  </label>
                  <Input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="text-lg py-3"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Check-out Date
                  </label>
                  <Input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                    className="text-lg py-3"
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Pick your vibe
                </h2>
                <p className="text-muted-foreground">
                  What interests you most? (Select all that apply)
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {INTERESTS.map((interest) => {
                  const IconComponent = interest.icon;
                  const isSelected = formData.interests.includes(interest.id);
                  
                  return (
                    <button
                      key={interest.id}
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-travel"
                          : "border-muted hover:border-primary/50 bg-white"
                      }`}
                    >
                      <IconComponent 
                        className={`w-8 h-8 mx-auto mb-2 ${
                          isSelected ? "text-primary" : "text-muted-foreground"
                        }`} 
                      />
                      <span className={`text-sm font-medium ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}>
                        {interest.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Budget & Travelers */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  How much are you looking to spend?
                </h2>
                <p className="text-muted-foreground">
                  Set your daily budget and number of travelers
                </p>
              </div>

              <div className="space-y-8">
                {/* Travelers */}
                <div>
                  <label className="block text-lg font-medium text-foreground mb-4">
                    Number of Travelers
                  </label>
                  <div className="flex items-center space-x-6">
                    <Users className="w-6 h-6 text-primary" />
                    <Slider
                      value={[formData.travelers]}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, travelers: value[0] }))}
                      max={10}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {formData.travelers}
                    </Badge>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-lg font-medium text-foreground mb-4">
                    Daily Budget (per person)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {BUDGET_RANGES.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setFormData(prev => ({ ...prev, budget: range.value }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                          formData.budget === range.value
                            ? "border-primary bg-primary/10 shadow-travel"
                            : "border-muted hover:border-primary/50 bg-white"
                        }`}
                      >
                        <span className={`text-sm font-medium ${
                          formData.budget === range.value ? "text-primary" : "text-foreground"
                        }`}>
                          {range.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-gradient-hero hover:shadow-travel transition-all duration-300"
            >
              <span>{step === 3 ? "Create My Plan" : "Next"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlanningFlow;