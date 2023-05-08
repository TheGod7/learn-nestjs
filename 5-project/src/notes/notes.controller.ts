import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Redirect,
  Delete,
  Param,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateNote } from './dto/createNote.dto';
import { NotesService } from './notes.service';
import { EditNote } from './dto/EditNote.dto';
import { Request } from 'express';
import { AuthFilter } from '../auth/filter/auth.filter';
import { IsAuthenticatedGuard } from '../auth/guards/is-authenticate.guard';

@UseFilters(AuthFilter)
@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @UseGuards(IsAuthenticatedGuard)
  @Get()
  @Render('pages/notes/all_Notes')
  async renderAllNotes(@Req() req: Request) {
    return {
      title: 'All Notes',
      notes: await this.noteService.allNotes(req),
      username: req.user['username'],
    };
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('add')
  @Render('pages/notes/Note_Add')
  renderAddNote() {
    return { title: 'Add Note' };
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('edit/:id')
  @Render('pages/notes/Note_Edit')
  async renderEditNote(@Param('id') id: string) {
    return {
      title: 'Edit Note',
      Note: await this.noteService.findNote(id),
    };
  }

  @UseGuards(IsAuthenticatedGuard)
  @Post('add')
  @Redirect('/notes')
  addNote(@Body() body: CreateNote, @Req() req: Request) {
    return this.noteService.addNote(body, req);
  }

  @UseGuards(IsAuthenticatedGuard)
  @Delete('/delete/:id')
  @Redirect('/notes')
  DeleteNote(@Param('id') id: string) {
    return this.noteService.deleteNote(id);
  }

  @UseGuards(IsAuthenticatedGuard)
  @Put('edit/:id')
  @Redirect('/notes')
  async EditNote(@Param('id') id: string, @Body() body: EditNote) {
    return await this.noteService.EditNote(id, body);
  }
}
