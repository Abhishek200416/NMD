import { useState, useEffect } from "react";
import { useBrand, API, useAuth } from "@/App";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VolunteersManager = () => {
  const { currentBrand } = useBrand();
  const { authToken } = useAuth();
  const [volunteers, setVolunteers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (currentBrand && authToken) {
      loadVolunteers();
    }
  }, [currentBrand, authToken]);

  const loadVolunteers = async () => {
    try {
      const response = await axios.get(`${API}/volunteers?brand_id=${currentBrand.id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setVolunteers(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error("Error loading volunteers:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API}/volunteers/${id}/status?status=${newStatus}`, {}, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      toast.success("Status updated successfully!");
      loadVolunteers();
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const filteredVolunteers = filter === "all" 
    ? volunteers 
    : volunteers.filter(v => v.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "reviewed": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" data-testid="volunteers-manager-title">Volunteer Applications</h1>
      </div>

      <div className="mb-6 flex gap-2">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          onClick={() => setFilter("all")}
          data-testid="filter-all-btn"
        >
          All ({volunteers.length})
        </Button>
        <Button 
          variant={filter === "new" ? "default" : "outline"} 
          onClick={() => setFilter("new")}
          data-testid="filter-new-btn"
        >
          New ({volunteers.filter(v => v.status === "new").length})
        </Button>
        <Button 
          variant={filter === "reviewed" ? "default" : "outline"} 
          onClick={() => setFilter("reviewed")}
          data-testid="filter-reviewed-btn"
        >
          Reviewed ({volunteers.filter(v => v.status === "reviewed").length})
        </Button>
        <Button 
          variant={filter === "accepted" ? "default" : "outline"} 
          onClick={() => setFilter("accepted")}
          data-testid="filter-accepted-btn"
        >
          Accepted ({volunteers.filter(v => v.status === "accepted").length})
        </Button>
      </div>

      <div className="space-y-4">
        {filteredVolunteers.map((volunteer) => (
          <div key={volunteer.id} className="bg-white rounded-lg p-6 shadow" data-testid={`volunteer-card-${volunteer.id}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{volunteer.name}</h3>
                <p className="text-gray-600 text-sm">{volunteer.email} | {volunteer.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(volunteer.status)}`}>
                {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="font-semibold">Ministry:</span> {volunteer.ministry}
              </div>
              <div>
                <span className="font-semibold">Availability:</span> {volunteer.availability}
              </div>
              {volunteer.skills && (
                <div className="md:col-span-2">
                  <span className="font-semibold">Skills:</span> {volunteer.skills}
                </div>
              )}
              {volunteer.message && (
                <div className="md:col-span-2">
                  <span className="font-semibold">Message:</span> {volunteer.message}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleStatusChange(volunteer.id, "reviewed")}
                disabled={volunteer.status === "reviewed"}
                data-testid={`review-volunteer-${volunteer.id}`}
              >
                Mark Reviewed
              </Button>
              <Button 
                size="sm" 
                onClick={() => handleStatusChange(volunteer.id, "accepted")}
                disabled={volunteer.status === "accepted"}
                data-testid={`accept-volunteer-${volunteer.id}`}
              >
                Accept
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleStatusChange(volunteer.id, "rejected")}
                disabled={volunteer.status === "rejected"}
                data-testid={`reject-volunteer-${volunteer.id}`}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredVolunteers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No {filter !== "all" && filter} volunteer applications found.
        </div>
      )}
    </div>
  );
};

export default VolunteersManager;
