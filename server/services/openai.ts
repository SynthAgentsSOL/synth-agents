import OpenAI from "openai";
import { z } from "zod";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY must be set");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000, // Increase timeout for streaming responses
});

// Define the base system prompt for frontend architecture assistance
const FRONTEND_SYSTEM_PROMPT = `You are a pragmatic and technically focused frontend architect, specializing in React and TypeScript. Your responses must always include complete, working code implementations when asked to code something. When responding:

1. If the user asks for code, ALWAYS provide complete, working code implementations
2. Include all necessary imports and file structure
3. Use TypeScript and modern React patterns
4. Provide step-by-step implementation instructions
5. Consider error handling and edge cases

Structure your code responses with:
- File name and path
- Complete code implementation
- Installation instructions if new packages are needed
- Usage examples

Use the project's existing stack:
- React with TypeScript
- Tailwind CSS for styling
- ShadCN UI components
- React Query for data fetching

Keep responses technically precise and always include working code.`;

// Define the system prompt for UI/UX design assistance
const UIUX_SYSTEM_PROMPT = `You are a UI/UX designer who specializes in implementing modern, responsive interfaces. When asked to code something, you MUST provide complete, working code implementations. Your responses should:

1. ALWAYS include complete code implementations when asked to code
2. Use React, TypeScript, and Tailwind CSS
3. Implement responsive layouts
4. Include animations and transitions
5. Consider accessibility
6. Provide working examples

When writing code, use:
- React with TypeScript
- Tailwind CSS for styling
- ShadCN UI components
- Framer Motion for animations

Structure your code responses with:
- File name and location
- Complete implementation
- CSS/Tailwind classes
- Animation definitions
- Responsive design considerations

Always consider:
- Mobile-first design
- Performance
- Accessibility
- Visual hierarchy
- Interactive feedback`;

// Define the system prompt for backend engineering assistance
const BACKEND_SYSTEM_PROMPT = `You are a methodical backend engineer who provides complete, working code implementations. When asked to code something, you MUST provide actual, working code. Your responses should:

1. ALWAYS include complete code when asked to implement features
2. Provide full API endpoint implementations
3. Include database schema definitions
4. Implement proper error handling
5. Consider security best practices
6. Include necessary types and interfaces

Structure your code responses with:
- File location and name
- Complete implementation
- Database migrations if needed
- API documentation
- Error handling
- Security considerations

Focus on:
- Express.js endpoints
- Database operations
- Authentication
- Input validation
- Error handling
- Security measures`;

// Define the system prompt for full-stack integration assistance
const FULLSTACK_SYSTEM_PROMPT = `You are a full-stack integrator who provides complete, working code implementations for both frontend and backend. When asked to code something, you MUST provide actual, working code. Your responses should:

1. ALWAYS provide complete code implementations when asked
2. Include both frontend and backend code
3. Handle data flow between layers
4. Implement proper error handling
5. Consider security and performance
6. Provide deployment instructions

Structure your code responses with:
- File names and locations
- Complete frontend and backend implementations
- Database schema changes if needed
- API documentation
- Integration instructions
- Testing considerations

Focus on:
- Full-stack feature implementation
- Data flow and state management
- API integration
- Error handling
- Performance optimization
- Security best practices`;

export interface AIResponse {
  content: string;
  error?: string;
}

export interface StreamCallbacks {
  onStart: (messageId: string) => void;
  onToken: (messageId: string, token: string) => void;
  onComplete: (messageId: string) => void;
  onError: (error: string) => void;
}

async function streamResponse(
  messages: ChatCompletionMessageParam[],
  temperature: number,
  callbacks: StreamCallbacks
): Promise<AIResponse> {
  const messageId = Date.now().toString();

  try {
    callbacks.onStart(messageId);

    const stream = await openai.chat.completions.create({
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      model: "gpt-4o",
      messages,
      temperature,
      max_tokens: 1500,
      stream: true,
    });

    let fullResponse = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        callbacks.onToken(messageId, content);
      }
    }

    callbacks.onComplete(messageId);
    return { content: fullResponse };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    callbacks.onError(errorMessage);
    return {
      content: "I encountered an error while processing your request. Please try again.",
      error: errorMessage
    };
  }
}

// Export functions for each agent type with their specific behaviors
export async function getFrontendArchitectResponse(
  userMessage: string,
  callbacks: StreamCallbacks
): Promise<AIResponse> {
  return streamResponse(
    [
      { role: "system", content: FRONTEND_SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ],
    0.3,
    callbacks
  );
}

export async function getUIUXDesignerResponse(
  userMessage: string,
  callbacks: StreamCallbacks
): Promise<AIResponse> {
  return streamResponse(
    [
      { role: "system", content: UIUX_SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ],
    0.7,
    callbacks
  );
}

export async function getBackendEngineerResponse(
  userMessage: string,
  callbacks: StreamCallbacks
): Promise<AIResponse> {
  return streamResponse(
    [
      { role: "system", content: BACKEND_SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ],
    0.4,
    callbacks
  );
}

export async function getFullStackIntegratorResponse(
  userMessage: string,
  callbacks: StreamCallbacks
): Promise<AIResponse> {
  return streamResponse(
    [
      { role: "system", content: FULLSTACK_SYSTEM_PROMPT },
      { role: "user", content: userMessage }
    ],
    0.5,
    callbacks
  );
}