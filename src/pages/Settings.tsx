import React from 'react';
import { Card, Button, StaggerContainer } from '../components/UI';
import { User, Bell, Shield, CreditCard, Globe, Moon } from 'lucide-react';
import { useFinance } from '../store/FinanceContext';

export const Settings: React.FC = () => {
  const { role, isDarkMode, toggleDarkMode } = useFinance();

  const sections = [
    { title: 'Profile', icon: User, desc: 'Manage your personal information and preferences.' },
    { title: 'Notifications', icon: Bell, desc: 'Configure how you receive alerts and updates.' },
    { title: 'Security', icon: Shield, desc: 'Update your password and security settings.' },
    { title: 'Billing', icon: CreditCard, desc: 'Manage your subscription and payment methods.' },
    { title: 'Language', icon: Globe, desc: 'Choose your preferred language and region.' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Customize your dashboard experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <StaggerContainer className="lg:col-span-2 space-y-6">
          {sections.map((section, idx) => (
            <Card key={idx} className="flex items-center justify-between group cursor-pointer p-8">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-all duration-300 group-hover:rotate-6">
                  <section.icon className="w-7 h-7 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{section.title}</h3>
                  <p className="text-sm text-slate-500">{section.desc}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-xl">Edit</Button>
            </Card>
          ))}
        </StaggerContainer>

        <div className="space-y-6">
          <Card hover={false}>
            <h3 className="font-bold mb-4">Appearance</h3>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-slate-500" />
                <span className="text-sm font-medium">Dark Mode</span>
              </div>
              <button 
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full transition-all relative ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </Card>

          <Card hover={false} className="border-indigo-500/30 border-2">
            <h3 className="font-bold mb-2">Current Role</h3>
            <p className="text-sm text-slate-500 mb-4">You are currently logged in as:</p>
            <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600">
              <Shield className="w-5 h-5" />
              <span className="font-bold">{role}</span>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              {role === 'Admin' 
                ? 'You have full access to create, edit, and delete transactions.' 
                : 'You have read-only access to the dashboard and transactions.'}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
