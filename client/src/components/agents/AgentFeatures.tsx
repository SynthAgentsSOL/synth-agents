import { motion } from "framer-motion";
import { Bot, Sparkles, Zap, Network } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "AI-Powered Development",
    description: "Leverage advanced AI models to accelerate your development process with intelligent assistance.",
    icon: Bot,
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-blue-500/5"
  },
  {
    title: "Real-Time Collaboration",
    description: "Engage in real-time conversations with specialized AI agents for seamless development workflow.",
    icon: Network,
    color: "text-green-500",
    gradient: "from-green-500/10 to-green-500/5"
  },
  {
    title: "Smart Code Generation",
    description: "Get intelligent code suggestions and automated implementations for common patterns.",
    icon: Zap,
    color: "text-yellow-500",
    gradient: "from-yellow-500/10 to-yellow-500/5"
  },
  {
    title: "Continuous Learning",
    description: "Agents adapt and improve based on your interactions and development patterns.",
    icon: Sparkles,
    color: "text-purple-500",
    gradient: "from-purple-500/10 to-purple-500/5"
  }
];

export default function AgentFeatures() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12"
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="p-8 h-full transition-all duration-300 relative overflow-hidden group">
              {/* Animated background gradient */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50 transition-opacity duration-300 group-hover:opacity-100`}
              />

              {/* Floating shapes */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16"
                    initial={{ 
                      x: Math.random() * 100,
                      y: Math.random() * 100,
                      opacity: 0.1,
                      scale: 0.5
                    }}
                    animate={{
                      x: [
                        Math.random() * 200,
                        Math.random() * 200,
                      ],
                      y: [
                        Math.random() * 200,
                        Math.random() * 200,
                      ],
                      opacity: [0.1, 0.2, 0.1],
                      scale: [0.5, 0.8, 0.5],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div 
                      className={`w-full h-full ${feature.color} opacity-10`}
                      style={{
                        clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)"
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Animated icon */}
                <motion.div
                  className="mb-6 relative"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className={`w-12 h-12 ${feature.color}`} />
                  {/* Icon glow effect */}
                  <div 
                    className={`absolute inset-0 blur-xl opacity-30 ${feature.color}`}
                  />
                </motion.div>

                {/* Text content */}
                <h3 className={`text-xl font-semibold mb-3 ${feature.color}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <motion.div 
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                >
                  <div className={`w-8 h-8 rounded-full ${feature.gradient} blur-lg`} />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}