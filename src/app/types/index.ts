export interface Student {
  id: string;
  name: string;
  belt: 'white' | 'blue' | 'purple' | 'brown' | 'black';
  email: string;
  phone: string;
}

export interface CheckIn {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  timestamp: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  uploadDate: string;
  duration: string;
  category: 'technique' | 'sparring' | 'theory' | 'warmup';
  views: number;
}

export interface VideoProgress {
  videoId: string;
  studentId: string;
  progress: number;
  completed: boolean;
  lastWatched: string;
}
