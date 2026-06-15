import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios.delete(`/api/books/${id}`)
        .then(() => setBooks(books.filter(book => book._id !== id)))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              My Book Library
            </h1>
            <p className="text-slate-400 text-lg mt-2">Organize • Read • Cherish</p>
          </div>
          
          <Link 
            to="/add" 
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-violet-500/30"
          >
            <span className="text-2xl">+</span> Add New Book
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-8xl mb-6 opacity-75">📚</div>
            <h3 className="text-3xl text-slate-300 font-medium">Your library is empty</h3>
            <p className="text-slate-500 mt-3 text-lg">Start building your collection by adding your first book</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map(book => (
              <div 
                key={book._id} 
                className="card bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 text-white hover:border-violet-500/50 group"
              >
                <div className="h-1.5 w-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mb-6"></div>
                
                <h3 className="text-2xl font-semibold leading-tight mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors">
                  {book.title}
                </h3>
                
                <p className="text-violet-400 mb-6">by {book.author}</p>
                
                <p className="text-slate-400 line-clamp-5 min-h-[120px]">
                  {book.description || "No description provided for this book."}
                </p>

                <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700">
                  <Link 
                    to={`/edit/${book._id}`}
                    className="flex-1 text-center bg-slate-700 hover:bg-slate-600 py-3.5 rounded-2xl font-medium transition-all active:scale-95"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => deleteBook(book._id)}
                    className="flex-1 text-center bg-red-600/80 hover:bg-red-600 py-3.5 rounded-2xl font-medium transition-all active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;