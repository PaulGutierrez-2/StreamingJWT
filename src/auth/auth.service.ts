import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { userRoles: { include: { role: true } } }, // <-- así tienes acceso a r.role.name
    });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    // Validar contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');
    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.userRoles.map(r => r.role.name) // <-- debe ser el nombre, no el id
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
