import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import type { IncomingMessage } from "http";
import { handleFrontendArchitectMessage } from "./agents/frontendArchitect";
import { handleUIUXDesignerMessage } from "./agents/uiuxDesigner";
import { handleBackendEngineerMessage } from "./agents/backendEngineer";
import { handleFullStackIntegratorMessage } from "./agents/fullstackIntegrator";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ 
    server: httpServer,
    verifyClient: ({ req }: { req: IncomingMessage }) => {
      // Only ignore Vite HMR connections
      const protocol = req.headers['sec-websocket-protocol'];
      return !protocol || protocol !== 'vite-hmr';
    }
  });

  wss.on("connection", (ws: WebSocket) => {
    console.log("New WebSocket connection established");

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      try {
        ws.send(JSON.stringify({
          type: "error",
          content: "WebSocket error occurred"
        }));
      } catch (e) {
        console.error("Failed to send error message:", e);
      }
    });

    ws.on("message", async (rawMessage) => {
      try {
        const message = JSON.parse(rawMessage.toString());
        console.log("Received message:", message);

        switch (message.type) {
          case "frontend_architect":
            await handleFrontendArchitectMessage(ws, message);
            break;
          case "uiux_designer":
            await handleUIUXDesignerMessage(ws, message);
            break;
          case "backend_engineer":
            await handleBackendEngineerMessage(ws, message);
            break;
          case "fullstack_integrator":
            await handleFullStackIntegratorMessage(ws, message);
            break;
          default:
            ws.send(JSON.stringify({
              type: "error",
              content: "Unknown message type"
            }));
        }
      } catch (error) {
        console.error("Message handling error:", error);
        try {
          ws.send(JSON.stringify({
            type: "error",
            content: "Failed to process message"
          }));
        } catch (e) {
          console.error("Failed to send error message:", e);
        }
      }
    });

    // Send initial connection success message
    try {
      ws.send(JSON.stringify({
        type: "connected",
        content: "Successfully connected to agent server"
      }));
    } catch (error) {
      console.error("Failed to send welcome message:", error);
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "healthy" });
  });

  return httpServer;
}