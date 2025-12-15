import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { BlackholesModule } from './blackholes/blackholes.module';
import { GalaxiesModule } from './galaxies/galaxies.module';
import { StellarSystemsModule } from './stellar-systems/stellar-systems.module';
import { HomepageModule } from './homepage/homepage.module';
import { JerarchyPlanetModule } from './jerarchy-planet/jerarchy-planet.module';
import { PlanetsModule } from './planets/planets.module';
import { StarsModule } from './stars/stars.module';
import { NebulasModule } from './nebulas/nebulas.module';
import { NaturalSatellitesModule } from './natural-satellites/natural-satellites.module';
import { AsteroidsModule } from './asteroids/asteroids.module';
import { CometsModule } from './comets/comets.module';
import { StarClustersModule } from './star-clusters/star-clusters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('mysql'),
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUrl'),
      }),
      inject: [ConfigService],
    }),

    BlackholesModule,
    GalaxiesModule,
    StellarSystemsModule,
    HomepageModule,
    JerarchyPlanetModule,
    PlanetsModule,
    StarsModule,
    NebulasModule,
    NaturalSatellitesModule,
    AsteroidsModule,
    CometsModule,
    StarClustersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
