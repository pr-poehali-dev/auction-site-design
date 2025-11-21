import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const milestones = [
    { year: '1895', title: 'Основание', description: 'Открытие первого аукционного зала в Москве' },
    { year: '1920', title: 'Расширение', description: 'Проведение первых международных аукционов' },
    { year: '1975', title: 'Модернизация', description: 'Внедрение современных технологий оценки' },
    { year: '2024', title: 'Цифровая эра', description: 'Запуск онлайн-платформы для торгов' }
  ];

  const values = [
    {
      icon: 'Shield',
      title: 'Надёжность',
      description: 'Более 125 лет безупречной репутации на рынке'
    },
    {
      icon: 'Award',
      title: 'Экспертиза',
      description: 'Команда сертифицированных специалистов и искусствоведов'
    },
    {
      icon: 'Users',
      title: 'Доверие',
      description: 'Тысячи довольных клиентов по всему миру'
    },
    {
      icon: 'TrendingUp',
      title: 'Рост',
      description: 'Постоянное развитие и внедрение инноваций'
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
              <button className="text-accent">О нас</button>
              <button onClick={() => navigate('/rules')} className="hover:text-accent transition-colors">Правила</button>
              <button onClick={() => navigate('/contacts')} className="hover:text-accent transition-colors">Контакты</button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-primary text-primary-foreground py-16 border-b-4 border-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif font-bold mb-4 animate-fade-in">О нашем доме</h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto font-sans">
            История традиций, качества и престижа с 1895 года
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-2 border-accent bg-white p-8">
            <CardContent>
              <p className="text-lg font-sans leading-relaxed text-foreground mb-6">
                <span className="text-6xl font-serif text-accent float-left mr-4 leading-none">A</span>
                uction House — это не просто аукционный дом. Это место, где встречаются история и современность, 
                искусство и инвестиции, коллекционеры и шедевры. На протяжении более чем 125 лет мы помогаем 
                нашим клиентам находить уникальные предметы и создавать коллекции мирового уровня.
              </p>
              <p className="text-lg font-sans leading-relaxed text-foreground mb-6">
                Наша миссия — сохранять и передавать культурное наследие следующим поколениям, обеспечивая при этом 
                прозрачность, честность и профессионализм в каждой сделке. Мы гордимся тем, что доверие наших 
                клиентов является нашим главным активом.
              </p>
              <p className="text-lg font-sans leading-relaxed text-foreground">
                Сегодня Auction House представляет собой синтез вековых традиций и современных технологий. 
                Мы первыми внедрили онлайн-торги, сохранив при этом атмосферу классических аукционов и 
                индивидуальный подход к каждому клиенту.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h3 className="text-4xl font-serif font-bold text-center mb-12">Наши ценности</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="border-2 border-border hover:border-accent transition-all duration-300 bg-white animate-fade-in text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={value.icon as any} size={32} className="text-accent" />
                  </div>
                  <h4 className="text-xl font-serif font-bold mb-3">{value.title}</h4>
                  <p className="text-muted-foreground font-sans text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-4xl font-serif font-bold text-center mb-12">Вехи истории</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent/30 hidden lg:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col lg:flex-row items-center gap-8 animate-fade-in ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex-1 lg:text-right">
                    <Card className="border-2 border-border bg-white hover:border-accent transition-colors">
                      <CardContent className="p-6">
                        <h4 className="text-2xl font-serif font-bold mb-2">{milestone.title}</h4>
                        <p className="text-muted-foreground font-sans">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <Badge className="text-2xl font-serif px-6 py-3 bg-accent text-accent-foreground">
                      {milestone.year}
                    </Badge>
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="border-2 border-accent bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <Icon name="Quote" size={48} className="text-accent mx-auto mb-6" />
            <blockquote className="text-2xl font-serif italic mb-6">
              "Искусство не знает границ, и наша задача — сделать его доступным для истинных ценителей по всему миру"
            </blockquote>
            <p className="font-sans text-primary-foreground/80">
              — Основатель Auction House, 1895
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
