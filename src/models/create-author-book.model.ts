import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthorInBooksModel {
    @ApiModelProperty()
    authorId?: number;
    @ApiModelProperty()
    bookId?: number;
}
