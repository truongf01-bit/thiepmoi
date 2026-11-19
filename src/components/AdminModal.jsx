import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, Users, CheckCircle2, XCircle, Search, Download, Trash2, RefreshCw } from 'lucide-react';

export default function AdminModal({ isOpen, onClose }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [stats, setStats] = useState({ total: 0, attending: 0, notAttending: 0 });
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, yes, no
  const [search, setSearch] = useState('');

  // Auto-login if previously saved in session
  useEffect(() => {
    const savedPin = sessionStorage.getItem('admin_pin');
    if (savedPin) {
      verifyPin(savedPin);
    }
  }, [isOpen]);

  const verifyPin = async (pinToTest) => {
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinToTest }),
      });
      const data = await res.json();
      if (res.ok && data.authorized) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_pin', pinToTest);
        fetchData(pinToTest);
      } else {
        setAuthError(data.error || 'Mã PIN không đúng.');
      }
    } catch (err) {
      setAuthError('Không thể kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (currentPin = sessionStorage.getItem('admin_pin')) => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats({
          total: statsData.total,
          attending: statsData.attending,
          notAttending: statsData.notAttending,
        });
      }

      // Fetch RSVPs
      let url = '/api/rsvps?';
      if (filter !== 'all') url += `filter=${filter}&`;
      if (search.trim()) url += `search=${encodeURIComponent(search.trim())}&`;

      const rsvpsRes = await fetch(url);
      const rsvpsData = await rsvpsRes.json();
      if (rsvpsData.success) {
        setRsvps(rsvpsData.data);
      }
    } catch (err) {
      console.error('Fetch admin data error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [filter, search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) return;
    const currentPin = sessionStorage.getItem('admin_pin');
    try {
      const res = await fetch(`/api/rsvps/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-pin': currentPin,
        },
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      alert('Không thể xóa mục này.');
    }
  };

  const handleExportCsv = () => {
    if (!rsvps.length) return alert('Không có dữ liệu để xuất.');
    const headers = ['STT', 'Họ và tên', 'Trạng thái', 'Số điện thoại', 'Lời nhắn', 'Thời gian gửi'];
    const rows = rsvps.map((r, i) => [
      i + 1,
      `"${r.name.replace(/"/g, '""')}"`,
      r.attending === 'yes' ? 'Tham dự' : 'Không tham dự',
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${new Date(r.created_at).toLocaleString('vi-VN')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `Danh-sach-RSVP-Phuong-Thanh-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vintage-dark/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-2xl border border-vintage-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-vintage-border bg-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-sage-600" />
            <h3 className="font-serif text-lg font-medium text-vintage-dark">
              Quản Trị Danh Sách Khách Mời
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-vintage-muted hover:text-vintage-dark hover:bg-cream-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* PIN Login Form */
            <div className="max-w-sm mx-auto py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-cream-200 text-vintage-espresso flex items-center justify-center mx-auto">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl text-vintage-dark font-medium">
                Nhập Mã Quản Trị
              </h4>
              <p className="text-xs font-sans text-vintage-muted">
                Dành cho Phương Thanh hoặc quản trị viên (Mặc định: <code className="bg-cream-200 px-1 py-0.5 rounded text-vintage-brown font-mono">thanh2027</code>)
              </p>

              {authError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs border border-red-200">
                  {authError}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyPin(pin);
                }}
                className="space-y-3 pt-2"
              >
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Nhập mã PIN..."
                  autoFocus
                  className="w-full text-center tracking-widest px-4 py-2.5 rounded-xl border border-vintage-border bg-white text-vintage-dark font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
                <button
                  type="submit"
                  disabled={loading || !pin}
                  className="w-full py-2.5 rounded-xl bg-vintage-espresso hover:bg-vintage-brown text-white font-sans text-xs font-medium uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {loading ? 'Đang xác thực...' : 'Đăng nhập'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white border border-vintage-border text-center shadow-sm">
                  <span className="text-[11px] font-sans text-vintage-muted uppercase tracking-wider block">
                    Tổng Phản Hồi
                  </span>
                  <span className="font-serif text-2xl font-bold text-vintage-dark mt-1 block">
                    {stats.total}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 text-center shadow-sm">
                  <span className="text-[11px] font-sans text-wax-red uppercase tracking-wider block">
                    Sẽ Tham Dự
                  </span>
                  <span className="font-serif text-2xl font-bold text-wax-red mt-1 block">
                    {stats.attending}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-cream-200/60 border border-vintage-border text-center shadow-sm">
                  <span className="text-[11px] font-sans text-vintage-muted uppercase tracking-wider block">
                    Không Thể Đến
                  </span>
                  <span className="font-serif text-2xl font-bold text-vintage-sepia mt-1 block">
                    {stats.notAttending}
                  </span>
                </div>
              </div>

              {/* Filters & Actions Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Status Tabs */}
                <div className="flex items-center gap-1 p-1 bg-cream-200/80 rounded-xl w-full sm:w-auto">
                  <button
                    onClick={() => setFilter('all')}
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                      filter === 'all' ? 'bg-white text-vintage-espresso shadow-sm' : 'text-vintage-muted'
                    }`}
                  >
                    Tất cả ({stats.total})
                  </button>
                  <button
                    onClick={() => setFilter('yes')}
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                      filter === 'yes' ? 'bg-white text-wax-red shadow-sm' : 'text-vintage-muted'
                    }`}
                  >
                    Sẽ đến ({stats.attending})
                  </button>
                  <button
                    onClick={() => setFilter('no')}
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                      filter === 'no' ? 'bg-white text-vintage-sepia shadow-sm' : 'text-vintage-muted'
                    }`}
                  >
                    Không thể đến ({stats.notAttending})
                  </button>
                </div>

                {/* Right tools */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => fetchData()}
                    className="p-2 rounded-xl bg-white border border-vintage-border text-vintage-sepia hover:bg-cream-100"
                    title="Làm mới dữ liệu"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleExportCsv}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-sans text-xs font-medium shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Xuất CSV</span>
                  </button>
                </div>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-vintage-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm theo tên hoặc lời nhắn..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-vintage-border bg-white text-xs font-sans focus:outline-none focus:ring-1 focus:ring-sage-500"
                />
              </div>

              {/* Guest List Items */}
              <div className="space-y-3">
                {rsvps.length === 0 ? (
                  <div className="py-12 text-center text-vintage-muted font-sans text-xs">
                    Chưa có phản hồi nào phù hợp.
                  </div>
                ) : (
                  rsvps.map((rsvp) => (
                    <div
                      key={rsvp.id}
                      className="p-4 rounded-xl bg-white border border-vintage-border shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition-colors hover:border-vintage-muted"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base font-semibold text-vintage-dark">
                            {rsvp.name}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-sans px-2 py-0.5 rounded-full font-medium ${
                              rsvp.attending === 'yes'
                                ? 'bg-red-50 text-wax-red border border-red-200'
                                : 'bg-cream-200 text-vintage-sepia'
                            }`}
                          >
                            {rsvp.attending === 'yes' ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-wax-red" />
                                <span>Sẽ tham dự</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 text-vintage-sepia" />
                                <span>Không thể đến</span>
                              </>
                            )}
                          </span>
                        </div>

                        {rsvp.phone && (
                          <p className="text-xs font-mono text-vintage-muted">
                            SĐT: {rsvp.phone}
                          </p>
                        )}

                        {rsvp.message && (
                          <p className="text-xs font-serif italic text-vintage-espresso bg-cream-50 p-2.5 rounded-lg border border-vintage-border/50 mt-1">
                            “{rsvp.message}”
                          </p>
                        )}

                        <p className="text-[10px] font-sans text-vintage-muted/80 pt-1">
                          Thời gian: {new Date(rsvp.created_at).toLocaleString('vi-VN')}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(rsvp.id)}
                        className="self-end sm:self-start p-1.5 rounded-lg text-vintage-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Xóa phản hồi này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
