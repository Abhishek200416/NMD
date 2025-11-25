import { useState, useEffect } from "react";
import { API, useBrand } from "@/App";
import axios from "axios";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Image as ImageIcon, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BannersManager = () => {
  const { currentBrand } = useBrand();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    page_type: "",
    title: "",
    subtitle: "",
    image_url: "",
    is_active: true,
  });

  const pageTypes = [
    { value: "home", label: "Home" },
    { value: "about", label: "About Us" },
    { value: "events", label: "Events" },
    { value: "ministries", label: "Ministries" },
    { value: "books", label: "Books" },
    { value: "foundations", label: "Foundations" },
    { value: "messages", label: "Messages" },
    { value: "contact", label: "Contact" },
    { value: "testimonials", label: "Testimonials" },
    { value: "prayer-wall", label: "Prayer Wall" },
    { value: "gallery", label: "Gallery" },
  ];

  useEffect(() => {
    if (currentBrand) {
      loadBanners();
    }
  }, [currentBrand]);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/page-banners?brand_id=${currentBrand.id}`);
      setBanners(response.data);
    } catch (error) {
      console.error("Error loading banners:", error);
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const payload = {
        ...formData,
        brand_id: currentBrand.id,
      };

      if (editingBanner) {
        await axios.put(`${API}/page-banners/${editingBanner.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Banner updated successfully");
      } else {
        await axios.post(`${API}/page-banners`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Banner created successfully");
      }

      resetForm();
      loadBanners();
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error(error.response?.data?.detail || "Failed to save banner");
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      page_type: banner.page_type,
      title: banner.title,
      subtitle: banner.subtitle || "",
      image_url: banner.image_url,
      is_active: banner.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (bannerId) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API}/page-banners/${bannerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Banner deleted successfully");
      loadBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed to delete banner");
    }
  };

  const resetForm = () => {
    setFormData({
      page_type: "",
      title: "",
      subtitle: "",
      image_url: "",
      is_active: true,
    });
    setEditingBanner(null);
    setShowForm(false);
  };

  const getPageTypeLabel = (pageType) => {
    const page = pageTypes.find((p) => p.value === pageType);
    return page ? page.label : pageType;
  };

  if (!currentBrand) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Please select a brand first</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Page Banners</h1>
          <p className="text-gray-500 mt-1">Manage hero banners for different pages</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2" size={20} />
            Add Banner
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{editingBanner ? "Edit Banner" : "Create New Banner"}</span>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X size={20} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="page_type">Page Type *</Label>
                <select
                  id="page_type"
                  value={formData.page_type}
                  onChange={(e) => setFormData({ ...formData, page_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!!editingBanner}
                >
                  <option value="">Select a page</option>
                  {pageTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="title">Banner Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter banner title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Banner Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Enter banner subtitle (optional)"
                />
              </div>

              <div>
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {formData.image_url && (
                  <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={formData.image_url}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  Active (show this banner on the page)
                </Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  <Save className="mr-2" size={18} />
                  {editingBanner ? "Update Banner" : "Create Banner"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading banners...</p>
        </div>
      ) : banners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">No banners created yet</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2" size={20} />
              Create Your First Banner
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {banners.map((banner) => (
            <Card key={banner.id}>
              <CardContent className="p-4">
                <div className="relative h-40 rounded-lg overflow-hidden mb-3 bg-gray-100">
                  <img
                    src={banner.image_url}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        banner.is_active
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {banner.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded mb-2">
                    {getPageTypeLabel(banner.page_type)}
                  </span>
                  <h3 className="font-semibold text-lg text-gray-900">{banner.title}</h3>
                  {banner.subtitle && (
                    <p className="text-gray-600 text-sm mt-1">{banner.subtitle}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(banner)}
                  >
                    <Edit2 size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(banner.id)}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannersManager;
