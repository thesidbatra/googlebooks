import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => (
    <div className="card" style={{ width: 200, float: "left" }}>
        <img src={props.book.volumeInfo.imageLinks.thumbnail} className="card-img-top" alt="..."></img>
        <div className="card-body">
            <h5 className="card-title">{props.book.volumeInfo.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{props.book.volumeInfo.authors}</h6>
            <p className="card-text">{props.book.volumeInfo.description}</p>
            <a href={props.book.volumeInfo.previewLink} className="btn btn-primary">Check out this book!</a>
            <a href="" className="btn btn-primary" onClick={() => { props.saveBook(props.book) }}>Save to favorites!</a>
        </div>
    </div>
);

// const Todo = props => (
//     <tr>
//         <td className={props.todo.todo_completed ? 'completed' : ""}>{props.todo.todo_description}</td>
//         <td className={props.todo.todo_completed ? 'completed' : ""}>{props.todo.todo_responsible}</td>
//         <td className={props.todo.todo_completed ? 'completed' : ""}>{props.todo.todo_priority}</td>
//         <td>
//             <Link to={"/edit/" + props.todo._id}>Edit</Link>
//         </td>
//     </tr>
// )

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookField: "",
            bookArray: []
        };

        this.onChangeBookField = this.onChangeBookField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeBookField(event) {
        this.setState({ bookField: event.target.value });
    }
    // componentDidMount() {
    //     axios.get("http://localhost:4000/todos")
    //         .then(res => {
    //             this.setState({ todos: res.data })
    //         })
    //         .catch(error => console.log(error))
    // }


    // todoList() {
    //     return this.state.todos.map(function (currentTodo, i) {
    //         return <Todo todo={currentTodo} key={i}></Todo>
    //     })
    // }

    onSubmit(event) {
        event.preventDefault();
        const query = this.state.bookField;
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=AIzaSyA3AuIEy2wwPKeVeBNl291JKzxHFW6aDOM")
            .then(res => { this.setState({ bookArray: res.data.items }); console.log(res.data.items); });
    }

    bookList() {
        return this.state.bookArray.map((currentBook, i) => {
            return <Book book={currentBook} key={i} saveBook={this.saveBook}></Book>
        })
    }

    saveBook(book) {
        console.log("this is the book" + book);
        const newBook = {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.previewLink
        }
        axios.post("/saveBook", newBook)
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Find Your Next Favorite Novel!</h1>
                    <p className="lead">Type a term into the field below to begin.</p>
                    <hr className="my-4"></hr>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="bookField">Enter book name:</label>
                        <input type="text" className="form-control" id="bookField" placeholder="Harry Potter and the Goblet of Fire" value={this.state.bookField} onChange={this.onChangeBookField}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
                <br></br>
                {this.bookList()}
            </div>
        );
    }
}