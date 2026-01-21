'use client';

import { CheckIn, Student, Video } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BarChart3, Users, Video as VideoIcon, Calendar, TrendingUp, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TeacherDashboard() {
  const [students] = useLocalStorage<Student[]>('friday-students', []);
  const [checkIns] = useLocalStorage<CheckIn[]>('friday-checkins', []);
  const [videos] = useLocalStorage<Video[]>('friday-videos', []);

  // Estatísticas
  const today = new Date().toLocaleDateString('pt-BR');
  const todayCheckIns = checkIns.filter(c => c.date === today);
  
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('pt-BR');
  });

  const checkInsByDay = last7Days.map(date => ({
    date,
    count: checkIns.filter(c => c.date === date).length
  })).reverse();

  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);

  const getBeltColor = (belt: string) => {
    const colors = {
      white: 'bg-white text-black border-2 border-gray-300',
      blue: 'bg-blue-600 text-white',
      purple: 'bg-purple-600 text-white',
      brown: 'bg-amber-800 text-white',
      black: 'bg-black text-white'
    };
    return colors[belt as keyof typeof colors] || colors.white;
  };

  const beltDistribution = students.reduce((acc, student) => {
    acc[student.belt] = (acc[student.belt] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black p-6 rounded-2xl border-2 border-[#FFD700]">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-[#FFD700]" />
          <h2 className="text-2xl font-bold text-white">Dashboard do Professor</h2>
        </div>
        <p className="text-gray-300 text-sm">Visão geral da academia e estatísticas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#FFD700]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total de Alunos</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{students.length}</p>
            </div>
            <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Check-ins Hoje</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{todayCheckIns.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total de Vídeos</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{videos.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <VideoIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Visualizações</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{totalViews}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="checkins" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="checkins">Check-ins</TabsTrigger>
          <TabsTrigger value="students">Alunos</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>

        {/* Check-ins Tab */}
        <TabsContent value="checkins" className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Últimos 7 Dias</h3>
            <div className="space-y-3">
              {checkInsByDay.map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-gray-600 font-medium">{day.date}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#FFD700] to-yellow-500 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                      style={{ width: `${Math.min((day.count / Math.max(...checkInsByDay.map(d => d.count), 1)) * 100, 100)}%` }}
                    >
                      {day.count > 0 && (
                        <span className="text-sm font-bold text-black">{day.count}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Check-ins Recentes</h3>
            {checkIns.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum check-in registrado</p>
            ) : (
              <div className="space-y-2">
                {checkIns.slice(0, 10).map(checkIn => (
                  <div 
                    key={checkIn.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{checkIn.studentName}</p>
                      <p className="text-sm text-gray-500">{checkIn.date} às {checkIn.time}</p>
                    </div>
                    <div className="text-green-600 font-bold text-xl">✓</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Lista de Alunos ({students.length})</h3>
            {students.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum aluno cadastrado</p>
            ) : (
              <div className="space-y-2">
                {students.map(student => (
                  <div 
                    key={student.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-yellow-500 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getBeltColor(student.belt)}`}>
                      {student.belt.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Distribuição por Faixa</h3>
            <div className="space-y-3">
              {Object.entries(beltDistribution).map(([belt, count]) => (
                <div key={belt} className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded text-sm font-bold w-24 text-center ${getBeltColor(belt)}`}>
                    {belt.toUpperCase()}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-black to-gray-700 h-full rounded-full flex items-center justify-end pr-3"
                      style={{ width: `${(count / students.length) * 100}%` }}
                    >
                      <span className="text-sm font-bold text-white">{count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Vídeos Mais Assistidos</h3>
            {videos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum vídeo disponível</p>
            ) : (
              <div className="space-y-2">
                {videos
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map(video => (
                    <div 
                      key={video.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{video.title}</p>
                        <p className="text-sm text-gray-500">{video.uploadDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#FFD700]">{video.views}</p>
                        <p className="text-xs text-gray-500">views</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
