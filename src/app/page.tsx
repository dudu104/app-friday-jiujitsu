'use client';

import { useState, useEffect } from 'react';
import { CheckInForm } from './components/CheckInForm';
import { VideoUpload } from './components/VideoUpload';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Home, UserCheck, Video, BarChart3, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FridayApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'checkin' | 'videos' | 'dashboard'>('home');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Request notification permission
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationsEnabled(true);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            setNotificationsEnabled(true);
          }
        });
      }
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'checkin':
        return <CheckInForm />;
      case 'videos':
        return <VideoUpload />;
      case 'dashboard':
        return <TeacherDashboard />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-black via-gray-900 to-black p-8 md:p-12 rounded-3xl border-2 border-[#FFD700] overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD700] opacity-10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center transform rotate-12">
                    <span className="text-3xl font-bold text-black transform -rotate-12">F</span>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Friday</h1>
                    <p className="text-[#FFD700] font-semibold">Jiu-Jítsu Academy</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-6">
                  Sistema completo de gerenciamento para academias de jiu-jítsu. 
                  Check-in de alunos, biblioteca de vídeos e dashboard profissional.
                </p>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-semibold">Sistema Online</span>
                  </div>
                  {notificationsEnabled && (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Bell className="w-4 h-4 text-[#FFD700]" />
                      <span className="text-white text-sm font-semibold">Notificações Ativas</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('checkin')}
                className="group bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFD700] transition-all duration-300 hover:scale-105 text-left"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-yellow-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Check-in</h3>
                <p className="text-gray-600 text-sm">Registre a presença dos alunos de forma rápida e fácil</p>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className="group bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFD700] transition-all duration-300 hover:scale-105 text-left"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Vídeos</h3>
                <p className="text-gray-600 text-sm">Acesse e gerencie a biblioteca de aulas gravadas</p>
              </button>

              <button
                onClick={() => setActiveTab('dashboard')}
                className="group bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFD700] transition-all duration-300 hover:scale-105 text-left"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Dashboard</h3>
                <p className="text-gray-600 text-sm">Visualize estatísticas e gerencie sua academia</p>
              </button>
            </div>

            {/* Features */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Funcionalidades</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Check-in Rápido</h3>
                    <p className="text-sm text-gray-600">Sistema de presença com registro de data e hora</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Biblioteca de Vídeos</h3>
                    <p className="text-sm text-gray-600">Organize e compartilhe aulas gravadas</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Notificações</h3>
                    <p className="text-sm text-gray-600">Alertas automáticos para novos vídeos</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Dashboard Completo</h3>
                    <p className="text-sm text-gray-600">Estatísticas e relatórios detalhados</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Gestão de Alunos</h3>
                    <p className="text-sm text-gray-600">Cadastro completo com faixas e informações</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">100% Responsivo</h3>
                    <p className="text-sm text-gray-600">Funciona perfeitamente em mobile e desktop</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-black border-b-4 border-[#FFD700] sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <span className="text-xl font-bold text-black">F</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">Friday</span>
            </button>

            <div className="flex items-center gap-2">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className={activeTab === 'home' ? 'bg-[#FFD700] text-black hover:bg-yellow-500' : 'text-white hover:bg-white/10'}
              >
                <Home className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Início</span>
              </Button>

              <Button
                variant={activeTab === 'checkin' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('checkin')}
                className={activeTab === 'checkin' ? 'bg-[#FFD700] text-black hover:bg-yellow-500' : 'text-white hover:bg-white/10'}
              >
                <UserCheck className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Check-in</span>
              </Button>

              <Button
                variant={activeTab === 'videos' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('videos')}
                className={activeTab === 'videos' ? 'bg-[#FFD700] text-black hover:bg-yellow-500' : 'text-white hover:bg-white/10'}
              >
                <Video className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Vídeos</span>
              </Button>

              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className={activeTab === 'dashboard' ? 'bg-[#FFD700] text-black hover:bg-yellow-500' : 'text-white hover:bg-white/10'}
              >
                <BarChart3 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-[#FFD700] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Friday - Jiu-Jítsu Academy Management System
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Desenvolvido com ❤️ para academias de jiu-jítsu
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
