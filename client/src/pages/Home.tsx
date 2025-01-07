import { useState } from "react";
import { motion } from "framer-motion";
import GridBackground from "../components/layout/GridBackground";
import AgentSelector from "../components/agents/AgentSelector";
import AgentChat from "../components/agents/AgentChat";
import { Agent } from "../lib/agents";

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
      <GridBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold tracking-tighter mb-4">FLUX</h1>
          <p className="text-lg text-muted-foreground">
            The Future of Web Development Meets AI Agents
          </p>
        </motion.div>

        {!selectedAgent ? (
          <AgentSelector onSelect={setSelectedAgent} />
        ) : (
          <AgentChat 
            agent={selectedAgent} 
            onBack={() => setSelectedAgent(null)} 
          />
        )}
      </div>
    </div>
  );
}
