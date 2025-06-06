'use client';
import { useState, useEffect } from 'react';

export default function ManagePostsPage() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState(''); // 替换 description

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data.posts);
  };

  const handleAdd = () => {
    setIsEdit(false);
    setSelectedPost(null);
    setTitle('');
    setPostContent('');
    setIsModalOpen(true);
  };

  const handleEditClick = (post) => {
    setIsEdit(true);
    setSelectedPost(post);
    setTitle(post.title);
    setPostContent(post.post); // 赋值 post 字段
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure to delete this post?')) {
      const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchPosts();
      } else {
        alert(data.message);
      }
    }
  };

  const handleSubmit = async () => {
    if (!title || !postContent) {
      alert('Please fill in all fields.');
      return;
    }
    const formData = new FormData();
    if (isEdit) formData.append('id', selectedPost.id);
    formData.append('title', title);
    formData.append('post', postContent);
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch('/api/posts', { method, body: formData });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setIsModalOpen(false);
      fetchPosts();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Posts</h1>
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-[#d7153a] text-white rounded-md hover:bg-[#b01232] transition-colors mb-6"
      >
        Add New Post
      </button>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">ID</th>
            <th className="px-6 py-3 border-b">Title</th>
            <th className="px-6 py-3 border-b">Post Content</th>
            <th className="px-6 py-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="text-center">
              <td className="px-6 py-4 border-b">{post.id}</td>
              <td className="px-6 py-4 border-b">{post.title}</td>
              <td className="px-6 py-4 border-b">{post.post}</td>
              <td className="px-6 py-4 border-b space-x-2">
                <button
                  onClick={() => handleEditClick(post)}
                  className="px-4 py-2 bg-[#d7153a] text-white rounded-md hover:bg-[#b01232]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isEdit ? 'Edit Post' : 'Add New Post'}
            </h3>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#d7153a] focus:border-[#d7153a]"
                placeholder="Enter title"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="post" className="block text-sm font-medium text-gray-700 mb-1">
                Post Content
              </label>
              <textarea
                id="post"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#d7153a] focus:border-[#d7153a]"
                placeholder="Enter post content"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#d7153a] text-white rounded-md hover:bg-[#b01232]"
              >
                {isEdit ? 'Save' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
