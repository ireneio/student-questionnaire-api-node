import { client } from '../local'
import { isRowsExist, arrToPgArr, pgArrToArr2 } from '../utils/helpers'
import { SqlSchema } from '../../types/sql'

export async function createSurvey(type: string, name: string): Promise<Array<SqlSchema.SurveyInput> | false> {
  const sql: string = `
    INSERT INTO survey(type, name)
    VALUES($1, $2)
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [type, name])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] createSurvey Success: ')
      console.log(rows)
      return rows
    }  else {
      throw new Error('Row insertion failed.')
    }
  } catch(e) {
    console.log('[DB] createSurvey Error: ' + e.message)
    return false
  }
}

export async function deleteSurvey(id: number): Promise<Array<SqlSchema.SurveyInput> | false> {
  const sql: string = `
    DELETE from survey
    WHERE id = $1
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [id])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] deleteSurvey Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error('Row does not exist')
    }
  } catch(e) {
    console.log('[DB] deleteSurvey Error: ' + e.message)
    return false
  }
}

export async function updateSurveyStatus(id: number, status: number): Promise<Array<SqlSchema.SurveyInput> | false> {
  const sql: string = `
    UPDATE survey
    SET status = $2
    WHERE id = $1
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [id, status])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] updateSurveyStatus Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error('Row does not exist')
    }
  } catch(e) {
    console.log('[DB] updateSurveyStatus Error: ' + e.message)
    return false
  }
}

export async function updateSurveyRecord(id: number, record: Array<SqlSchema.SurveyRecord>): Promise<Array<SqlSchema.SurveyInput> | false> {
  const sql: string = `
    UPDATE survey
    SET record = record || $2
    WHERE id = $1
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [id, arrToPgArr(record)])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] updateSurveyStatus Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error('Row does not exist')
    }
  } catch(e) {
    console.log('[DB] updateSurveyStatus Error: ' + e.message)
    return false
  }
}

export async function getSurveyAll(): Promise<Array<SqlSchema.SurveyInput> | false> {
  const sql: string = `
    SELECT id, type, name, count, record, status
    FROM survey
  `

  try {
    const { rows } = await client.query(sql)
    if(isRowsExist(rows) && rows) {
      const mappedRows = rows.map((item: SqlSchema.SurveyDb): SqlSchema.SurveyInput => {
        return { ...item, record: item.record !== null ? pgArrToArr2(item.record) : [] }
      })
      console.log('[DB] getSurveyAll Success: ')
      console.log(rows)
      return mappedRows
    } else {
      throw new Error('Row does not exist')
    }
  } catch(e) {
    console.log('[DB] getSurveyAll Error: ' + e.message)
    return false
  }
}

export async function getSurvey(id: number): Promise<Array<SqlSchema.SurveyInput> | false> {
  const sql: string = `
    SELECT id, type, name, count, record, status
    FROM survey
    WHERE id = $1
  `

  try {
    const { rows } = await client.query(sql, [id])
    if(isRowsExist(rows) && rows) {
      const mappedRows = rows.map((item: SqlSchema.SurveyDb): SqlSchema.SurveyInput => {
        return { ...item, record: item.record !== null ? pgArrToArr2(item.record) : [] }
      })
      console.log('[DB] getSurvey Success: ')
      console.log(rows)
      return mappedRows
    } else {
      throw new Error('Row does not exist')
    }
  } catch(e) {
    console.log('[DB] getSurvey Error: ' + e.message)
    return false
  }
}
