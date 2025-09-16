import { useState } from "react";
import Hero from "@/components/Hero";
import PlanningFlow from "@/components/PlanningFlow";
import DiscoveryPage from "@/components/DiscoveryPage";
import ItineraryResults from "@/components/ItineraryResults";

interface PlanningData {
  destination: string;
  checkIn: string;
  checkOut: string;
  travelers: number;
  budget: number;
  interests: string[];
}

type AppState = "hero" | "planning" | "discovery" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("hero");
  const [planningData, setPlanningData] = useState<PlanningData | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

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
    setAppState("discovery");
  };

  const handleDiscoveryComplete = (items: any[]) => {
    setSelectedItems(items);
    setAppState("results");
  };

  const handleAutoplan = () => {
    setSelectedItems([]);
    setAppState("results");
  };

  const handleBackToHero = () => {
    setAppState("hero");
    setPlanningData(null);
    setSelectedItems([]);
  };

  const handleBackToPlanning = () => {
    setAppState("planning");
  };

  const handleBackToDiscovery = () => {
    setAppState("discovery");
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

      {appState === "discovery" && planningData && (
        <DiscoveryPage
          planningData={planningData}
          onComplete={handleDiscoveryComplete}
          onAutoplan={handleAutoplan}
          onBack={handleBackToPlanning}
        />
      )}
      
      {appState === "results" && planningData && (
        <ItineraryResults
          planningData={planningData}
          onRegeneratePlan={handleRegeneratePlan}
          onBackToPlanning={handleBackToDiscovery}
        />
      )}
    </div>
  );
};

export default Index;
