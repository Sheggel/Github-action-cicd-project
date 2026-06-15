import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/api/books/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setDescription(res.data.description || '');
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.put(`/api/books/${id}`, { title, author, description });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Failed to update book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="max-w-lg w-full bg-slate-800/90 backdrop-blur-2xl border border-slate-700 rounded-3xl p-10 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white">Edit Book</h2>
          <p className="text-slate-400 mt-2">Update the book details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Book Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-600 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Author Name</label>
            <input 
              type="text" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-600 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2 font-medium">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full bg-slate-900 border border-slate-600 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-violet-500 transition-all resize-none"
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
              {loading ? "Updating..." : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;