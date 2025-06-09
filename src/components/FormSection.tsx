'use client';

import { useState } from 'react';

interface FormData {
  [key: string]: string;
}

export default function FormSection() {
  const [formData, setFormData] = useState<FormData>({});

  const questions = [
    {
      id: 'objective',
      question:
        'Qual é o seu principal objetivo ao buscar serviços de marketing digital neste momento?',
      options: [
        'Aumentar a visibilidade da minha marca online',
        'Gerar mais leads (contatos de potenciais clientes)',
        'Aumentar as vendas e o faturamento',
        'Fortalecer a minha presença nas redes sociais',
        'Ter um website profissional e funcional',
        'Otimizar o retorno sobre investimento (ROI) em anúncios',
        'Melhorar a comunicação e o engajamento com meu público',
        'Posicionar minha empresa como autoridade no mercado',
        'Ter autonomia para gerenciar o conteúdo do meu site',
        'Outro (especificar no campo de texto abaixo)',
      ],
    },
    {
      id: 'current_investment',
      question:
        'Atualmente, sua empresa já investe em marketing digital? Se sim, em quais áreas?',
      options: [
        'Não, estou começando agora',
        'Gestão de Tráfego Pago (ex: Facebook Ads, Google Ads)',
        'Criação de Conteúdo para Redes Sociais',
        'Website Institucional',
        'SEO (Otimização para Buscadores)',
        'E-mail Marketing',
        'Gestão de Redes Sociais (Orgânico)',
        'Outras estratégias digitais',
        'Não tenho certeza',
        'Sim, mas busco otimização',
      ],
    },
    {
      id: 'facebook_ads',
      question:
        'Em relação aos anúncios pagos, você já utiliza ou tem interesse em utilizar o Facebook Ads (incluindo Instagram Ads)?',
      options: [
        'Sim, já utilizo e busco otimizar minhas campanhas',
        'Não utilizo, mas tenho muito interesse em começar',
        'Não utilizo, e ainda não tenho certeza se é o ideal para mim',
        'Não utilizo e não tenho interesse neste momento',
        'Sim, mas não tenho tempo para gerenciar as campanhas',
        'Busco alguém para criar os criativos para meus anúncios',
        'Busco uma solução completa de gestão de tráfego',
        'Minha prioridade é outra área do marketing digital',
        'Estou apenas explorando as opções',
        'Preciso entender melhor como funciona',
      ],
    },
    {
      id: 'visual_content',
      question:
        'Como você descreveria sua necessidade de conteúdo visual para redes sociais (criativos para Facebook e Instagram)?',
      options: [
        'Preciso de criativos sob demanda para minhas campanhas',
        'Busco um plano anual com entrega recorrente de criativos',
        'Já tenho quem crie meus criativos',
        'Não invisto em anúncios no momento',
        'Preciso de ajuda com a estratégia de conteúdo primeiro',
        'Não sei o que preciso',
        'Quero algo que se destaque da concorrência',
        'Busco designs que gerem mais engajamento',
        'Meus criativos atuais não estão performando bem',
        'Quero fortalecer a identidade visual da minha marca',
      ],
    },
    {
      id: 'website_complexity',
      question: 'Qual o nível de complexidade do website que sua empresa busca?',
      options: [
        'Não tenho um website e preciso de uma presença online simples (Landing Page)',
        'Preciso de um website com algumas páginas para apresentar minha empresa (até 5 páginas)',
        'Busco um website com sistema de gerenciamento de conteúdo (CMS/WordPress) para autonomia de atualização',
        'Minha prioridade é um website focado em captação de leads (com pop-ups, banco de dados)',
        'Já tenho um website e busco melhorias/redesign',
        'Não preciso de um website no momento',
        'Não sei qual tipo de website é o ideal para mim',
        'Preciso de algo com um design muito diferenciado',
        'Quero integrar meu website com outras ferramentas',
        'Busco otimização para buscas orgânicas (SEO) no meu website',
      ],
    },
    {
      id: 'website_importance',
      question:
        'Para você, qual a importância de ter um website profissional e funcional?',
      options: [
        'Muito importante: Credibilidade e profissionalismo',
        'Importante: Captar contatos e vendas',
        'Importante: Divulgar meus produtos/serviços',
        'Não muito importante: Minha presença online é principalmente em redes sociais',
        'Essencial: É a base da minha estratégia digital',
        'É um diferencial, mas não uma prioridade',
        'Fundamental para o posicionamento da marca',
        'Quero usar para promoções e ofertas',
        'Preciso de um canal de comunicação direto com clientes',
        'Não tenho certeza da importância para meu negócio',
      ],
    },
    {
      id: 'timeline',
      question:
        'Qual a sua expectativa em relação ao prazo para a entrega dos serviços de marketing digital?',
      options: [
        'O mais rápido possível',
        'Em até 1 mês',
        'De 1 a 3 meses',
        'Não tenho pressa, busco qualidade',
        'Preciso de um cronograma claro antes de iniciar',
        'Tenho um evento ou lançamento próximo',
        'Depende do serviço',
        'Não tenho ideia de prazos',
        'Quero acompanhar o desenvolvimento',
        'Preciso de agilidade na criação de criativos',
      ],
    },
    {
      id: 'company_size',
      question: 'Qual o porte da sua empresa?',
      options: [
        'Pequena empresa (até 19 funcionários)',
        'Média empresa (20 a 99 funcionários)',
        'Grande empresa (mais de 100 funcionários)',
        'Sou autônomo(a) / Profissional Liberal',
        'Startup',
        'Não se aplica / Prefiro não informar',
      ],
    },
    {
      id: 'challenge',
      question: 'Qual o seu principal desafio de marketing digital atualmente?',
      options: [
        'Não consigo gerar leads suficientes',
        'Minhas vendas online estão baixas',
        'Minha marca não é reconhecida no digital',
        'Não sei como atrair o público certo',
        'Falta de conteúdo de qualidade para minhas redes',
        'Meu website é antigo ou não funciona bem',
        'Não consigo analisar os resultados das minhas campanhas',
        'Falta de tempo para gerenciar o marketing',
        'Meus concorrentes estão à frente',
        'Falta de planejamento e estratégia',
      ],
    },
    {
      id: 'contact_preference',
      question:
        'De que forma você prefere ser contatado(a) para discutirmos suas necessidades?',
      options: [
        'E-mail',
        'Telefone',
        'WhatsApp',
        'Videoconferência',
        'Prefiro receber uma proposta inicial por e-mail',
        'Ainda não quero ser contatado(a), apenas estou pesquisando',
        'Sou flexível, qualquer um dos acima',
        'Prefiro agendar um horário',
        'Me ligue no dia [dia da semana]',
        'Envie um resumo dos serviços que me interessam',
      ],
    },
  ];

  const handleOptionChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const getOptionLetter = (index: number) => {
    return String.fromCharCode(97 + index); // Converts 0 to 'a', 1 to 'b', etc.
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
            Formulário de Prospecção
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Preencha o formulário abaixo para que possamos entender melhor suas
            necessidades e oferecer as melhores soluções para o seu negócio
          </p>
        </div>

        <form className="max-w-3xl mx-auto space-y-12">
          {questions.map((q, questionIndex) => (
            <div key={q.id} className="space-y-4">
              <h4 className="text-xl font-poppins font-semibold text-slate-800 dark:text-slate-200">
                {questionIndex + 1}. {q.question}
              </h4>
              <div className="space-y-3">
                {q.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-start p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                      formData[q.id] === option
                        ? 'bg-violet-100 dark:bg-violet-900 border-2 border-violet-600'
                        : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:bg-violet-50 dark:hover:bg-violet-900/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={formData[q.id] === option}
                      onChange={() => handleOptionChange(q.id, option)}
                      className="sr-only"
                    />
                    <span
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm font-semibold ${
                        formData[q.id] === option
                          ? 'bg-violet-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {getOptionLetter(optionIndex)}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-violet-800 transition duration-300"
            >
              Enviar Respostas
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
