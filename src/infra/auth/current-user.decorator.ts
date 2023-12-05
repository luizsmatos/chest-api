import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    return request.user
  },
)
