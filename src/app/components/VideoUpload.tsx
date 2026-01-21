'use client';

import { useState } from 'react';
import { Video } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Upload, Video as VideoIcon, FileText, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function VideoUpload() {
  const [videos, setVideos] = useLocalStorage<Video[]>('friday-videos', []);
  const [showForm, setShowForm] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    url: '',
    thumbnail: '',
    duration: '',
    category: 'technique' as const
  });

  const handleUpload = () => {
    if (!newVideo.title || !newVideo.url) return;

    const video: Video = {
      id: `video-${Date.now()}`,
      ...newVideo,
      uploadDate: new Date().toLocaleDateString('pt-BR'),
      views: 0
    };

    setVideos([video, ...videos]);
    setNewVideo({
      title: '',
      description: '',
      url: '',
      thumbnail: '',
      duration: '',
      category: 'technique'
    });
    setShowForm(false);

    // Notificação
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Novo vídeo disponível!', {
          body: `${newVideo.title} foi adicionado à biblioteca.`,
          icon: '/icon.svg'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      technique: 'Técnica',
      sparring: 'Treino Livre',
      theory: 'Teoria',
      warmup: 'Aquecimento'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      technique: 'bg-blue-500',
      sparring: 'bg-red-500',
      theory: 'bg-purple-500',
      warmup: 'bg-green-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black p-6 rounded-2xl border-2 border-[#FFD700]">
        <div className="flex items-center gap-3 mb-2">
          <VideoIcon className="w-8 h-8 text-[#FFD700]" />
          <h2 className="text-2xl font-bold text-white">Biblioteca de Vídeos</h2>
        </div>
        <p className="text-gray-300 text-sm">Gerencie e compartilhe aulas gravadas</p>
      </div>

      {/* Upload Button */}
      <Button 
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-gradient-to-r from-[#FFD700] to-yellow-500 hover:from-yellow-500 hover:to-[#FFD700] text-black font-bold py-6 text-lg transition-all duration-300 hover:scale-105"
      >
        <Upload className="w-5 h-5 mr-2" />
        {showForm ? 'Cancelar Upload' : 'Adicionar Novo Vídeo'}
      </Button>

      {/* Upload Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-[#FFD700] space-y-4">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#FFD700]" />
            Upload de Vídeo
          </h3>

          <div>
            <Label htmlFor="title">Título do Vídeo</Label>
            <Input
              id="title"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              placeholder="Ex: Passagem de Guarda - Técnica Básica"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={newVideo.description}
              onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
              placeholder="Descreva o conteúdo do vídeo..."
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="url">URL do Vídeo</Label>
            <Input
              id="url"
              value={newVideo.url}
              onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="thumbnail">URL da Thumbnail (opcional)</Label>
            <Input
              id="thumbnail"
              value={newVideo.thumbnail}
              onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
              placeholder="https://..."
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duração</Label>
              <Input
                id="duration"
                value={newVideo.duration}
                onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                placeholder="Ex: 15:30"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={newVideo.category} 
                onValueChange={(value: any) => setNewVideo({ ...newVideo, category: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technique">Técnica</SelectItem>
                  <SelectItem value="sparring">Treino Livre</SelectItem>
                  <SelectItem value="theory">Teoria</SelectItem>
                  <SelectItem value="warmup">Aquecimento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleUpload}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Salvar Vídeo
          </Button>
        </div>
      )}

      {/* Videos List */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <VideoIcon className="w-5 h-5 text-[#FFD700]" />
          Vídeos Disponíveis ({videos.length})
        </h3>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <VideoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum vídeo adicionado ainda</p>
            <p className="text-sm text-gray-400 mt-2">Clique em "Adicionar Novo Vídeo" para começar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map(video => (
              <div 
                key={video.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <VideoIcon className="w-16 h-16 text-[#FFD700]" />
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-bold">
                    {video.duration || '00:00'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-gray-800 line-clamp-2">{video.title}</h4>
                    <span className={`${getCategoryColor(video.category)} text-white text-xs px-2 py-1 rounded-full whitespace-nowrap`}>
                      {getCategoryLabel(video.category)}
                    </span>
                  </div>
                  
                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                    <span>{video.uploadDate}</span>
                    <span>{video.views} visualizações</span>
                  </div>

                  <Button 
                    onClick={() => window.open(video.url, '_blank')}
                    className="w-full bg-[#FFD700] hover:bg-yellow-500 text-black font-semibold"
                    size="sm"
                  >
                    Assistir Agora
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
