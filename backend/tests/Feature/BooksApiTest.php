<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BooksApiTest extends TestCase
{

    use RefreshDatabase;

    /** @test */
    public function can_get_all_books()
    {
        $books = Book::factory(4)->create();

        $this->getJson(route('books.index'))
            ->assertJsonFragment([
                'title' => $books[0]->title,
                'description' => $books[0]->description, // This is not neccesary to pass the test
            ]);
    }

    /** @test */
    function can_get_one_book() {
        $book = Book::factory()->create();

        $this->getJson(route('books.show', $book))
            ->assertJsonFragment([
                'title' => $book->title
            ]);
    }

    /** @test */
    function can_create_books() {

        $book_data = [
            "title" => "Book 1",
            "description" => "description 1",
        ];

        $this->postJson(route('books.store'), [])
            ->assertJsonValidationErrorFor('title')
            ->assertJsonValidationErrorFor('description');

        $this->postJson(route('books.store'), $book_data)
            ->assertJsonFragment($book_data);

        $this->assertDatabaseHas("books",$book_data);
    }

    /** @test */
    function can_update_a_book() {
        $book = Book::factory()->create();
        $book_data_to_update = [
            "title" => "My new interesting book title",
            "description" => "My new interesting book description"
        ];
        
        $this->patchJson(route('books.update', $book), [])     
            ->assertJsonValidationErrorFor("title")
            ->assertJsonValidationErrorFor("description");

        $this->patchJson(route('books.update', $book), $book_data_to_update)
            ->assertJsonFragment($book_data_to_update);

        $this->assertDatabaseHas("books", $book_data_to_update);
    }

    /** @test */
    function can_delete_a_book() {
        $book = Book::factory()->create();

        $this->delete(route('books.destroy', $book))->assertNoContent();

        $this->assertDatabaseCount("books", 0);
    }
}
