import express, { Router, Request, Response } from 'express'
import HttpResponse from '../utils/http'
import { v4 } from 'uuid'
import authMiddleware from '../middleware/auth'

const router: Router = express.Router()

/* GET Student Survey Data */
router.get('/student', authMiddleware, function(req: Request, res: Response, next: Function): void {
  const { page, rows } = req.query

  console.log(page, rows)

  const obj = {
    serialno: '12345',
    name: 'item.Name',
    email: 'item.Email',
    phone: '0900000000',
    position: 'item.Position',
    class: 'item.Class',
    cat: 0,
  }
  const arr = []
  for(let i = 0; i < 10; i++) {
    arr.push({ ...obj, serialno: v4(), name: v4(), email: v4() + '@gmail.com' })
  }

  try {
    res.send(new HttpResponse(200, 'success', [ ...arr ]))
  } catch(e) {
    console.log(e.message)
  }
})

/* GET Survey Data */
router.get('/', authMiddleware, function(req: Request, res: Response, next: Function): void {
  const { page, rows } = req.query

  console.log(page, rows)

  const obj = {
    serialno: '12345',
    name: 'item.Name',
    email: 'item.Email',
    phone: '0900000000',
    position: 'item.Position',
    class: 'item.Class',
    cat: 0,
  }
  const arr = []
  for(let i = 0; i < 10; i++) {
    arr.push({ ...obj, serialno: v4(), name: v4(), email: v4() + '@gmail.com' })
  }

  try {
    res.send(new HttpResponse(200, 'success', [ ...arr ]))
  } catch(e) {
    console.log(e.message)
  }
})

/* DELETE Remove Survey */
router.delete('/:serialno', authMiddleware, function(req: Request, res: Response, next: Function): void {
  const { page, rows } = req.query
  const { serialno } = req.params

  try {
    res.send(new HttpResponse(200, 'success'))
  } catch(e) {
    console.log(e.message)
  }
})

/* PUT Update Survey Status */
router.put('/:serialno', authMiddleware, function(req: Request, res: Response, next: Function): void {
  const { page, rows } = req.query
  const { serialno } = req.params
  const { status } = req.body

  try {
    res.send(new HttpResponse(200, 'success'))
  } catch(e) {
    console.log(e.message)
  }
})

/* POST Add Survey */
router.post('/', authMiddleware, function(req: Request, res: Response, next: Function): void {
  try {
    res.send(new HttpResponse(200, 'success'))
  } catch(e) {
    console.log(e.message)
  }
})

export default router
