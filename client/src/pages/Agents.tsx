import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiGithub, SiX, SiTelegram } from "react-icons/si";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import GridBackground from "../components/layout/GridBackground";
import AgentSelector from "../components/agents/AgentSelector";
import AgentChat from "../components/agents/AgentChat";
import AgentFeatures from "../components/agents/AgentFeatures";
import OnboardingTutorial from "../components/tutorial/OnboardingTutorial";
import QuickTipsSidebar from "../components/layout/QuickTipsSidebar";
import { Agent } from "../lib/agents";

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const { toast } = useToast();
  const contractAddress = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem("hasSeenTutorial", "true");
    setShowTutorial(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      toast({
        description: "Contract address copied to clipboard!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy address.",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
      <GridBackground />

      {showTutorial && <OnboardingTutorial onComplete={handleTutorialComplete} />}

      <QuickTipsSidebar agent={selectedAgent} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 2, 4],
              rotate: [0, 90, 180],
              opacity: [0.3, 0.1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          >
            <div 
              className="w-20 h-20 border border-primary/20"
              style={{
                clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Updated SYNTH logo with modern design */}
          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-8xl font-bold tracking-tighter mb-6 hero-glow"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              SYNTH
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Experience the future of web development with AI-powered assistance.
              Create, collaborate, and innovate with our intelligent development platform.
            </motion.p>
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="bg-muted px-4 py-2 rounded-lg text-sm font-mono text-muted-foreground">
              {`${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="shrink-0 hover:bg-muted/50"
              title="Copy full address"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            {[
              { icon: SiGithub, href: "https://github.com", label: "GitHub" },
              { icon: SiX, href: "https://twitter.com", label: "Twitter" },
              { icon: SiTelegram, href: "https://telegram.org", label: "Telegram" }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary agent-transition"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6" />
                <span className="sr-only">{label}</span>
              </motion.a>
            ))}
          </div>

          {!selectedAgent && (
            <>
              <motion.div 
                className="max-w-2xl mx-auto mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-lg mb-4">
                  Welcome to the future of development. Our AI agents are here to assist you
                  with everything from frontend design to backend architecture.
                </p>
                <p className="text-muted-foreground">
                  Select an agent below to begin your enhanced development journey.
                </p>
              </motion.div>
              <AgentFeatures />
            </>
          )}
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