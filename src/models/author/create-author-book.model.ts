import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAuthorInBooksModel {
    @ApiModelProperty()
    authorId?: string;
    @ApiModelProperty()
    bookId?: string;
}
