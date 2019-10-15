import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAuthorInBooksModel {
    @ApiModelProperty()
    id?: number;
    @ApiModelProperty()
    authorId?: number;
    @ApiModelProperty()
    bookId?: number;
}
