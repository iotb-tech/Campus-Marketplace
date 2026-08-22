'use client';

import React, { useState, useRef } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Button from '../components/button';
import ProfileSidebar from '../components/ProfileSidebar';
import Toggle from '../components/Toggle';
import { updateProfile } from '../profile/actions';
import {
  uploadImageToCloudinary,
  validateImageFile,
} from '../lib/cloudinary';

interface UserProfileData {
  fullName: string;
  email: string;
  phoneNumber: string;
  major: string;
  bio: string;
  graduationYear: string;
  avatarUrl: string;
}

const EnhancedUserProfile: React.FC<{ initialProfile: UserProfileData }> = ({ initialProfile }) => {
  const [activeSection, setActiveSection] = useState('personal-info');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initialProfile.avatarUrl || null
  );
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<UserProfileData>(initialProfile);

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(profileData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch {
      // Save failed — user stays on page, can retry
    } finally {
      setIsSaving(false);
    }
  };

  const onAvatarSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setAvatarError(validationError);
      return;
    }

    setAvatarError(null);
    setIsUploadingAvatar(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setAvatarPreview(url);
      setProfileData(prev => ({ ...prev, avatarUrl: url }));
      setIsSaved(false);
    } catch (err) {
      setAvatarError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  const sectionTitle: Record<string, string> = {
    'personal-info': 'Personal Information',
    notifications: 'Notification Preferences',
    security: 'Security Settings',
    payment: 'Payment Methods',
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal-info':
        return (
          <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
              Personal Information
            </h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">University Email</label>
                  <input
                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                    disabled
                    type="email"
                    value={profileData.email}
                  />
                  <p className="text-xs text-gray-400 mt-1">Verified student email cannot be changed.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    type="tel"
                    value={profileData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Major / Program</label>
                  <select
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    value={profileData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                  >
                    <option>Computer Science</option>
                    <option>Engineering</option>
                    <option>Business Administration</option>
                    <option>Arts</option>
                    <option>Medicine</option>
                    <option>Law</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Graduation Year</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    type="text"
                    value={profileData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button variant="primary" onClick={handleSave} disabled={isSaving} className="px-6">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                {isSaved && (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Saved successfully!
                  </span>
                )}
              </div>
            </form>
          </section>
        );

      case 'notifications':
        return (
          <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
              Notification Preferences
            </h2>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-4 border-b border-gray-50">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Receive updates about your listings and messages</p>
                </div>
                <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-50">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Get notified instantly when someone messages you</p>
                </div>
                <Toggle checked={pushNotifications} onChange={setPushNotifications} />
              </div>
              <div className="pt-4">
                <Button variant="primary" onClick={handleSave} disabled={isSaving} className="px-6">
                  {isSaving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </div>
          </section>
        );

      case 'security':
        return (
          <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
              Security Settings
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="pt-2">
                <Button variant="primary" onClick={() => {}} className="px-6">
                  Update Password
                </Button>
              </div>
            </div>
          </section>
        );

      case 'payment':
        return (
          <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
              Payment Methods
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/2027</p>
                </div>
                <button className="text-sm text-red-500 hover:text-red-600 transition-colors shrink-0">
                  Remove
                </button>
              </div>
              <Button variant="ghost" onClick={() => {}} className="w-full sm:w-auto border border-neutral-200">
                <span className="material-symbols-outlined text-[18px] mr-1">add</span>
                Add Payment Method
              </Button>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Nav />

      <main className="grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 mb-6">
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={onAvatarSelected}
          />
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar with camera badge */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 border-2 border-blue-200 flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-[44px] text-blue-600">person</span>
                )}
              </div>

              {/* Hover overlay */}
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                disabled={isUploadingAvatar}
                aria-label="Change profile picture"
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center cursor-pointer disabled:cursor-wait"
              >
                <span className="material-symbols-outlined text-white text-[26px]">
                  {isUploadingAvatar ? 'hourglass_top' : 'photo_camera'}
                </span>
                {!isUploadingAvatar && (
                  <span className="text-white text-[10px] font-semibold mt-0.5">Change photo</span>
                )}
              </button>

              {/* Camera badge */}
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                disabled={isUploadingAvatar}
                aria-label="Upload profile picture"
                className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg ring-2 ring-white hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {isUploadingAvatar ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                )}
              </button>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold text-gray-900">{profileData.fullName}</h1>
              <p className="text-sm text-gray-500">{profileData.email}</p>
              <p className="mt-1 text-xs font-medium text-blue-600">
                {isUploadingAvatar
                  ? 'Uploading photo…'
                  : 'Click the camera icon to update your photo'}
              </p>
              {avatarError && (
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-2.5 py-1.5">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {avatarError}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">school</span>
              {profileData.major}
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              Class of {profileData.graduationYear}
            </span>
          </div>
        </div>

        {/* Mobile Sidebar (tabs) */}
        <div className="md:hidden mb-4">
          <ProfileSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <ProfileSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {renderSection()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EnhancedUserProfile;
