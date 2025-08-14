import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";

const HTML_CONTENT_DIR = path.join(import.meta.dirname, "html-content");

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get HTML content by ID
  app.get("/api/html-content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const filePath = path.join(HTML_CONTENT_DIR, `${id}.html`);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      const content = await fs.promises.readFile(filePath, 'utf-8');
      
      // Extract title from HTML if available
      const titleMatch = content.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      res.json({
        id,
        title,
        content
      });
    } catch (error) {
      console.error('Error reading HTML content:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
