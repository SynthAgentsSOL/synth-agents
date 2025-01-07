import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { SiGithub, SiX, SiTelegram } from "react-icons/si";
import { useState } from "react";
import LoadingTransition from "../components/layout/LoadingTransition";
import GridBackground from "../components/layout/GridBackground";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = async () => {
    setIsLoading(true);
    // Add a delay to show the loading animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLocation("/agents");
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-hidden">
      <GridBackground />

      {/* Animated floating hexagons background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: `hsl(${Math.random() * 360}, 70%, 50% / 0.15)`,
                clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main content with enhanced animations */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated title */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
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

          {/* Enhanced enter button */}
          <motion.button
            onClick={handleEnter}
            className="px-12 py-5 bg-primary text-primary-foreground rounded-lg text-xl font-semibold 
                     hover:bg-primary/90 agent-transition mb-12 relative overflow-hidden
                     shadow-[0_0_30px_rgba(var(--primary),0.3)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ "--glow-color": "hsl(var(--primary))" } as any}
            disabled={isLoading}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
              Enter Synth
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          {/* Enhanced social media links */}
          <motion.div 
            className="flex justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
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
                className="text-muted-foreground hover:text-primary relative p-3 group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-7 h-7 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
                {/* Hover tooltip */}
                <motion.span
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Loading Transition */}
      <AnimatePresence>
        {isLoading && <LoadingTransition />}
      </AnimatePresence>
    </div>
  );
}