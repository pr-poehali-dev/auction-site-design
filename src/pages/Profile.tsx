import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'Александр Петров',
    email: 'a.petrov@example.com',
    phone: '+7 (495) 123-45-67',
    verified: true
  });

  const [notifications, setNotifications] = useState({
    bidUpdates: true,
    newLots: true,
    outbid: true,
    newsletter: false
  });

  const bidHistory = [
    {
      id: 1,
      lotTitle: 'Карманные часы XVIII века',
      amount: 90000,
      status: 'winning',
      date: '2024-11-20',
      image: 'https://cdn.poehali.dev/projects/9d2405f6-0257-4f1c-8e8a-d3737645461a/files/b69ed555-2d56-4a7d-8422-967764df084e.jpg'
    },
    {
      id: 2,
      lotTitle: 'Картина эпохи Возрождения',
      amount: 1300000,
      status: 'outbid',
      date: '2024-11-19',
      image: 'https://cdn.poehali.dev/projects/9d2405f6-0257-4f1c-8e8a-d3737645461a/files/b6e62610-6225-4686-99fa-fc40f849833d.jpg'
    },
    {
      id: 3,
      lotTitle: 'Винтажная перьевая ручка',
      amount: 45000,
      status: 'won',
      date: '2024-11-18',
      image: 'https://cdn.poehali.dev/projects/9d2405f6-0257-4f1c-8e8a-d3737645461a/files/5e208aa4-6b85-4a34-bbe2-595ee543767c.jpg'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'destructive' | 'outline' | 'secondary', text: string }> = {
      winning: { variant: 'default', text: 'Лидирует' },
      outbid: { variant: 'destructive', text: 'Перебита' },
      won: { variant: 'secondary', text: 'Выиграна' }
    };
    return variants[status] || variants.winning;
  };

  const handleSaveProfile = () => {
    toast({
      title: 'Профиль обновлён',
      description: 'Ваши данные успешно сохранены',
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: 'Настройки сохранены',
      description: 'Ваши предпочтения уведомлений обновлены',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-primary text-primary-foreground border-b-4 border-accent">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
              <Icon name="Gavel" size={40} className="text-accent" />
              <div>
                <h1 className="text-4xl font-serif font-bold">Auction House</h1>
                <p className="text-sm text-primary-foreground/80 font-sans">С 1895 года</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6 font-sans">
              <button onClick={() => navigate('/')} className="hover:text-accent transition-colors">Главная</button>
              <button onClick={() => navigate('/catalog')} className="hover:text-accent transition-colors">Каталог</button>
              <button onClick={() => navigate('/about')} className="hover:text-accent transition-colors">О нас</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
            <Icon name="User" size={40} className="text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold">{profile.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-accent text-accent-foreground font-sans">
                {profile.verified ? (
                  <>
                    <Icon name="CheckCircle" size={14} className="mr-1" />
                    Верифицирован
                  </>
                ) : (
                  'Не верифицирован'
                )}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="bids" className="w-full">
          <TabsList className="bg-white border-2 border-border mb-8 p-1">
            <TabsTrigger value="bids" className="font-sans data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Gavel" size={18} className="mr-2" />
              Мои ставки
            </TabsTrigger>
            <TabsTrigger value="settings" className="font-sans data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="notifications" className="font-sans data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Bell" size={18} className="mr-2" />
              Уведомления
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bids">
            <Card className="border-2 border-border bg-white">
              <CardHeader>
                <CardTitle className="text-3xl font-serif">История ставок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bidHistory.map((bid, index) => (
                    <Card
                      key={bid.id}
                      className="border border-border hover:border-accent transition-all animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <img
                            src={bid.image}
                            alt={bid.lotTitle}
                            className="w-32 h-32 object-cover rounded border-2 border-border"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-xl font-serif font-bold">{bid.lotTitle}</h3>
                              <Badge
                                variant={getStatusBadge(bid.status).variant}
                                className="font-sans"
                              >
                                {getStatusBadge(bid.status).text}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-sans mb-4">
                              <Icon name="Calendar" size={14} className="inline mr-1" />
                              {new Date(bid.date).toLocaleDateString('ru-RU')}
                            </p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground font-sans">Ваша ставка</p>
                                <p className="text-2xl font-serif font-bold text-accent">
                                  {formatPrice(bid.amount)}
                                </p>
                              </div>
                              {bid.status === 'winning' && (
                                <Button
                                  onClick={() => navigate('/')}
                                  className="bg-accent hover:bg-accent/90"
                                >
                                  Увеличить ставку
                                </Button>
                              )}
                              {bid.status === 'outbid' && (
                                <Button
                                  onClick={() => navigate('/')}
                                  variant="outline"
                                >
                                  Посмотреть лот
                                </Button>
                              )}
                              {bid.status === 'won' && (
                                <Badge variant="secondary" className="font-sans text-base px-4 py-2">
                                  <Icon name="Trophy" size={16} className="mr-1" />
                                  Победа
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-2 border-border bg-white">
              <CardHeader>
                <CardTitle className="text-3xl font-serif">Личные данные</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-sans font-semibold">Имя</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="border-2 mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-sans font-semibold">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="border-2 mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-sans font-semibold">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="border-2 mt-2"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      onClick={handleSaveProfile}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans"
                    >
                      <Icon name="Save" size={18} className="mr-2" />
                      Сохранить изменения
                    </Button>
                    <Button type="button" variant="outline">
                      Отмена
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-2 border-border bg-white">
              <CardHeader>
                <CardTitle className="text-3xl font-serif">Настройки уведомлений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted rounded">
                    <div>
                      <Label htmlFor="bidUpdates" className="font-sans font-semibold cursor-pointer">
                        Обновления по моим ставкам
                      </Label>
                      <p className="text-sm text-muted-foreground font-sans mt-1">
                        Получать уведомления о статусе ваших ставок
                      </p>
                    </div>
                    <Switch
                      id="bidUpdates"
                      checked={notifications.bidUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, bidUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded">
                    <div>
                      <Label htmlFor="newLots" className="font-sans font-semibold cursor-pointer">
                        Новые лоты
                      </Label>
                      <p className="text-sm text-muted-foreground font-sans mt-1">
                        Уведомления о появлении новых интересных лотов
                      </p>
                    </div>
                    <Switch
                      id="newLots"
                      checked={notifications.newLots}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newLots: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded">
                    <div>
                      <Label htmlFor="outbid" className="font-sans font-semibold cursor-pointer">
                        Моя ставка перебита
                      </Label>
                      <p className="text-sm text-muted-foreground font-sans mt-1">
                        Мгновенные уведомления когда вашу ставку перебивают
                      </p>
                    </div>
                    <Switch
                      id="outbid"
                      checked={notifications.outbid}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, outbid: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded">
                    <div>
                      <Label htmlFor="newsletter" className="font-sans font-semibold cursor-pointer">
                        Новостная рассылка
                      </Label>
                      <p className="text-sm text-muted-foreground font-sans mt-1">
                        Еженедельный дайджест с новостями аукционного мира
                      </p>
                    </div>
                    <Switch
                      id="newsletter"
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newsletter: checked })
                      }
                    />
                  </div>

                  <Button
                    onClick={handleSaveNotifications}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans"
                  >
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить настройки
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
