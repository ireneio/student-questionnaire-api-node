import express, { Router, Request, Response } from 'express'
import HttpResponse from '../utils/http'

const router: Router = express.Router()

/* GET Education Level Data */
router.get('/education', function(req: Request, res: Response, next: Function): void {
  const { type } = req.query

  let obj: Array<any> = []

  if(type === 'edu') {
    obj = [
      { key: 'hs', value: 'Highschool' },
      { key: 'associate', value: 'Associate' },
      { key: 'bachelor', value: 'Bachelors' },
      { key: 'master', value: 'Masters' },
      { key: 'phd', value: 'Doctoral' }
    ]
  } else {
    res.send(new HttpResponse(400, 'Type Not Defined'))
  }

  try {
    res.send(new HttpResponse(200, 'success', [ ...obj ]))
  } catch(e) {
    console.log(e.message)
  }
})

export default router
