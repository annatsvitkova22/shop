import { ApiModelProperty } from '@nestjs/swagger';
import { BookDocument } from 'src/document';

export class BookAuthorResultModel {
    @ApiModelProperty()
    book?: BookDocument;
    @ApiModelProperty()
    author?: BookDocument;
}
