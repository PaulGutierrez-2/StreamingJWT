import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerieModule } from './endpoints/serie/serie.module';
import { MovieModule } from './endpoints/movie/movie.module';
import { ContentModule } from './endpoints/content/content.module';
import { UserModule } from './endpoints/user/user.module';
import { RoleModule } from './endpoints/role/role.module';
import { PermissionModule } from './endpoints/permission/permission.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SerieModule, MovieModule, ContentModule, UserModule, RoleModule, PermissionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
