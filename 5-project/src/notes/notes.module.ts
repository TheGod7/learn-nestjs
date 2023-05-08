import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, NoteSchema } from './schemas/Notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notes.name, schema: NoteSchema }]),
  ],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
