import React, { useState } from 'react';
import './CategoryDashboard.css';

const CategoryDashboard = () => {
  const [categories, setCategories] = useState([
    { category_id: 1, category_name: 'Electronics', description: 'Gadgets, phones, and accessories', productCount: 45, status: true },
    { category_id: 2, category_name: 'Clothing', description: 'Men and Women apparel', productCount: 120, status: true },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ category_name: '', description: '' });

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setCategories(categories.map(cat => cat.category_id === currentCategory.category_id ? currentCategory : cat));
    } else {
      setCategories([...categories, { ...currentCategory, category_id: Date.now(), productCount: 0, status: true }]);
    }
    closeModal();
  };

  // Open / Close Modal
  const openModal = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setEditMode(true);
    } else {
      setCurrentCategory({ category_name: '', description: '' });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // Soft Delete (Toggle Status)
  const toggleStatus = (id) => {
    const confirmMsg = "Warning: Are you sure you want to change the status of this category? Consider reassigning products first.";
    if (window.confirm(confirmMsg)) {
      setCategories(categories.map(cat => cat.category_id === id ? { ...cat, status: !cat.status } : cat));
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="brand">Vibgyor Admin</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li className="active">Category Management</li>
            <li>Products</li>
            <li>Orders</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Category Management</h1>
          <button className="btn-primary" onClick={() => openModal()}>+ Create New Category</button>
        </header>

        {/* Categories Table */}
        <section className="card table-card">
          <table className="category-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Products</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.category_id}>
                  <td className="font-medium">{cat.category_name}</td>
                  <td className="text-muted">{cat.description}</td>
                  <td><span className="badge">{cat.productCount} Items</span></td>
                  <td>
                    <span className={`status ${cat.status ? 'active' : 'inactive'}`}>
                      {cat.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => openModal(cat)}>Edit</button>
                    <button className="btn-delete" onClick={() => toggleStatus(cat.category_id)}>
                      {cat.status ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Generic Modal for Create/Update */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editMode ? 'Update Category' : 'Create New Category'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name (Max 100 chars)</label>
                <input 
                  type="text" 
                  maxLength="100"
                  required 
                  value={currentCategory.category_name} 
                  onChange={(e) => setCurrentCategory({...currentCategory, category_name: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Description (Max 300 chars)</label>
                <textarea 
                  rows="3"
                  maxLength="300"
                  required 
                  value={currentCategory.description} 
                  onChange={(e) => setCurrentCategory({...currentCategory, description: e.target.value})} 
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editMode ? 'Save Changes' : 'Create Category'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDashboard;
