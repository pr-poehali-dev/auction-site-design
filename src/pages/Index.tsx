import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Lot {
  id: number;
  title: string;
  category: string;
  currentBid: number;
  minIncrement: number;
  endTime: Date;
  image: string;
  bids: number;
  description: string;
}

interface Bid {
  lotId: number;
  amount: number;
  timestamp: Date;
}

const Index = () => {
  const navigate = useNavigate();
  const [lots, setLots] = useState<Lot[]>([
    {
      id: 1,
      title: 'Карманные часы XVIII века',
      category: 'Антиквариат',
      currentBid: 85000,
      minIncrement: 5000,
      endTime: new Date(Date.now() + 3600000 * 2),
      image: 'https://cdn.poehali.dev/projects/9d2405f6-0257-4f1c-8e8a-d3737645461a/files/b69ed555-2d56-4a7d-8422-967764df084e.jpg',
      bids: 12,
      description: 'Изысканные золотые карманные часы с гравировкой'
    },
    {
      id: 2,
      title: 'Картина эпохи Возрождения',
      category: 'Искусство',
      currentBid: 1250000,
      minIncrement: 50000,
      endTime: new Date(Date.now() + 3600000 * 5),
      image: 'https://cdn.poehali.dev/projects/9d2405f6-0257-4f1c-8e8a-d3737645461a/files/b6e62610-6225-4686-99fa-fc40f849833d.jpg',
      bids: 28,
      description: 'Пейзаж европейской школы в оригинальной раме'
    },
    {
      id: 3,
      title: 'Винтажная перьевая ручка',
      category: 'Коллекционирование',
      currentBid: 42000,
      minIncrement: 2000,
      endTime: new Date(Date.now() + 3600000 * 1),
      image: 'https://cdn.poehali.dev/projects/9d2405f6-0257-4f1c-8e8a-d3737645461a/files/5e208aa4-6b85-4a34-bbe2-595ee543767c.jpg',
      bids: 8,
      description: 'Роскошная ручка с золотыми деталями'
    }
  ]);

  const [bidAmounts, setBidAmounts] = useState<Record<number, string>>({});
  const [userBids, setUserBids] = useState<Bid[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatTimeLeft = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Завершён';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (hours > 0) return `${hours}ч ${minutes}м`;
    if (minutes > 0) return `${minutes}м ${seconds}с`;
    return `${seconds}с`;
  };

  const [timeLeft, setTimeLeft] = useState<Record<number, string>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: Record<number, string> = {};
      lots.forEach(lot => {
        newTimeLeft[lot.id] = formatTimeLeft(lot.endTime);
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [lots]);

  const placeBid = (lotId: number) => {
    const lot = lots.find(l => l.id === lotId);
    const bidAmount = parseFloat(bidAmounts[lotId] || '0');
    
    if (!lot) return;
    
    if (bidAmount < lot.currentBid + lot.minIncrement) {
      toast({
        title: 'Ошибка',
        description: `Минимальная ставка: ${formatPrice(lot.currentBid + lot.minIncrement)}`,
        variant: 'destructive'
      });
      return;
    }

    setLots(lots.map(l => 
      l.id === lotId 
        ? { ...l, currentBid: bidAmount, bids: l.bids + 1 }
        : l
    ));

    setUserBids([...userBids, {
      lotId,
      amount: bidAmount,
      timestamp: new Date()
    }]);

    toast({
      title: 'Ставка принята',
      description: `Ваша ставка ${formatPrice(bidAmount)} успешно размещена`,
    });

    setBidAmounts({ ...bidAmounts, [lotId]: '' });
  };

  const filteredLots = activeTab === 'all' 
    ? lots 
    : lots.filter(lot => lot.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-primary text-primary-foreground border-b-4 border-accent">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon name="Gavel" size={40} className="text-accent" />
              <div>
                <h1 className="text-4xl font-serif font-bold">Auction House</h1>
                <p className="text-sm text-primary-foreground/80 font-sans">С 1895 года</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6 font-sans">
              <button className="text-accent">Главная</button>
              <button onClick={() => navigate('/catalog')} className="hover:text-accent transition-colors">Каталог</button>
              <button onClick={() => navigate('/about')} className="hover:text-accent transition-colors">О нас</button>
              <button onClick={() => navigate('/rules')} className="hover:text-accent transition-colors">Правила</button>
              <button onClick={() => navigate('/contacts')} className="hover:text-accent transition-colors">Контакты</button>
            </nav>
            <Button 
              onClick={() => navigate('/profile')}
              variant="outline" 
              className="bg-transparent border-accent text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-primary text-primary-foreground py-16 border-b-4 border-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif font-bold mb-4 animate-fade-in">Живые торги</h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto font-sans">
            Участвуйте в престижных аукционах и становитесь владельцем уникальных предметов искусства и антиквариата
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-white border-2 border-border p-1">
            <TabsTrigger value="all" className="font-sans data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Все лоты
            </TabsTrigger>
            <TabsTrigger value="Антиквариат" className="font-sans data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Антиквариат
            </TabsTrigger>
            <TabsTrigger value="Искусство" className="font-sans data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Искусство
            </TabsTrigger>
            <TabsTrigger value="Коллекционирование" className="font-sans data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Коллекционирование
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLots.map((lot, index) => (
                <Card 
                  key={lot.id} 
                  className="overflow-hidden border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-xl bg-white animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img 
                        src={lot.image} 
                        alt={lot.title}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground font-sans">
                        {lot.category}
                      </Badge>
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded font-sans">
                        <Icon name="Clock" size={14} className="inline mr-1" />
                        {timeLeft[lot.id] || 'Загрузка...'}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <CardTitle className="text-2xl mb-2 font-serif">{lot.title}</CardTitle>
                    <p className="text-muted-foreground mb-4 font-sans text-sm">{lot.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded">
                        <span className="text-sm font-sans text-muted-foreground">Текущая ставка</span>
                        <span className="text-xl font-serif font-bold text-primary">{formatPrice(lot.currentBid)}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm font-sans">
                        <span className="text-muted-foreground">Минимальный шаг</span>
                        <span className="font-semibold">{formatPrice(lot.minIncrement)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                        <Icon name="Users" size={16} />
                        <span>{lot.bids} ставок</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-6 pt-0 flex gap-2">
                    <Input
                      type="number"
                      placeholder={formatPrice(lot.currentBid + lot.minIncrement)}
                      value={bidAmounts[lot.id] || ''}
                      onChange={(e) => setBidAmounts({ ...bidAmounts, [lot.id]: e.target.value })}
                      className="border-2 font-sans"
                    />
                    <Button 
                      onClick={() => placeBid(lot.id)}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-semibold whitespace-nowrap"
                    >
                      <Icon name="Gavel" size={18} className="mr-2" />
                      Сделать ставку
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {userBids.length > 0 && (
          <Card className="mt-12 border-2 border-accent bg-white">
            <CardHeader>
              <CardTitle className="text-3xl font-serif flex items-center gap-2">
                <Icon name="History" size={28} />
                История ваших ставок
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userBids.slice().reverse().map((bid, index) => {
                  const lot = lots.find(l => l.id === bid.lotId);
                  return (
                    <div key={index} className="flex justify-between items-center p-4 bg-muted rounded animate-scale-in">
                      <div>
                        <p className="font-serif font-semibold">{lot?.title}</p>
                        <p className="text-sm text-muted-foreground font-sans">
                          {bid.timestamp.toLocaleTimeString('ru-RU')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-serif font-bold text-accent">{formatPrice(bid.amount)}</p>
                        <Badge variant="outline" className="font-sans">
                          {bid.amount === lot?.currentBid ? 'Лидирует' : 'Перебита'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <footer className="bg-primary text-primary-foreground border-t-4 border-accent mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-accent">Auction House</h3>
              <p className="text-sm text-primary-foreground/80 font-sans">
                Престижный аукционный дом с традициями
              </p>
            </div>
            <div>
              <h4 className="font-serif font-semibold mb-3">Контакты</h4>
              <p className="text-sm text-primary-foreground/80 font-sans">+7 (495) 123-45-67</p>
              <p className="text-sm text-primary-foreground/80 font-sans">info@auctionhouse.ru</p>
            </div>
            <div>
              <h4 className="font-serif font-semibold mb-3">Часы работы</h4>
              <p className="text-sm text-primary-foreground/80 font-sans">Пн-Пт: 10:00 - 19:00</p>
              <p className="text-sm text-primary-foreground/80 font-sans">Сб-Вс: 11:00 - 18:00</p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60 font-sans">
            © 2024 Auction House. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;