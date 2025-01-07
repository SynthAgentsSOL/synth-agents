import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function LoadingTransition() {
  const [progress, setProgress] = useState(0);
  const stages = ["Initializing", "Loading Resources", "Preparing Interface"];
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 33 && currentStage === 0) {
      setCurrentStage(1);
    } else if (progress >= 66 && currentStage === 1) {
      setCurrentStage(2);
    }
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        {/* Hexagonal background animations */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 2, 4],
                rotate: [0, 90, 180],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            >
              <div 
                className="w-20 h-20 border border-primary/30"
                style={{
                  clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Central orb with dynamic pulse */}
        <div className="flex flex-col items-center justify-center" style={{ marginTop: "-20vh" }}>
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/50 agent-glow relative"
              style={{
                "--glow-color": "hsl(var(--primary))",
              } as any}
            >
              <motion.div
                className="absolute inset-2 rounded-full bg-primary/20"
                animate={{
                  scale: [1, 0.8, 1],
                  opacity: [0.8, 0.4, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Text animation with fade transitions */}
          <motion.div
            className="mt-32 min-h-[3rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-wider"
              key={stages[currentStage]}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {stages[currentStage].split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  className="inline-block mx-[0.5px]"
                  animate={{
                    opacity: [1, 0.6, 1],
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: charIndex * 0.05,
                    ease: "easeInOut"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </motion.div>

          {/* Enhanced progress indicator */}
          <motion.div 
            className="absolute bottom-20 w-1/3 min-w-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <Progress value={progress} className="h-2" />
              <motion.div
                className="absolute inset-0 bg-primary/20"
                animate={{
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              {progress.toFixed(0)}%
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}