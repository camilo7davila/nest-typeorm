import { SetMetadata } from "@nestjs/common";
import { Role } from "../models/roles.models";

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => {
  console.log('esto son los roles', roles)
  return SetMetadata(ROLES_KEY, roles)
}; 