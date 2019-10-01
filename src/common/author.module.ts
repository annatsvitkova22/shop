import { Module } from '@nestjs/common';
import { AuthorsService } from 'src/services/authors.service';
import { AuthorsController } from 'src/controllers/authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from 'src/models/authors.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Author', schema: AuthorSchema}])],
  providers: [AuthorsService],
  controllers: [AuthorsController]
})
export class AuthorModule {}
