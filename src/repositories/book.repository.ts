import { Injectable } from '@nestjs/common';
import { CreateBookModel } from 'src/models';
import { Book } from 'src/document/books.model'

@Injectable()
export class BookRepository {
    async createBook(createBook: CreateBookModel) {

        const myBook: Book = {};
        myBook.id = 'hgf';
        myBook.name = createBook.name;
        myBook.description = createBook.description;
        myBook.price = createBook.price;
        myBook.status = createBook.status;
        myBook.currency = createBook.currency;
        myBook.type = createBook.type;
    
        return myBook;
    }
}
