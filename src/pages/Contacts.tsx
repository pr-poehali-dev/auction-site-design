import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Contacts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Сообщение отправлено',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contacts = [
    {
      icon: 'MapPin',
      title: 'Адрес',
      details: ['г. Москва, ул. Кузнецкий Мост, д. 12', 'БЦ "Классика", 3 этаж']
    },
    {
      icon: 'Phone',
      title: 'Телефон',
      details: ['+7 (495) 123-45-67', '+7 (495) 123-45-68']
    },
    {
      icon: 'Mail',
      title: 'Email',
      details: ['info@auctionhouse.ru', 'support@auctionhouse.ru']
    },
    {
      icon: 'Clock',
      title: 'Часы работы',
      details: ['Пн-Пт: 10:00 - 19:00', 'Сб-Вс: 11:00 - 18:00']
    }
  ];

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
              <button onClick={() => navigate('/rules')} className="hover:text-accent transition-colors">Правила</button>
              <button className="text-accent">Контакты</button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-primary text-primary-foreground py-16 border-b-4 border-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif font-bold mb-4 animate-fade-in">Контакты</h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto font-sans">
            Мы всегда рады ответить на ваши вопросы
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-serif font-bold mb-8">Наши контакты</h3>
            <div className="space-y-6">
              {contacts.map((contact, index) => (
                <Card
                  key={contact.title}
                  className="border-2 border-border hover:border-accent transition-all duration-300 bg-white animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={contact.icon as any} size={24} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="text-xl font-serif font-bold mb-2">{contact.title}</h4>
                        {contact.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground font-sans">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 border-2 border-accent bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h4 className="text-xl font-serif font-bold mb-3 flex items-center gap-2">
                  <Icon name="Info" size={24} className="text-accent" />
                  Важная информация
                </h4>
                <p className="font-sans text-sm text-primary-foreground/90">
                  Для записи на личную консультацию или предварительного просмотра лотов 
                  необходимо предварительно связаться с нами по телефону или через форму обратной связи.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-2 border-border bg-white">
              <CardHeader>
                <CardTitle className="text-3xl font-serif">Напишите нам</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-sans font-semibold">Имя *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ваше имя"
                      className="border-2 mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-sans font-semibold">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="border-2 mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-sans font-semibold">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="border-2 mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-sans font-semibold">Сообщение *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Опишите ваш вопрос или запрос..."
                      rows={6}
                      className="border-2 mt-2 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-semibold text-lg py-6"
                  >
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-2 border-border bg-white overflow-hidden">
          <CardHeader className="border-b-2 border-border">
            <CardTitle className="text-3xl font-serif flex items-center gap-2">
              <Icon name="Map" size={28} className="text-accent" />
              Как нас найти
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center p-8">
                <Icon name="MapPin" size={64} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-2xl font-serif text-muted-foreground">
                  Карта офиса
                </p>
                <p className="text-sm text-muted-foreground font-sans mt-2">
                  г. Москва, ул. Кузнецкий Мост, д. 12
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contacts;
