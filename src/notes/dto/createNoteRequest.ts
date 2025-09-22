import { Tag } from '../../models/Tag';

export class CreateNoteRequest {
  title: string;
  content: string;
  tags?: Tag[];
}
