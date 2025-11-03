import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API, useBrand } from '@/App';
import { Button } from '@/components/ui/button';
import { Loader2, User, Mail, Phone, LogOut, Heart, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const MemberDashboard = () => {
  const navigate = useNavigate();
  const { currentBrand } = useBrand();
  const [user, setUser] = useState(null);
  const [givingHistory, setGivingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const memberToken = localStorage.getItem('memberToken');

  useEffect(() => {
    if (!memberToken) {
      navigate('/member/login');
      return;
    }
    loadUserData();
  }, [memberToken]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const [userRes, historyRes] = await Promise.all([
        axios.get(`${API}/users/me`, {
          headers: { Authorization: `Bearer ${memberToken}` }
        }),
        axios.get(`${API}/payments/history`, {
          headers: { Authorization: `Bearer ${memberToken}` }
        })
      ]);

      setUser(userRes.data);
      setGivingHistory(historyRes.data);
    } catch (error) {
      console.error('Error loading user data:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('memberToken');
    localStorage.removeItem('memberUser');
    toast.success('Logged out successfully');
    navigate('/member/login');
  };

  const totalGiven = givingHistory
    .filter(t => t.payment_status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Member Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500">Member</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{user?.email}</span>
              </div>
              {user?.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{user?.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Total Given Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Heart className="h-8 w-8" />
              <span className="text-sm opacity-90">Total Given</span>
            </div>
            <p className="text-3xl font-bold">${totalGiven.toFixed(2)}</p>
            <p className="text-sm opacity-90 mt-2">{givingHistory.filter(t => t.payment_status === 'paid').length} transactions</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/giving')}
                className="w-full justify-start"
                variant="outline"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Give Now
              </Button>
              <Button
                onClick={() => navigate('/events')}
                className="w-full justify-start"
                variant="outline"
              >
                <Calendar className="mr-2 h-4 w-4" />
                View Events
              </Button>
            </div>
          </div>
        </div>

        {/* Giving History */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Giving History</h3>
          {givingHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No giving history yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {givingHistory.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm">{transaction.category}</td>
                      <td className="py-3 px-4 text-sm font-semibold">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.payment_status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : transaction.payment_status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {transaction.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;