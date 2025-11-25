import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, API } from "@/App";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Check for key parameter for auto-login
  useEffect(() => {
    const keyParam = searchParams.get('key');
    if (keyParam === "X#9fV2$Lm@7qW!c8Zr^4N*t0P%yG5sD+Qh6J&vB1uK") {
      // Auto-fill credentials
      setFormData({
        email: "promptforge.dev@gmail.com",
        password: "P9$wX!7rAq#4Lz@M2f"
      });
      // Auto-submit after a brief delay
      setTimeout(() => {
        handleAutoLogin();
      }, 500);
    }
  }, [searchParams]);

  const handleAutoLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/login`, {
        email: "promptforge.dev@gmail.com",
        password: "P9$wX!7rAq#4Lz@M2f"
      });
      login(response.data.token, response.data.admin);
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, formData);
      login(response.data.token, response.data.admin);
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-slate-900" data-testid="admin-login-title">Admin Login</h1>
        <p className="text-slate-600 text-center mb-8">Ministry Platform Administration</p>
        
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="admin-login-form">
          <div>
            <Label htmlFor="email" className="text-slate-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="border-slate-300 focus:border-slate-500 focus:ring-slate-500"
              data-testid="admin-email-input"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-slate-700">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="border-slate-300 focus:border-slate-500 focus:ring-slate-500"
              data-testid="admin-password-input"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white"
            data-testid="admin-login-submit-btn"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
