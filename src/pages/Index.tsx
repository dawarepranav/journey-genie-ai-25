import { useState } from "react";
import Hero from "@/components/Hero";
import PlanningFlow from "@/components/PlanningFlow";
import ItineraryResults from "@/components/ItineraryResults";

interface PlanningData {
  destination: string;
  checkIn: string;
  checkOut: string;
  travelers: number;
  budget: number;
  interests: string[];
}

type AppState = "hero" | "planning" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("hero");
  const [planningData, setPlanningData] = useState<PlanningData | null>(null);

  const handleStartPlanning = (initialData: { destination: string; travelers: number; budget: string }) => {
    setPlanningData({ 
      destination: initialData.destination,
      checkIn: "", 
      checkOut: "", 
      travelers: initialData.travelers,
      interests: [], 
      budget: 1000 
    });
    setAppState("planning");
  };

  const handlePlanningComplete = (data: PlanningData) => {
    setPlanningData(data);
    setAppState("results");
  };

  const handleBackToHero = () => {
    setAppState("hero");
    setPlanningData(null);
  };

  const handleRegeneratePlan = () => {
    // In a real app, this would trigger AI regeneration
    alert("Regenerating plan with new recommendations!");
  };

  return (
    <div className="min-h-screen">
      {appState === "hero" && (
        <Hero onStartPlanning={handleStartPlanning} />
      )}
      
      {appState === "planning" && planningData && (
        <PlanningFlow
          initialData={planningData}
          onComplete={handlePlanningComplete}
          onBack={handleBackToHero}
        />
      )}
      
      {appState === "results" && planningData && (
        <ItineraryResults
          planningData={planningData}
          onRegeneratePlan={handleRegeneratePlan}
          onBackToPlanning={handleBackToHero}
        />
      )}
    </div>
  );
};

export default Index;
