import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  resolution: string;
  bitrate: string;
  fps: number;
  preset: string;
  tags: string[];
}

const templates: Template[] = [
  {
    id: 1,
    title: 'Стриминг 1080p Twitch',
    description: 'Оптимизировано для стриминга на Twitch с балансом качества и производительности',
    category: 'Стриминг',
    resolution: '1920x1080',
    bitrate: '6000 Kbps',
    fps: 60,
    preset: 'veryfast',
    tags: ['twitch', 'gaming', '1080p']
  },
  {
    id: 2,
    title: 'YouTube Gaming 1440p',
    description: 'Высокое качество для стриминга игр на YouTube с поддержкой 1440p',
    category: 'Стриминг',
    resolution: '2560x1440',
    bitrate: '9000 Kbps',
    fps: 60,
    preset: 'fast',
    tags: ['youtube', 'gaming', '1440p']
  },
  {
    id: 3,
    title: 'Запись игрового процесса',
    description: 'Максимальное качество для последующего монтажа геймплея',
    category: 'Запись',
    resolution: '1920x1080',
    bitrate: '50000 Kbps',
    fps: 60,
    preset: 'slow',
    tags: ['запись', 'gaming', 'высокое качество']
  },
  {
    id: 4,
    title: 'Подкаст / Вебинар',
    description: 'Настройки для записи подкастов и онлайн-презентаций',
    category: 'Подкаст',
    resolution: '1920x1080',
    bitrate: '4000 Kbps',
    fps: 30,
    preset: 'medium',
    tags: ['подкаст', 'вебинар', 'голос']
  },
  {
    id: 5,
    title: 'Стрим на слабом ПК',
    description: 'Оптимизировано для слабых компьютеров с минимальной нагрузкой',
    category: 'Стриминг',
    resolution: '1280x720',
    bitrate: '3000 Kbps',
    fps: 30,
    preset: 'ultrafast',
    tags: ['720p', 'low-end', 'производительность']
  },
  {
    id: 6,
    title: 'YouTube 4K Запись',
    description: 'Профессиональная запись в 4K для YouTube контента',
    category: 'Запись',
    resolution: '3840x2160',
    bitrate: '80000 Kbps',
    fps: 60,
    preset: 'medium',
    tags: ['4k', 'youtube', 'запись']
  }
];

const categories = ['Все', 'Стриминг', 'Запись', 'Подкаст'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Все' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Video" size={48} className="text-primary" />
            <h1 className="text-5xl font-bold">OBS Studio Setup</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Готовые конфигурации для быстрой настройки OBS Studio. 
            Выберите шаблон под ваши задачи и начните стримить за минуты.
          </p>
        </header>

        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск по шаблонам, тегам, настройкам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="transition-all hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <Card 
              key={template.id} 
              className="hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20 cursor-pointer animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {template.category}
                  </Badge>
                  <Icon name="Settings" size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {template.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Monitor" size={16} className="text-primary" />
                      <span>{template.resolution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Gauge" size={16} className="text-secondary" />
                      <span>{template.fps} FPS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Activity" size={16} className="text-primary" />
                      <span>{template.bitrate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Zap" size={16} className="text-secondary" />
                      <span>{template.preset}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full mt-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать конфигурацию
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить параметры поиска или выбрать другую категорию
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
