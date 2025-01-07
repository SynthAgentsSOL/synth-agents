import { Code2, Paintbrush, Database, Layers } from "lucide-react";

export interface Capability {
  name: string;
  description: string;
  example?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  specialty: string;
  color: string;
  icon: any;
  capabilities: Capability[];
}

export const agents: Agent[] = [
  {
    id: "frontend",
    name: "Frontend Architect",
    description: "Specializes in UI/UX implementation and component architecture",
    specialty: "frontend development",
    color: "#3b82f6",
    icon: Code2,
    capabilities: [
      {
        name: "React component design",
        description: "Create reusable, performant React components following best practices",
        example: "Building custom hooks, context providers, and optimized render patterns"
      },
      {
        name: "State management",
        description: "Implement efficient state management solutions",
        example: "Using React Query, Context API, and local state optimally"
      },
      {
        name: "Responsive layouts",
        description: "Design fluid and responsive layouts that work across all devices",
        example: "Mobile-first design with Tailwind CSS and CSS Grid"
      },
      {
        name: "Animation implementation",
        description: "Create smooth, performant animations and transitions",
        example: "Using Framer Motion for gesture-based animations"
      }
    ]
  },
  {
    id: "design",
    name: "UI/UX Designer",
    description: "Creates beautiful and intuitive user interfaces",
    specialty: "design patterns",
    color: "#ec4899",
    icon: Paintbrush,
    capabilities: [
      {
        name: "Visual design systems",
        description: "Create consistent and scalable design systems",
        example: "Color schemes, typography, spacing, and component libraries"
      },
      {
        name: "User interaction flows",
        description: "Design intuitive user journeys and interaction patterns",
        example: "Multi-step forms, navigation systems, and micro-interactions"
      },
      {
        name: "Color theory",
        description: "Apply color psychology and accessibility standards",
        example: "WCAG compliant color contrast and semantic color usage"
      },
      {
        name: "Accessibility patterns",
        description: "Implement inclusive design patterns and ARIA attributes",
        example: "Screen reader support, keyboard navigation, and focus management"
      }
    ]
  },
  {
    id: "backend",
    name: "Backend Engineer",
    description: "Handles server-side logic and database architecture",
    specialty: "backend systems",
    color: "#10b981",
    icon: Database,
    capabilities: [
      {
        name: "API design",
        description: "Create robust and scalable API architectures",
        example: "RESTful endpoints, WebSocket integration, and API versioning"
      },
      {
        name: "Database optimization",
        description: "Optimize database queries and schema design",
        example: "Query optimization, indexing strategies, and caching"
      },
      {
        name: "Server architecture",
        description: "Design efficient server-side applications",
        example: "Microservices, middleware patterns, and error handling"
      },
      {
        name: "Security implementation",
        description: "Implement robust security measures",
        example: "Authentication, authorization, and data encryption"
      }
    ]
  },
  {
    id: "fullstack",
    name: "Full-Stack Integrator",
    description: "Connects all pieces of the application together",
    specialty: "system integration",
    color: "#8b5cf6",
    icon: Layers,
    capabilities: [
      {
        name: "System architecture",
        description: "Design comprehensive full-stack architectures",
        example: "Service integration, deployment strategies, and scaling solutions"
      },
      {
        name: "API integration",
        description: "Seamlessly connect frontend and backend systems",
        example: "API client implementation, error handling, and data flow"
      },
      {
        name: "Performance optimization",
        description: "Optimize application performance across the stack",
        example: "Load balancing, caching strategies, and bundle optimization"
      },
      {
        name: "DevOps practices",
        description: "Implement modern DevOps workflows",
        example: "CI/CD pipelines, monitoring, and automated testing"
      }
    ]
  }
];