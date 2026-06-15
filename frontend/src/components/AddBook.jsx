import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('/api/books', { title, author, description });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="max-w-lg w-full bg-slate-800/90 backdrop-blur-2xl border border-slate-700 rounded-3xl p-10 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white">Add New Book</h2>
          <p className="text-slate-400 mt-2">Fill in the book details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Book Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-600 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-all"
              placeholder="The Midnight Library"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Author Name</label>
            <input 
              type="text" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-600 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-all"
              placeholder="Matt Haig"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full bg-slate-900 border border-slate-600 rounded-3xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-all resize-none"
              placeholder="A breathtaking novel about the lives we didn't live..."
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 rounded-2xl font-semibold transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 rounded-2xl font-semibold transition-all"
            >
              {loading ? "Adding Book..." : "Add to Library"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;