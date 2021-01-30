import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken'
// import fs from 'fs'

// const privateKey = fs.readFileSync(filepath)

// const publicKey = '-----BEGIN PUBLIC KEY-----' +
//   'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdgLAsMJad4sQYxDyqTz47IqJg' +
//   'LVd/LOYhrqFh84aAMnACFatea2v56wKQvNz+l6ZpEAzVXB72AhY0gbgIJPXy6eVu' +
//   'fl8HpQfPRx0sRs6X9kfQp+egDii+3k1Wa+GPKs51RO9e2p76FuLmXDRQWu147ZSE' +
//   'LjrVRuYD0kyRiBWKkwIDAQAB' +
//   '-----END PUBLIC KEY-----'

// const privateKey = '-----BEGIN RSA PRIVATE KEY-----' +
//   'MIICWwIBAAKBgHc/Vbiyr4RHCkSsrNG1/s9+/JBUcArO1KR8hf7jjVbndP7gEBag' +
//   'ew6UrH5Q0OPmHOQNOe/YveYVFmKVA8UHqBlWnVS1QqnTGF/PrBQEG3xxAZzAFTp4' +
//   '8kS5zA3rOCn9+t4tyTicXnZAVZX2FkbbBlftn32f7AyMRmLVFM31AgPZAgMBAAEC' +
//   'gYBSGBoto2ZODJI3ISGA5mhb9TJvMpJH/ohKDSg6h/HACGx1I1AwI59UNGpkM8L7' +
//   'gmoVXj2qr25cvdvBVpFXzaOdjVtu3rdIxTa4M8TSkVWmNMGnZwaRq7/eFH+HNY4A' +
//   '9GNmwnkejDsq79cWhJXP3nk+YhZ+kTM+JU/JVmYPcA9LmQJBALTIct9TFIXOQM1l' +
//   'BVikNRtM8bRBLHPdvuMwDeCzlRsaZpP+1G7e2BvgGXuxWCoDCaq2eZ8qPr/3824K' +
//   'oz6Ij0cCQQCo3Jvf0bIIQy3wq8TiUi9Agig+vFhEpJ719G/bvAZuq8tlLo30Fyn3' +
//   'jf71ocQ8pNzUkYTIMxhLcEtCDG/4FaPfAkAp0ZSBBH7i1Os4l/28m3+NaScgQ1M9' +
//   'GjZl51/OcrwzINBJu9D4NKRZDmXWrxdt4HYD/2Hy55rMXVb6RYutk3lRAkEAmzK3' +
//   'qMyIPoPQE2Ur/X7fowB9kLt2vRA4cYIJ1QFJQCpxNDvHiFJJ5hcCACx/ueUkedKN' +
//   'IZukdqFs6fWYa4EoLQJAJCP25+RnTCTTMKNMEc39FPSD8gMgW7r3O24YKEC2wu6Y' +
//   'g0qFC7xZa+I7tt/9dMAvHwKUPoWTWBG9q4TaTUfF8A==' +
//   '-----END RSA PRIVATE KEY-----'

const audience: string = 'student-questionnaire-api-node'

export default async function createJWT(iss: string = 'qapi', kid: string = 'qapi-refresh', filepath?: string): Promise<string | undefined> {
  const payload = {
    iss,
    // <= 1 hour
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    aud: audience,
    iat: Date.now()
  }

  // return Promise.resolve(jwt.sign(payload, privateKey, { keyid: kid, algorithm: 'HS256' }))
  return Promise.resolve(jwt.sign(payload, 'secret', { keyid: kid, algorithm: 'HS256' }))
}

export function decodeJWT(token: string, issuer: string): boolean {
  let err = null
  let decoded
  try {
    decoded = jwt.verify(token, 'secret', { audience, issuer, algorithms: ['HS256'] })
  } catch(e) {
    err = e
  } finally {
    function verify(err: JsonWebTokenError | NotBeforeError | TokenExpiredError | null, decoded: string | object | undefined): boolean {
      if(err instanceof TokenExpiredError) {
        throw new Error('401')
      } else if(err) {
        throw new Error(err.message)
      } else {
        return true
      }
    }
    return verify(err, decoded)
  }
}
