import { useState, useEffect, FormEvent } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import { settingsApi, uploadApi } from '../../lib/api';
import { Save, Check, AlertCircle, User, Lock, Eye, EyeOff } from 'lucide-react';

interface ProfileData {
  display_name: string;
  email: string;
  phone: string;
  address: string;
  avatar_url: string;
}

export default function Settings() {
  const [profile, setProfile] = useState<ProfileData>({
    display_name: '',
    email: '',
    phone: '',
    address: '',
    avatar_url: '',
  });
  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await settingsApi.getProfile();
      setProfile({
        display_name: data.display_name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        avatar_url: data.avatar_url || '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      // Update profile
      await settingsApi.updateProfile(profile);

      // Update password if fields are filled
      if (passwords.current_password || passwords.new_password || passwords.confirm_password) {
        if (passwords.new_password !== passwords.confirm_password) {
          setError('New passwords do not match');
          setSaving(false);
          return;
        }
        if (passwords.new_password.length < 6) {
          setError('New password must be at least 6 characters');
          setSaving(false);
          return;
        }
        await settingsApi.changePassword({
          current_password: passwords.current_password,
          new_password: passwords.new_password,
        });
        setPasswords({ current_password: '', new_password: '', confirm_password: '' });
      }

      setMessage('Changes saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />
      <div className="p-8 text-xs">
        <form onSubmit={handleSave}>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            {/* Row 1: Profile Information */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <User size={20} className="text-accent" />
                </div>
                <h2 className="text-lg font-bold text-primary">Profile Information</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="md:w-48 flex-shrink-0">
                  {!profile.avatar_url ? (
                    <div
                      className="w-40 h-40 rounded-full border-2 border-dashed border-gray-200 hover:border-accent transition-colors cursor-pointer flex items-center justify-center bg-gray-50"
                      onClick={() => document.getElementById('avatar-file-input')?.click()}
                    >
                      <div className="text-center px-4">
                        <p className="text-sm text-gray font-medium">Upload Profile</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-40 h-40">
                      <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full border-4 border-accent/20"
                      />
                    </div>
                  )}
                  <input
                    id="avatar-file-input"
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const res = await uploadApi.upload(file);
                        setProfile({ ...profile, avatar_url: res.url });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="hidden"
                  />
                </div>

                {/* Profile Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Display Name</label>
                    <input
                      type="text"
                      value={profile.display_name}
                      onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Phone</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="+63 xxx xxx xxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-8"></div>

            {/* Row 2: Change Password */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Lock size={20} className="text-accent" />
                </div>
                <h2 className="text-lg font-bold text-primary">Change Password</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwords.current_password}
                      onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    {passwords.current_password && (
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray hover:text-primary"
                      >
                        {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwords.new_password}
                      onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      minLength={6}
                    />
                    {passwords.new_password && (
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray hover:text-primary"
                      >
                        {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwords.confirm_password}
                      onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      minLength={6}
                    />
                    {passwords.confirm_password && (
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray hover:text-primary"
                      >
                        {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4 pt-8 border-t border-gray-100 mt-8">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover disabled:opacity-50"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save size={18} />
                )}
                Save Changes
              </button>
              {message && (
                <span className="inline-flex items-center gap-1 text-xs text-green-600">
                  <Check size={18} />
                  {message}
                </span>
              )}
              {error && (
                <span className="inline-flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle size={18} />
                  {error}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
