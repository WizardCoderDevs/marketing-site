// Define a interface para a estrutura de dados de um serviço.
export interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'advertising' | 'web';
  features: string[];
  tagline: string;
  how: string[];
  benefits: string[];
}

// Array de dados de serviços, tipado com a interface ServiceData.
const servicesData: ServiceData[] = [
  {
    id: 'gestao-trafego',
    category: 'advertising',
    title: 'Gestão de Tráfego Pago com Google Ads',
    tagline: 'Alcance o público certo com Google Ads.',
    icon: '🎯',
    description:
      'A Gestão de Tráfego Pago com foco em Google Ads é a chave para colocar sua marca em destaque, alcançando um público qualificado e interessado nos seus produtos ou serviços. Gerenciamos suas campanhas de anúncios nas plataformas do Google, otimizando o investimento para gerar o máximo retorno.',
    how: [
      '**Campanhas semanais:** Gerenciamento contínuo com ajustes e otimizações para performance.',
      '**Anúncios estratégicos:** Campanhas otimizadas para busca, display e YouTube, garantindo alta visibilidade.',
      '**Criativos inclusos:** Desenvolvemos designs e textos atrativos para suas campanhas.',
      '**Revisão e alinhamento:** As informações, logo da empresa e paleta de cores devem ser enviadas com uma semana de antecedência ao início da campanha para revisão e ajustes.',
    ],
    benefits: [
      '**Aumento da Visibilidade:** Sua marca aparece quando seus clientes procuram por você no Google.',
      '**Geração de Leads Qualificados:** Atraia pessoas que realmente se interessam pelo seu negócio.',
      '**Otimização do ROI:** Garantimos que cada centavo investido traga o melhor resultado.',
      '**Segmentação Precisa:** Atinja o público certo, com base em palavras-chave, localização e comportamento de busca.',
      '**Aumento do Faturamento e Vendas:** Direcione tráfego qualificado e com intenção de compra para seus canais de venda.',
      '**Visibilidade em Múltiplos Formatos:** Anúncios em busca, display, YouTube e Shopping.',
    ],
    features: [
      'Gestão de Campanhas',
      'Otimização de Palavras-chave',
      'Análise de Performance',
      'Relatórios de Performance',
    ],
  },
  {
    id: 'site-single-page',
    category: 'web',
    title: 'Website de Página Única',
    tagline: 'Uma landing page profissional, clara e concisa.',
    icon: '📄',
    description:
      'Um website de página única é a solução ideal para apresentar sua empresa de forma clara, concisa e profissional. Perfeito para quem busca uma presença online elegante e eficiente, focada em transmitir a essência do seu negócio.',
    how: [
      '**Estrutura Otimizada:** Até 5 sessões, barra de navegação superior e footer.',
      '**Design Responsivo:** Adaptável a todos os dispositivos para uma experiência de usuário impecável.',
      '**Valor e Prazo Variáveis:** O custo e o tempo de entrega são definidos pela complexidade.',
      '**Início Pós-Contrato:** O desenvolvimento é iniciado após a validação do contrato.',
    ],
    benefits: [
      '**Presença Digital Profissional:** Construa uma imagem de credibilidade e profissionalismo.',
      '**Primeira Impressão Marcante:** Um design moderno e intuitivo causa uma excelente impressão.',
      '**Canal de Captação de Contatos:** Forneça um ponto de contato fácil e direto.',
      '**Divulgação de Produtos/Serviços:** Apresente de forma eficaz seu portfólio e diferenciais.',
      '**Oportunidade de Promoções:** Tenha um espaço exclusivo para veicular promoções e cupons.',
      '**Credibilidade e Confiança:** Um site bem construído aumenta a confiança dos consumidores.',
    ],
    features: [
      'Planejamento de Conteúdo',
      'Design de Posts',
      'Gestão de Comunidade',
      'Relatórios de Performance',
    ],
  },
  {
    id: 'site-multi-page',
    category: 'web',
    title: 'Website Multi-Páginas',
    tagline: 'Presença online robusta com até 5 páginas detalhadas.',
    icon: '📑',
    description:
      'Para empresas que necessitam de uma presença online mais robusta e detalhada, o website institucional com múltiplas páginas permite explorar cada aspecto do seu negócio com profundidade, oferecendo uma experiência completa ao visitante.',
    how: [
      '**Navegação Completa:** Estrutura com até 5 páginas interligadas por navegação e footer.',
      '**Design Personalizado:** Criamos um layout exclusivo que reflete a identidade da sua marca.',
      '**Valor e Prazo Flexíveis:** O custo e o prazo variam de acordo com a complexidade.',
      '**Início Pós-Contrato:** O desenvolvimento começa após a validação do contrato.',
    ],
    benefits: [
      '**Informações Detalhadas:** Ofereça aos seus clientes uma visão abrangente sobre sua empresa.',
      '**Melhora da Experiência do Usuário:** Uma navegação intuitiva facilita a jornada do visitante.',
      '**Posicionamento de Mercado:** Um website completo demonstra profissionalismo e solidez.',
      '**Oportunidades de SEO:** Páginas otimizadas aumentam a visibilidade no Google.',
      '**Canais de Comunicação Múltiplos:** Integre formulários, mapas e redes sociais.',
    ],
    features: [
      'Planejamento de Conteúdo',
      'Design de Posts',
      'Gestão de Comunidade',
      'Relatórios de Performance',
    ],
  },
  {
    id: 'site-cms',
    category: 'web',
    title: 'Website com CMS (WordPress)',
    tagline: 'Autonomia total para gerenciar seu conteúdo e blog.',
    icon: '⚙️',
    description:
      'Um website com CMS (Content Management System), como o WordPress, oferece total autonomia para sua empresa gerenciar e atualizar seu próprio conteúdo, como posts de blog e artigos, sem depender de programadores.',
    how: [
      '**Plataforma Robusta:** Desenvolvido em WordPress, flexível e escalável.',
      '**Controle de Conteúdo:** Capacidade de publicar posts e artigos (conteúdo é responsabilidade do cliente).',
      '**Design Flexível:** Valor e prazo variam conforme a complexidade visual e usabilidade.',
      '**Início Pós-Contrato:** O serviço é iniciado após a validação do contrato.',
    ],
    benefits: [
      '**Autonomia Total:** Atualize textos, imagens e publique artigos a qualquer momento.',
      '**Estratégia de Conteúdo e SEO:** Crie um blog para atrair tráfego orgânico e gerar leads.',
      '**Escalabilidade:** A plataforma permite adicionar novas funcionalidades facilmente.',
      '**Comunicação Proativa:** Mantenha seus clientes informados sobre novidades.',
      '**Redução de Custos a Longo Prazo:** Menos dependência de terceiros para atualizações.',
    ],
    features: [
      'Planejamento de Conteúdo',
      'Design de Posts',
      'Gestão de Comunidade',
      'Relatórios de Performance',
    ],
  },
  {
    id: 'site-leads',
    category: 'web',
    title: 'Website para Captação de Leads',
    tagline: 'Transforme visitantes em valiosas oportunidades comerciais.',
    icon: '🧲',
    description:
      'Este serviço é projetado para transformar visitantes em valiosos leads comerciais. Com recursos estratégicos, como pop-ups de cadastro, seu website se tornará uma máquina de captação de contatos.',
    how: [
      '**Mecanismos de Captação:** Website otimizado com pop-up para cadastro de e-mail, nome e WhatsApp.',
      '**Integração com Banco de Dados:** Inclui sistema para armazenamento seguro e coleta dos dados.',
      '**Customização:** Valor e prazo dependem da complexidade visual e dos requisitos do sistema.',
      '**Início Pós-Contrato:** O serviço é iniciado após a validação do contrato.',
    ],
    benefits: [
      '**Aumento da Base de Leads:** Transforme o tráfego do seu site em uma lista de potenciais clientes.',
      '**Nutrição de Leads:** Implemente estratégias de e-mail marketing e comunicação via WhatsApp.',
      '**Conversão Acelerada:** Facilite o processo de conversão com formulários claros.',
      '**Dados Valiosos para Vendas:** Colete informações cruciais para sua equipe de vendas.',
      '**Crescimento do Faturamento:** Mais leads significam mais oportunidades de vendas.',
      '**Oportunidade de Remarketing:** Crie campanhas direcionadas para quem demonstrou interesse.',
    ],
    features: [
      'Planejamento de Conteúdo',
      'Design de Posts',
      'Gestão de Comunidade',
      'Relatórios de Performance',
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description:
      'Criação e gestão de conteúdo para suas redes sociais, aumentando o engajamento e a visibilidade da sua marca.',
    icon: '📱',
    category: 'advertising',
    features: [
      'Planejamento de Conteúdo',
      'Design de Posts',
      'Gestão de Comunidade',
      'Relatórios de Performance',
    ],
    tagline: 'Aumente o engajamento e a visibilidade da sua marca nas redes sociais',
    how: [
      'Análise do perfil atual e definição de objetivos',
      'Criação de calendário editorial personalizado',
      'Produção de conteúdo visual e textual',
      'Monitoramento e relatórios de performance',
    ],
    benefits: [
      'Maior visibilidade da marca',
      'Engajamento com o público-alvo',
      'Construção de autoridade no segmento',
      'Aumento de leads e conversões',
    ],
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Páginas de conversão otimizadas para transformar visitantes em clientes.',
    icon: '🎯',
    category: 'web',
    features: [
      'Design Responsivo',
      'Otimização SEO',
      'Formulários de Captura',
      'Integração com CRM',
    ],
    tagline: 'Transforme visitantes em clientes com páginas otimizadas',
    how: [
      'Análise de objetivos e público-alvo',
      'Design focado em conversão',
      'Desenvolvimento responsivo',
      'Integração com ferramentas de marketing',
    ],
    benefits: [
      'Maior taxa de conversão',
      'Experiência otimizada para mobile',
      'Integração com ferramentas de marketing',
      'Análise de comportamento do usuário',
    ],
  },
  // {
  //   id: 'ecommerce',
  //   title: 'E-commerce',
  //   description: 'Lojas virtuais completas e otimizadas para vender seus produtos online.',
  //   icon: '🛍️',
  //   category: 'web',
  //   features: [
  //     'Catálogo de Produtos',
  //     'Carrinho de Compras',
  //     'Pagamentos Seguros',
  //     'Gestão de Estoque',
  //   ],
  //   tagline: 'Venda seus produtos online com uma loja virtual completa',
  //   how: [
  //     'Planejamento da estrutura da loja',
  //     'Desenvolvimento da plataforma',
  //     'Integração com meios de pagamento',
  //     'Configuração de logística',
  //   ],
  //   benefits: [
  //     'Vendas 24/7',
  //     'Gestão centralizada',
  //     'Múltiplos meios de pagamento',
  //     'Relatórios de vendas detalhados',
  //   ],
  // },
];

export default servicesData;
