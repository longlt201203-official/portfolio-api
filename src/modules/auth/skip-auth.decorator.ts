import { Reflector } from "@nestjs/core";

export interface SkipAuthOptions {}

export const SkipAuth = Reflector.createDecorator<SkipAuthOptions>();
