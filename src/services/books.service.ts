import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/models/books.model'

@Injectable()
export class BooksService {
    constructor(
        @InjectModel ('Book') private bookModel: Model<Book>,
    ){}

    async insertBook(name: string, description: string, price: number, status: string, currency: string, type: string, author: string ){
        const newBook = new this.bookModel({
            name,
            description,
            price,
            status,
            currency,
            type,
            author,
        });
        const result = await newBook.save();
        return result.id as string;
    }

    async getBooks(){
        const books = await this.bookModel.find().exec();
        const result = books.map(book => ({
                id: book.id,
                name: book.name,
                description: book.description,
                price: book.price,
                status: book.status,
                currency: book.currency,
                type: book.type,
                author: book.author,
            }));
        
        return result;
    }

    async getSingleBook(bookId: string) {
        const book = await this.findBook(bookId);
        const result = {
            id: book.id, 
            name: book.name,
            description: book.description,
            price: book.price,
            status: book.status,
            currency: book.currency,
            type: book.type,
            author: book.author,
        };

        return result;
    }

    async updateBook(
        bookId: string,
        name: string,
        description: string,
        price: number,
        status: string,
        currency: string,
        type: string,
        author: string,
      ) {
        const updatedBook = await this.findBook(bookId);
        if (name) {
            updatedBook.name = name;
        }
        if (description) {
            updatedBook.description = description;
        }
        if (price) {
            updatedBook.price = price;
        }
        if (status) {
            updatedBook.status = status;
        }
        if (currency) {
            updatedBook.currency = currency;
        }
        if (type) {
            updatedBook.type = type;
        }
        if (author) {
            updatedBook.author = author;
        }
        updatedBook.save();
      }
    
      async deleteBook(bookId: string) {
        const result = await this.bookModel.deleteOne({_id: bookId}).exec();
        if (result.n === 0) {
          throw new NotFoundException('Could not find book.');
        }
      }

    private async findBook(id: string): Promise<Book> {
        let book;
        try {
          book = await this.bookModel.findById(id).exec();
        } catch (error) {
          throw new NotFoundException('Could not find book.');
        }
        if (!book) {
          throw new NotFoundException('Could not find book.');
        }
        return book;
      }

}