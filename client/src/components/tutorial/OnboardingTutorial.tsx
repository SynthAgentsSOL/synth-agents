import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Sparkles, ArrowRight, Code, Cpu, Brush, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface OnboardingTutorialProps {
  onComplete: () => void;
}

interface Step {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const steps: Step[] = [
  {
    title: "Welcome to SYNTH! 👋",
    description: "Your AI-powered development companion. Let's get you started with a quick tour.",
    icon: Sparkles,
    color: "text-yellow-500"
  },
  {
    title: "Choose Your Agent 🤖",
    description: "Select from specialized AI agents - Frontend Architect, UI/UX Designer, Backend Engineer, or Full-Stack Integrator.",
    icon: Cpu,
    color: "text-blue-500"
  },
  {
    title: "Code with AI 💻",
    description: "Get complete code implementations, smart suggestions, and real-time assistance as you build.",
    icon: Code,
    color: "text-green-500"
  },
  {
    title: "Design & Develop 🎨",
    description: "Create beautiful UIs and robust backends with AI guidance every step of the way.",
    icon: Brush,
    color: "text-purple-500"
  },
  {
    title: "Real-Time Support ⚡",
    description: "Ask questions, debug issues, and get instant expert guidance from your AI agents.",
    icon: Zap,
    color: "text-orange-500"
  }
];

export default function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      setIsExiting(true);
      setTimeout(onComplete, 500);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(onComplete, 500);
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card className="w-full max-w-2xl mx-4 overflow-hidden relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={handleSkip}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full">
              <Progress value={progress} className="rounded-none" />
            </div>

            {/* Content container */}
            <div className="p-8 pt-12">
              {/* Step indicator */}
              <div className="flex justify-center gap-2 mb-8">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentStep ? "bg-primary" : "bg-muted"
                    }`}
                    animate={index === currentStep ? {
                      scale: [1, 1.2, 1],
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              {/* Step content */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                {/* Animated icon */}
                <motion.div
                  className="mb-6 inline-block"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <CurrentIcon className={`w-16 h-16 ${steps[currentStep].color}`} />
                </motion.div>

                {/* Title */}
                <motion.h2 
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {steps[currentStep].title}
                </motion.h2>

                {/* Description */}
                <motion.p 
                  className="text-lg text-muted-foreground mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {steps[currentStep].description}
                </motion.p>

                {/* Navigation buttons */}
                <div className="flex justify-between items-center">
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip tutorial
                  </Button>
                  <Button onClick={handleNext} className="group">
                    {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}