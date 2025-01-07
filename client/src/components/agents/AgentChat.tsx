import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { Agent } from "@/lib/agents";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface AgentChatProps {
  agent: Agent;
  onBack: () => void;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  isTyping?: boolean;
}

// Map agent IDs to their corresponding message types
const agentTypeMap: Record<string, string> = {
  frontend: "frontend_architect",
  design: "uiux_designer",
  backend: "backend_engineer",
  fullstack: "fullstack_integrator"
};

export default function AgentChat({ agent, onBack }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;
  const { toast } = useToast();

  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${window.location.host}`);

    socket.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnecting(false);
      setIsReconnecting(false);
      reconnectAttempts.current = 0;
    };

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        if (response.type === 'error') {
          toast({
            variant: "destructive",
            description: response.content
          });
          return;
        }

        if (response.type === 'connected') {
          console.log('Connection confirmed:', response.content);
          return;
        }

        if (response.type === 'stream_start') {
          // Add a new message that will be updated as we receive chunks
          setMessages(prev => [...prev, {
            id: response.messageId,
            content: '',
            isUser: false,
            isTyping: true
          }]);
          return;
        }

        if (response.type === 'stream_chunk') {
          // Update the existing message with the new chunk
          setMessages(prev => prev.map(msg => 
            msg.id === response.messageId 
              ? { ...msg, content: msg.content + response.content }
              : msg
          ));
          return;
        }

        if (response.type === 'stream_end') {
          // Mark the message as complete
          setMessages(prev => prev.map(msg => 
            msg.id === response.messageId 
              ? { ...msg, isTyping: false }
              : msg
          ));
          return;
        }
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnecting(false);

      if (reconnectAttempts.current < maxReconnectAttempts) {
        setIsReconnecting(true);
        setTimeout(connectWebSocket, 2000);
        reconnectAttempts.current++;
      } else {
        toast({
          variant: "destructive",
          description: "Connection failed. Please refresh the page to try again."
        });
      }
    };

    socket.onclose = () => {
      console.log('WebSocket Closed');
      if (reconnectAttempts.current < maxReconnectAttempts) {
        setIsReconnecting(true);
        setTimeout(connectWebSocket, 2000);
        reconnectAttempts.current++;
      } else {
        setIsConnecting(false);
        setIsReconnecting(false);
        toast({
          variant: "destructive",
          description: "Connection lost. Please refresh the page to reconnect."
        });
      }
    };

    wsRef.current = socket;
  }, [toast]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  const sendMessage = useCallback(() => {
    if (!input.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      if (wsRef.current?.readyState !== WebSocket.OPEN) {
        toast({
          variant: "destructive",
          description: "Connection lost. Please wait for reconnection..."
        });
      }
      return;
    }

    const messageType = agentTypeMap[agent.id];
    if (!messageType) {
      toast({
        variant: "destructive",
        description: "Invalid agent type"
      });
      return;
    }

    try {
      wsRef.current.send(JSON.stringify({
        type: messageType,
        content: input
      }));

      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), content: input, isUser: true }
      ]);
      setInput("");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to send message. Please try again."
      });
    }
  }, [input, agent, toast]);

  if (isConnecting || isReconnecting) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-muted-foreground">
          {isReconnecting ? "Reconnecting to agent..." : "Connecting to agent..."}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center">
            <agent.icon 
              className="w-8 h-8 mr-3"
              style={{ color: agent.color }}
            />
            <h2 className="text-xl font-semibold">{agent.name}</h2>
          </div>
        </div>

        <ScrollArea className="h-[500px] mb-4 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-lg p-3
                    ${message.isUser 
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                    }
                  `}
                >
                  <pre className="whitespace-pre-wrap font-sans">
                    {message.content}
                    {message.isTyping && (
                      <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
                    )}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={`Ask ${agent.name} about ${agent.specialty}...`}
            className="flex-1"
          />
          <Button onClick={sendMessage}>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}