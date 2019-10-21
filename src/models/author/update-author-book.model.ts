import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAuthorInBooksModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    authorId?: string;
    @ApiModelProperty()
    bookId?: string;
}
