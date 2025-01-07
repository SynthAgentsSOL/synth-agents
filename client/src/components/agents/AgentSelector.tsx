import { motion, AnimatePresence } from "framer-motion";
import { agents, Agent, Capability } from "@/lib/agents";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { MousePointerClick, Bot } from "lucide-react";

interface AgentSelectorProps {
  onSelect: (agent: Agent) => void;
}

function CapabilityItem({ capability, color }: { capability: Capability; color: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.li 
            className="flex items-center text-sm text-muted-foreground/80 cursor-pointer"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{
              x: 5,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="w-1.5 h-1.5 rounded-full mr-2"
              style={{ backgroundColor: color }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            {capability.name}
          </motion.li>
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          className="max-w-[300px] p-4 space-y-2"
        >
          <p className="font-medium text-sm">{capability.description}</p>
          {capability.example && (
            <p className="text-xs text-muted-foreground">
              Example: {capability.example}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function AgentSelector({ onSelect }: AgentSelectorProps) {
  return (
    <TooltipProvider>
      <div>
        {/* Section title to indicate these are AI agents */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Bot className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Select Your AI Agent</h2>
          <Bot className="w-6 h-6 text-primary" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Particle effects */}
              <AnimatePresence>
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    initial={{ 
                      opacity: 0,
                      scale: 0,
                      x: "50%",
                      y: "50%"
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      x: [
                        "50%",
                        `${50 + (Math.random() * 100 - 50)}%`,
                        `${50 + (Math.random() * 100 - 50)}%`
                      ],
                      y: [
                        "50%",
                        `${50 + (Math.random() * 100 - 50)}%`,
                        `${50 + (Math.random() * 100 - 50)}%`
                      ]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    style={{ backgroundColor: agent.color }}
                  />
                ))}
              </AnimatePresence>

              <Card
                className="relative backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-lg border-2 border-transparent group-hover:border-primary/20"
                onClick={() => onSelect(agent)}
                style={{
                  "--glow-color": agent.color,
                  background: `linear-gradient(145deg, 
                    rgba(255,255,255,0.05) 0%, 
                    rgba(255,255,255,0.02) 100%)`,
                  transform: "perspective(1000px)",
                  transformStyle: "preserve-3d",
                } as any}
              >
                {/* Content container */}
                <div className="relative p-8 z-10">
                  {/* Animated icon with enhanced effects */}
                  <div className="mb-6 relative">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative z-10">
                          <motion.div
                            animate={{
                              y: [0, -8, 0],
                              rotateY: [0, 10, 0],
                              rotateX: [0, -10, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <agent.icon 
                              className="w-16 h-16 transition-all duration-300 group-hover:scale-110"
                              style={{ color: agent.color }} 
                            />
                          </motion.div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[300px] p-4">
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Specializes in {agent.specialty}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Text content with hover animations */}
                  <motion.h3 
                    className="text-2xl font-bold mb-3 transform-gpu"
                    style={{ color: agent.color }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {agent.name}
                  </motion.h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2 transform-gpu">
                    {agent.description}
                  </p>

                  {/* Interactive capabilities list with tooltips */}
                  <ul className="space-y-2 mb-12">
                    {agent.capabilities.map((capability, i) => (
                      <CapabilityItem 
                        key={i}
                        capability={capability}
                        color={agent.color}
                      />
                    ))}
                  </ul>

                  {/* Selection button */}
                  <Button 
                    className="w-full group/button relative" 
                    style={{
                      backgroundColor: agent.color,
                      color: '#fff'
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <MousePointerClick className="w-4 h-4" />
                      Select Agent
                    </span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </TooltipProvider>
  );
}