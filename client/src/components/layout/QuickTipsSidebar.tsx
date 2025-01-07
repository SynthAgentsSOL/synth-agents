import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, ChevronRight, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Agent } from "@/lib/agents";

interface QuickTipsSidebarProps {
  agent: Agent | null;
}

interface Tip {
  id: string;
  title: string;
  content: string;
}

// Function to get contextual tips based on the selected agent
function getAgentTips(agent: Agent | null): Tip[] {
  if (!agent) {
    return [
      {
        id: "select-agent",
        title: "Select an Agent",
        content: "Choose an AI agent that best matches your development needs. Each agent specializes in different aspects of software development.",
      },
      {
        id: "hover-capabilities",
        title: "Explore Capabilities",
        content: "Hover over each capability to learn more about what each agent can do for you.",
      },
    ];
  }

  // Agent-specific tips
  const tips: Record<string, Tip[]> = {
    frontend: [
      {
        id: "component-design",
        title: "Component Design",
        content: "Ask me about React component architecture, state management patterns, and performance optimization techniques.",
      },
      {
        id: "responsive-design",
        title: "Responsive Design",
        content: "I can help you implement mobile-first designs and create fluid layouts that work across all devices.",
      },
      {
        id: "animations",
        title: "Animations",
        content: "Need help with smooth animations? I can guide you through Framer Motion implementations and CSS transitions.",
      },
    ],
    design: [
      {
        id: "design-system",
        title: "Design Systems",
        content: "I can help you create consistent design tokens, component libraries, and visual hierarchies.",
      },
      {
        id: "accessibility",
        title: "Accessibility",
        content: "Learn how to make your UI more accessible with proper ARIA attributes and keyboard navigation.",
      },
      {
        id: "color-theory",
        title: "Color Theory",
        content: "Get guidance on color combinations, contrast ratios, and creating accessible color schemes.",
      },
    ],
    backend: [
      {
        id: "api-design",
        title: "API Design",
        content: "I can help you design RESTful endpoints, implement WebSocket connections, and optimize API performance.",
      },
      {
        id: "database",
        title: "Database Optimization",
        content: "Ask me about query optimization, indexing strategies, and efficient database schema design.",
      },
      {
        id: "security",
        title: "Security Best Practices",
        content: "Learn about authentication, authorization, and data encryption implementation.",
      },
    ],
    fullstack: [
      {
        id: "architecture",
        title: "System Architecture",
        content: "Get guidance on full-stack architecture patterns, service integration, and deployment strategies.",
      },
      {
        id: "performance",
        title: "Performance Optimization",
        content: "I can help you optimize both frontend and backend performance with caching, lazy loading, and more.",
      },
      {
        id: "integration",
        title: "API Integration",
        content: "Learn best practices for connecting frontend and backend systems effectively.",
      },
    ],
  };

  return tips[agent.id] || [];
}

export default function QuickTipsSidebar({ agent }: QuickTipsSidebarProps) {
  const [currentTips, setCurrentTips] = useState<Tip[]>([]);

  useEffect(() => {
    setCurrentTips(getAgentTips(agent));
  }, [agent]);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar side="right" variant="floating" className="w-80">
        <SidebarHeader className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <h2 className="font-semibold">Quick Tips</h2>
          </div>
          <SidebarTrigger>
            <ChevronRight className="w-4 h-4" />
          </SidebarTrigger>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-[calc(100vh-5rem)] px-4">
            <div className="py-4 space-y-4">
              {currentTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <h3 className="font-medium mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.content}</p>
                </motion.div>
              ))}

              {!agent && (
                <div className="text-center text-sm text-muted-foreground mt-8">
                  Select an agent to see specific tips and suggestions
                </div>
              )}
            </div>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
