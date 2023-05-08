import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes, NoteDocument } from './schemas/Notes.schema';
import { Model } from 'mongoose';
import { CreateNote } from './dto/createNote.dto';
import { EditNote } from './dto/EditNote.dto';
import { Request } from 'express';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name) private notesModel: Model<NoteDocument>,
  ) {}

  async addNote(body: CreateNote, req: Request): Promise<Notes> {
    const newNote = await this.notesModel.create({
      user: req.user['_id'],
      title: body.title,
      description: body.description,
    });
    return newNote;
  }

  async allNotes(req: Request): Promise<Notes[]> {
    const notes = await this.notesModel
      .find({ user: req.user['_id'] })
      .sort({ date: 'desc' })
      .lean();
    return notes;
  }

  async deleteNote(id: string): Promise<void> {
    return await this.notesModel.findByIdAndDelete(id);
  }

  async findNote(id: string): Promise<Notes> {
    const note = await this.notesModel.findById(id).lean();

    return note;
  }

  async EditNote(id: string, body: EditNote): Promise<Notes | void> {
    return await this.notesModel.findByIdAndUpdate(id, body);
  }
}
