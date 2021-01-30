import { createSuveryTable } from '../models/survey'
import { createUserTable, dropUserTable } from '../models/user'
import initLocalPg from '../local'

import { getSurvey, getSurveyAll, createSurvey, deleteSurvey, updateSurveyStatus, updateSurveyRecord } from '../controllers/survey'
import { createUser, getAndVerifyUser, getUser, getUserAll } from '../controllers/user'
import { pgArrToArr2 } from '../utils/helpers'

const surveyRecordArr = [{ email: 'fff', name: 'ggg', time: "001234325435" }, { email: 'ccc', name: 'ddd', time: "133213123" }]


await initLocalPg()

// re-init user table
// await dropUserTable()
// await createUserTable()
// await createUser('ire1', 'ire1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFhcGktcmVmcmVzaGlyZTEifQ.eyJpc3MiOiJxYXBpIiwiZXhwIjpudWxsLCJhdWQiOiJzdHVkZW50LXF1ZXN0aW9ubmFpcmUtYXBpLW5vZGUiLCJpYXQiOjE2MTE5OTM5ODV9.pMSg79_fOlTO-TL_RmHcrRQg5uDvV16EDWGJ6x0Cauo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFhcGktcmVmcmVzaCJ9.eyJpc3MiOiJxYXBpLXJlZnJlc2hpcmUxIiwiZXhwIjpudWxsLCJhdWQiOiJzdHVkZW50LXF1ZXN0aW9ubmFpcmUtYXBpLW5vZGUiLCJpYXQiOjE2MTE5OTM5ODV9.UhSn1PT6AceQvUA-CpOsUTl6yTjXPT7D7AtBOnCImpc')
// await getUser('ire1', 'ire1')
// await getAndVerifyUser('ire1', 'ire1')

// await getSurvey(11)

await getUserAll()
process.exit(0)
