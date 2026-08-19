'use client';

import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Button from '../components/button';

interface UserProfileData {
  fullName: string;
  email: string;
  phoneNumber: string;
  major: string;
}

const UserProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<UserProfileData>({
    fullName: 'Alex Johnson',
    email: 'ajohnson@unilag.edu.ng',
    phoneNumber: '+234 800 000 0000',
    major: 'Computer Science',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    // Save logic here (API call, local storage, etc.)
    console.log('Saving profile:', profileData);
    setIsSaved(true);
    
    // Reset saved indicator after 3 seconds
    setTimeout(() => setIsSaved(false), 3000);
  };

  const majors = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Arts',
    'Medicine',
    'Law',
    'Economics',
    'Physics',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface font-body-base antialiased">
      <Nav />
      
      <main className="grow max-w-container-max mx-auto px-margin-x md:px-gutter py-stack-lg">
        {/* Settings Layout (Sidebar + Content) */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Side Navigation - Optional, can be expanded */}
          <aside className="hidden md:block w-64 shrink-0">
            <nav className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 sticky top-24">
              <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase tracking-wider">
                Account Settings
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#personal-info" 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md"
                  >
                    <span className="material-symbols-outlined text-[20px]">person</span>
                    Personal Info
                  </a>
                </li>
                <li>
                  <a 
                    href="#notifications" 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                    Notifications
                  </a>
                </li>
                <li>
                  <a 
                    href="#security" 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    Security
                  </a>
                </li>
                <li>
                  <a 
                    href="#payment" 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">payment</span>
                    Payment Methods
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-stack-md max-w-2xl mx-auto">
            {/* Personal Information Section */}
            <section 
              id="personal-info"
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6"
            >
              <h2 className="font-section-heading text-section-heading text-on-surface mb-6 border-b border-outline-variant pb-2">
                Personal Information
              </h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-8">
                  {/* Full Name */}
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-transparent border-b border-outline-variant px-0 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors"
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>
                  
                  {/* University Email */}
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                      University Email
                    </label>
                    <input
                      className="w-full bg-transparent border-b border-outline-variant px-0 py-2 text-on-surface-variant opacity-70 cursor-not-allowed"
                      disabled
                      type="email"
                      value={profileData.email}
                    />
                    <p className="font-body-sm text-body-sm text-outline mt-1">
                      Verified student email cannot be changed.
                    </p>
                  </div>
                  
                  {/* Phone Number */}
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                      Phone Number
                    </label>
                    <input
                      className="w-full bg-transparent border-b border-outline-variant px-0 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors"
                      type="tel"
                      value={profileData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    />
                  </div>
                  
                  {/* Major / Program */}
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                      Major / Program
                    </label>
                    <select
                      className="w-full bg-transparent border-b border-outline-variant px-0 py-2 text-on-surface focus:outline-none focus:border-primary appearance-none cursor-pointer"
                      value={profileData.major}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                    >
                      {majors.map((major) => (
                        <option key={major} value={major}>
                          {major}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Save Button */}
                  <div className="flex justify-start items-center gap-4 pt-6">
                    <Button 
                      variant="primary" 
                      onClick={handleSave}
                      className="px-8"
                    >
                      Save Changes
                    </Button>
                    
                    {isSaved && (
                      <span className="flex items-center gap-1 text-primary font-body-sm text-body-sm">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Saved successfully!
                      </span>
                    )}
                  </div>
                </div>
              </form>
            </section>
            
            {/* Additional sections can be added here */}
            {/* Notification Preferences Section */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
              <h2 className="font-section-heading text-section-heading text-on-surface mb-6 border-b border-outline-variant pb-2">
                Notification Preferences
              </h2>
              
              <div className="space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface">Email Notifications</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Receive updates about your listings and messages
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                {/* Push Notifications */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface">Push Notifications</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Get notified instantly when someone messages you
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;