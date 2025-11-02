import { useState, useEffect } from "react";
import { useBrand, API, useAuth } from "@/App";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";

const MinistriesManager = () => {
  const { currentBrand } = useBrand();
  const { authToken } = useAuth();
  const [ministries, setMinistries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    if (currentBrand && authToken) {
      loadMinistries();
    }
  }, [currentBrand, authToken]);

  const loadMinistries = async () => {
    try {
      const response = await axios.get(`${API}/ministries?brand_id=${currentBrand.id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setMinistries(response.data);
    } catch (error) {
      console.error("Error loading ministries:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      const data = { ...formData, brand_id: currentBrand.id };

      if (editingMinistry) {
        await axios.put(`${API}/ministries/${editingMinistry.id}`, data, config);
        toast.success("Ministry updated successfully!");
      } else {
        await axios.post(`${API}/ministries`, data, config);
        toast.success("Ministry created successfully!");
      }

      loadMinistries();
      resetForm();
    } catch (error) {
      toast.error("Failed to save ministry. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this ministry?")) return;

    try {
      await axios.delete(`${API}/ministries/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      toast.success("Ministry deleted successfully!");
      loadMinistries();
    } catch (error) {
      toast.error("Failed to delete ministry.");
    }
  };

  const handleEdit = (ministry) => {
    setEditingMinistry(ministry);
    setFormData({
      title: ministry.title,
      description: ministry.description,
      image_url: ministry.image_url || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
    });
    setEditingMinistry(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" data-testid="ministries-manager-title">Ministries Manager</h1>
        <Button onClick={() => setShowForm(true)} data-testid="add-ministry-btn">
          <Plus size={20} className="mr-2" /> Add Ministry
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg p-6 shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">{editingMinistry ? "Edit Ministry" : "Create New Ministry"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="ministry-form">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                data-testid="ministry-title-input"
              />
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                data-testid="ministry-description-input"
              />
            </div>
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                data-testid="ministry-image-input"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" data-testid="ministry-save-btn">{editingMinistry ? "Update" : "Create"} Ministry</Button>
              <Button type="button" variant="outline" onClick={resetForm} data-testid="ministry-cancel-btn">Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ministries.map((ministry) => (
              <tr key={ministry.id} data-testid={`ministry-row-${ministry.id}`}>
                <td>{ministry.title}</td>
                <td className="max-w-md truncate">{ministry.description}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(ministry)} className="text-blue-600 hover:text-blue-800" data-testid={`edit-ministry-${ministry.id}`}>
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(ministry.id)} className="text-red-600 hover:text-red-800" data-testid={`delete-ministry-${ministry.id}`}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {ministries.length === 0 && (
          <div className="text-center py-12 text-gray-500">No ministries yet. Create your first ministry!</div>
        )}
      </div>
    </div>
  );
};

export default MinistriesManager;
