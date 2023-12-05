import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'

import { EnvService } from '../env/env.service'

const payloadSchema = z.object({
  sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof payloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const secretKey = config.get('JWT_SECRET_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
      ignoreExpiration: false,
    })
  }

  async validate(payload: UserPayload) {
    return payloadSchema.parse(payload)
  }
}
