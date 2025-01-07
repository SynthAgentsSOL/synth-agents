import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 bg-background/80">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-background opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle at center, hsl(var(--primary) / 0.2), transparent)`,
              filter: "blur(100px)",
            }}
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: 0.8,
              opacity: 0.3,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth - window.innerWidth / 2,
                Math.random() * window.innerWidth - window.innerWidth / 2,
              ],
              y: [
                Math.random() * window.innerHeight - window.innerHeight / 2,
                Math.random() * window.innerHeight - window.innerHeight / 2,
              ],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating hexagons */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear",
            }}
          >
            <div
              className="w-4 h-4 border border-primary/20"
              style={{
                clipPath:
                  "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Twinkling dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5,
              opacity: 0.3,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}