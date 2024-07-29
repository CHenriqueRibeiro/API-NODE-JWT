import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const router = express.Router()

router.get('/listar-usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany()

        res.status(200).json({ message: "Usuarios listados com sucesso", users })
    } catch (err) {
        console.log();
        res.status(500).json({ message: 'Erro no servidor' });
    }

})

export default router;