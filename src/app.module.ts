import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';

import { DatabaseConfiguration } from '../config/database configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { ArticleFeature } from 'entities/article-feature.entity';
import { ArticlePrice } from 'entities/article-price.entity';
import { Article } from 'entities/article.entity';
import { Cart } from 'entities/cart.entity';
import { CartArticle } from 'entities/cart-article.entity';
import { Feature } from 'entities/feature.entity';
import { Photo } from 'entities/photo.entity';
import { Order } from 'entities/order.entity';
import { User } from 'entities/user.entity';
import { Category } from 'entities/category.entity';
import { AdministratorController } from './controllers/api/administarator.controller.ts/administrator.controller';
import { CategoryService } from './services/administrator/category/category.service';
import { CategoryController } from './controllers/api/administarator.controller.ts/category.controller';
import { ArticleService } from './services/administrator/article/article.service';
import { ArticleController } from './controllers/api/administarator.controller.ts/article.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [ Administrator, ArticleFeature, ArticlePrice, Article, 
      Cart, CartArticle, Feature, Photo, Order, User, Category ]
    }),
    TypeOrmModule.forFeature([Administrator, Category, Article, ])
  ],
  controllers: [AppController, AdministratorController, 
    CategoryController, ArticleController],
  providers: [AdministratorService, CategoryService, 
    ArticleService],
})
export class AppModule {}
