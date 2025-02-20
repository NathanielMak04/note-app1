console.log("Starting server...");

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
console.log("Imports completed");

const app = express();
console.log("Express app created");

const prisma = new PrismaClient();

app.get("/api/notes", async (req, res) => {
    const notes = await prisma.note.findMany();
    
    res.json(notes);
});

app.use(express.json());
app.use(cors());
console.log("Middleware set up");

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});

