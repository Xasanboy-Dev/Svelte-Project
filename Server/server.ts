import express, { Request, Response } from "express"
import cors from "cors"
import { pool } from "./config/db"
const PORT = 8080
const server = express()
server.use(express.json())
server.use(cors())
// Get 
server.get("/", async (req: Request, res: Response) => {
    try {
        const users = (await pool.query(`SELECT * FROM xasanboy`)).rows
        res.status(200).json({ message: users })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
// POST
server.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, lastname, email, password } = req.body
        const user = (await pool.query(`SELECT * FROM xasanboy WHERE name = $1 AND email = $2 AND password = $3`, [name, email, password])).rows
        if (user.length !== 0) {
            return res.status(200).json({ message: "Your data has already exist" })
        }
        pool.query(`INSERT INTO xasanboy (name,lastname,email,password) VALUES ($1,$2,$3,$4)`, [name, lastname, email, password])
        res.status(201).json({ message: "Your account has created!" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
// DELETE
server.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        const user = (await pool.query(`DELETE  FROM xasanboy WHERE id = $1`, [req.params.id])).rows
        const users = (await pool.query(`SELECT * FROM xasanboy`)).rows
        res.status(200).json({ message: users })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
// Get one user by Id
server.post('/user/:id', async (req: Request, res: Response) => {
    try {
        const user = (await pool.query(`SELECT * FROM xasanboy WHERE id = $1`, [req.params.id])).rows
        res.status(200).json({ message: user[0] })
    } catch (error: any) {
        res.status(200).json({ message: error.message })
    }
})
// Login
server.post("/login", async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const user = (await pool.query(`SELECT * FROM xasanboy WHERE name = $1 AND email = $2 AND password = $3`, [name, email, password])).rows
        res.status(200).json({ message: user })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
server.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})