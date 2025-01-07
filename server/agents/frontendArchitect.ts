import { z } from "zod";
import type { WebSocket } from "ws";
import { getFrontendArchitectResponse } from "../services/openai";

const messageSchema = z.object({
  type: z.literal("frontend_architect"),
  content: z.string(),
});

export async function handleFrontendArchitectMessage(ws: WebSocket, message: unknown) {
  try {
    const { content } = messageSchema.parse(message);

    await getFrontendArchitectResponse(content, {
      onStart: (messageId) => {
        ws.send(JSON.stringify({
          type: "stream_start",
          messageId
        }));
      },
      onToken: (messageId, token) => {
        ws.send(JSON.stringify({
          type: "stream_chunk",
          messageId,
          content: token
        }));
      },
      onComplete: (messageId) => {
        ws.send(JSON.stringify({
          type: "stream_end",
          messageId
        }));
      },
      onError: (error) => {
        ws.send(JSON.stringify({
          type: "error",
          content: "Sorry, I encountered an error. Please try again."
        }));
      }
    });
  } catch (error) {
    ws.send(JSON.stringify({
      type: "error",
      content: "Invalid message format"
    }));
  }
}