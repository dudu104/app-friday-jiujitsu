'use client';

import { useState } from 'react';
import { CheckIn, Student } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Calendar, Clock, User, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function CheckInForm() {
  const [students, setStudents] = useLocalStorage<Student[]>('friday-students', []);
  const [checkIns, setCheckIns] = useLocalStorage<CheckIn[]>('friday-checkins', []);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [newStudent, setNewStudent] = useState({
    name: '',
    belt: 'white' as const,
    email: '',
    phone: ''
  });

  const handleCheckIn = () => {
    if (!selectedStudent) return;

    const student = students.find(s => s.id === selectedStudent);
    if (!student) return;

    const now = new Date();
    const checkIn: CheckIn = {
      id: `checkin-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      timestamp: now.getTime()
    };

    setCheckIns([checkIn, ...checkIns]);
    setSelectedStudent('');
    
    // Notificação de sucesso
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Check-in realizado!', {
          body: `${student.name} fez check-in com sucesso.`,
          icon: '/icon.svg'
        });
      }
    }
  };

  const handleAddStudent = () => {
    if (!newStudent.name) return;

    const student: Student = {
      id: `student-${Date.now()}`,
      ...newStudent
    };

    setStudents([...students, student]);
    setNewStudent({ name: '', belt: 'white', email: '', phone: '' });
    setShowAddStudent(false);
  };

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

  const todayCheckIns = checkIns.filter(c => c.date === new Date().toLocaleDateString('pt-BR'));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black p-6 rounded-2xl border-2 border-[#FFD700]">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8 text-[#FFD700]" />
          <h2 className="text-2xl font-bold text-white">Check-in de Alunos</h2>
        </div>
        <p className="text-gray-300 text-sm">Registre a presença dos alunos na academia</p>
      </div>

      {/* Check-in Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="space-y-4">
          <div>
            <Label htmlFor="student" className="text-gray-700 font-semibold mb-2 block">
              Selecione o Aluno
            </Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha um aluno..." />
              </SelectTrigger>
              <SelectContent>
                {students.map(student => (
                  <SelectItem key={student.id} value={student.id}>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getBeltColor(student.belt)}`}>
                        {student.belt.toUpperCase()}
                      </span>
                      {student.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleCheckIn}
            disabled={!selectedStudent}
            className="w-full bg-gradient-to-r from-[#FFD700] to-yellow-500 hover:from-yellow-500 hover:to-[#FFD700] text-black font-bold py-6 text-lg transition-all duration-300 hover:scale-105"
          >
            <Clock className="w-5 h-5 mr-2" />
            Fazer Check-in
          </Button>

          <Button 
            onClick={() => setShowAddStudent(!showAddStudent)}
            variant="outline"
            className="w-full border-2 border-[#FFD700] text-black hover:bg-[#FFD700] hover:text-black"
          >
            <User className="w-4 h-4 mr-2" />
            {showAddStudent ? 'Cancelar' : 'Adicionar Novo Aluno'}
          </Button>
        </div>

        {/* Add Student Form */}
        {showAddStudent && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-[#FFD700] space-y-4">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FFD700]" />
              Cadastrar Novo Aluno
            </h3>
            
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                placeholder="Digite o nome do aluno"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="belt">Faixa</Label>
              <Select 
                value={newStudent.belt} 
                onValueChange={(value: any) => setNewStudent({ ...newStudent, belt: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white">Branca</SelectItem>
                  <SelectItem value="blue">Azul</SelectItem>
                  <SelectItem value="purple">Roxa</SelectItem>
                  <SelectItem value="brown">Marrom</SelectItem>
                  <SelectItem value="black">Preta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                placeholder="email@exemplo.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={newStudent.phone}
                onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                placeholder="(00) 00000-0000"
                className="mt-1"
              />
            </div>

            <Button 
              onClick={handleAddStudent}
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              Salvar Aluno
            </Button>
          </div>
        )}
      </div>

      {/* Today's Check-ins */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FFD700]" />
          Check-ins de Hoje ({todayCheckIns.length})
        </h3>
        
        {todayCheckIns.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum check-in registrado hoje</p>
        ) : (
          <div className="space-y-2">
            {todayCheckIns.slice(0, 5).map(checkIn => (
              <div 
                key={checkIn.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{checkIn.studentName}</p>
                    <p className="text-sm text-gray-500">{checkIn.time}</p>
                  </div>
                </div>
                <div className="text-green-600 font-bold">✓</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
