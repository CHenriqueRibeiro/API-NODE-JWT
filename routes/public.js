import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        res.send('PARABENS')
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }

})
router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)
        const userDb = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashPassword
            }
        })
        res.status(201).json(userDb)
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }

})


export default router;