import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface CatalogItem {
  id: number;
  title: string;
  category: string;
  price: number;
  year: string;
  image: string;
  status: 'available' | 'upcoming' | 'sold';
}

const Catalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Антиквариат', 'Искусство', 'Коллекционирование', 'Ювелирные изделия', 'Мебель'];

  const items: CatalogItem[] = [
    {
      id: 1,
      title: 'Карманные часы XVIII века',
      category: 'Антиквариат',
      price: 85000,
      year: '1780',
      image: 'https://cdn.poehali.dev/projects/9d2405f6-0257-4f1c-8e8a-d3737645461a/files/b69ed555-2d56-4a7d-8422-967764df084e.jpg',
      status: 'available'
    },
    {
      id: 2,
      title: 'Картина эпохи Возрождения',
      category: 'Искусство',
      price: 1250000,
      year: '1650',
      image: 'https://cdn.poehali.dev/projects/9d2405f6-0257-4f1c-8e8a-d3737645461a/files/b6e62610-6225-4686-99fa-fc40f849833d.jpg',
      status: 'available'
    },
    {
      id: 3,
      title: 'Винтажная перьевая ручка',
      category: 'Коллекционирование',
      price: 42000,
      year: '1920',
      image: 'https://cdn.poehali.dev/projects/9d2405f6-0257-4f1c-8e8a-d3737645461a/files/5e208aa4-6b85-4a34-bbe2-595ee543767c.jpg',
      status: 'sold'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    return matchesSearch && matchesPrice && matchesCategory;
  });

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
              <button className="text-accent">Каталог</button>
              <button onClick={() => navigate('/about')} className="hover:text-accent transition-colors">О нас</button>
              <button onClick={() => navigate('/rules')} className="hover:text-accent transition-colors">Правила</button>
              <button onClick={() => navigate('/contacts')} className="hover:text-accent transition-colors">Контакты</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-5xl font-serif font-bold mb-8">Каталог лотов</h2>

        <div className="grid lg:grid-cols-4 gap-8">
          <Card className="h-fit border-2 border-border bg-white">
            <CardHeader>
              <h3 className="text-2xl font-serif font-bold">Фильтры</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="font-sans font-semibold mb-2 block">Поиск</Label>
                <Input
                  placeholder="Название лота..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-2"
                />
              </div>

              <div>
                <Label className="font-sans font-semibold mb-4 block">
                  Цена: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={2000000}
                  step={10000}
                  className="mb-2"
                />
              </div>

              <div>
                <Label className="font-sans font-semibold mb-3 block">Категории</Label>
                <div className="space-y-3">
                  {categories.map(category => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category} className="font-sans cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 2000000]);
                  setSelectedCategories([]);
                }}
                variant="outline"
                className="w-full"
              >
                Сбросить фильтры
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground font-sans">
                Найдено лотов: <span className="font-bold text-foreground">{filteredItems.length}</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-2 border-border hover:border-accent transition-all duration-300 hover:shadow-xl bg-white cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-56 object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground font-sans">
                        {item.category}
                      </Badge>
                      {item.status === 'sold' && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg font-sans">
                            Продано
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-sans mb-4">
                      <Icon name="Calendar" size={14} className="inline mr-1" />
                      {item.year} год
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground font-sans">Стартовая цена</p>
                        <p className="text-2xl font-serif font-bold text-accent">{formatPrice(item.price)}</p>
                      </div>
                      {item.status === 'available' && (
                        <Button size="sm" className="bg-accent hover:bg-accent/90">
                          <Icon name="Eye" size={16} className="mr-1" />
                          Смотреть
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <Card className="border-2 border-dashed border-border bg-white p-12 text-center">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl font-serif text-muted-foreground">
                  Лоты не найдены
                </p>
                <p className="text-sm text-muted-foreground font-sans mt-2">
                  Попробуйте изменить параметры фильтрации
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
