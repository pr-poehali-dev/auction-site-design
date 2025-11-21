import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Rules = () => {
  const navigate = useNavigate();

  const rules = [
    {
      category: 'Регистрация и участие',
      items: [
        {
          question: 'Кто может участвовать в аукционе?',
          answer: 'В аукционе могут участвовать физические и юридические лица, достигшие 18 лет и прошедшие регистрацию на платформе. Необходимо предоставить документы, удостоверяющие личность, и пройти верификацию.'
        },
        {
          question: 'Как зарегистрироваться на аукционе?',
          answer: 'Для регистрации необходимо создать личный кабинет на сайте, заполнить анкету, загрузить скан-копию документа, удостоверяющего личность, и дождаться подтверждения от администрации (обычно это занимает до 24 часов).'
        },
        {
          question: 'Нужно ли вносить залог?',
          answer: 'Для участия в некоторых премиальных аукционах может потребоваться внесение гарантийного депозита. Размер депозита указывается в описании каждого аукциона. Депозит возвращается после завершения торгов.'
        }
      ]
    },
    {
      category: 'Процесс торгов',
      items: [
        {
          question: 'Как делать ставки?',
          answer: 'Вы можете делать ставки вручную, указывая желаемую сумму в соответствующем поле, или настроить автоматические ставки с указанием максимальной суммы. Каждая новая ставка должна превышать текущую на минимальный шаг, указанный в карточке лота.'
        },
        {
          question: 'Что такое автоматические ставки?',
          answer: 'Автоматические ставки позволяют системе повышать вашу ставку автоматически, если другой участник предлагает больше, но в пределах установленного вами максимума. Это удобно, если вы не можете постоянно следить за аукционом.'
        },
        {
          question: 'Когда завершается аукцион?',
          answer: 'Каждый лот имеет точное время завершения. Если ставка сделана в последние 5 минут, время торгов автоматически продлевается на 5 минут, чтобы все участники могли сделать контрставку.'
        }
      ]
    },
    {
      category: 'Оплата и получение лота',
      items: [
        {
          question: 'Как оплатить выигранный лот?',
          answer: 'После победы в торгах вам придёт уведомление с реквизитами для оплаты. Оплата производится в течение 3 рабочих дней банковским переводом, картой или через электронные платёжные системы. К цене лота добавляется комиссия аукциона (обычно 15%).'
        },
        {
          question: 'Как получить лот?',
          answer: 'После подтверждения оплаты вы можете забрать лот самостоятельно из нашего офиса или заказать доставку. Доставка по России и за рубеж осуществляется специализированными транспортными компаниями с полным страхованием.'
        },
        {
          question: 'Можно ли вернуть лот?',
          answer: 'Все лоты продаются в состоянии "как есть". Возврат возможен только в случае несоответствия лота описанию или обнаружения скрытых дефектов, не указанных в каталоге. Претензии принимаются в течение 14 дней с момента получения.'
        }
      ]
    },
    {
      category: 'Права и обязанности',
      items: [
        {
          question: 'Что будет, если я не оплачу выигранный лот?',
          answer: 'Неоплата выигранного лота является нарушением правил аукциона. В этом случае лот может быть предложен участнику, сделавшему следующую по величине ставку. Нарушитель может быть заблокирован и лишён права участвовать в будущих аукционах.'
        },
        {
          question: 'Кто несёт ответственность за подлинность лотов?',
          answer: 'Auction House проводит экспертизу всех лотов перед размещением на аукционе. Мы гарантируем подлинность и соответствие описанию. В случае выявления подделки после продажи сделка аннулируется, а средства возвращаются покупателю в полном объёме.'
        }
      ]
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
              <button className="text-accent">Правила</button>
              <button onClick={() => navigate('/contacts')} className="hover:text-accent transition-colors">Контакты</button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-primary text-primary-foreground py-16 border-b-4 border-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif font-bold mb-4 animate-fade-in">Правила аукциона</h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto font-sans">
            Прозрачные условия участия в торгах
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-accent bg-white mb-8 p-6">
            <CardContent>
              <div className="flex items-start gap-4">
                <Icon name="Info" size={32} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Важная информация</h3>
                  <p className="text-muted-foreground font-sans">
                    Участие в аукционе означает полное согласие с настоящими правилами. 
                    Пожалуйста, внимательно ознакомьтесь со всеми разделами перед началом торгов.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {rules.map((section, sectionIndex) => (
              <Card
                key={section.category}
                className="border-2 border-border bg-white animate-fade-in"
                style={{ animationDelay: `${sectionIndex * 100}ms` }}
              >
                <CardHeader className="border-b-2 border-border">
                  <CardTitle className="text-3xl font-serif flex items-center gap-3">
                    <Icon name="BookOpen" size={28} className="text-accent" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {section.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${sectionIndex}-${itemIndex}`}>
                        <AccordionTrigger className="px-6 hover:bg-muted/50 font-sans font-semibold text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground font-sans leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 border-2 border-accent bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">
                <Icon name="AlertCircle" size={28} className="text-accent" />
                Остались вопросы?
              </h3>
              <p className="font-sans mb-4">
                Если у вас возникли вопросы по правилам аукциона или вы хотите получить консультацию 
                наших специалистов, свяжитесь с нами любым удобным способом.
              </p>
              <button
                onClick={() => navigate('/contacts')}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded font-sans font-semibold hover:bg-accent/90 transition-colors"
              >
                <Icon name="Phone" size={18} />
                Связаться с нами
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rules;
