'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <Header />
      <main role="main" className="min-h-screen bg-stone-50 dark:bg-slate-900">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Política de Privacidade
            </h1>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  1. Introdução
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A BRANDS ("nós", "nosso" ou "empresa") está comprometida em proteger a privacidade 
                  e os dados pessoais de nossos usuários. Esta Política de Privacidade descreve como 
                  coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você 
                  utiliza nosso site e serviços.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ao utilizar nosso site, você concorda com as práticas descritas nesta política. 
                  Recomendamos que você leia esta política cuidadosamente para entender como tratamos 
                  suas informações.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  2. Informações que Coletamos
                </h2>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-4">
                  2.1. Informações Fornecidas por Você
                </h3>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2 mb-4">
                  <li>Nome completo</li>
                  <li>Endereço de e-mail</li>
                  <li>Número de telefone</li>
                  <li>Informações de contato fornecidas através de formulários</li>
                  <li>Mensagens e comunicações enviadas através do site</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-4">
                  2.2. Informações Coletadas Automaticamente
                </h3>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2 mb-4">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador e versão</li>
                  <li>Sistema operacional</li>
                  <li>Páginas visitadas e tempo de permanência</li>
                  <li>Data e hora de acesso</li>
                  <li>Cookies e tecnologias similares (conforme sua preferência de consentimento)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  3. Como Utilizamos suas Informações
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Utilizamos as informações coletadas para os seguintes propósitos:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Fornecer, manter e melhorar nossos serviços</li>
                  <li>Responder a suas solicitações e comunicações</li>
                  <li>Enviar informações sobre nossos serviços e atualizações (com seu consentimento)</li>
                  <li>Analisar o uso do site e melhorar a experiência do usuário</li>
                  <li>Detectar, prevenir e resolver problemas técnicos</li>
                  <li>Cumprir obrigações legais e regulatórias</li>
                  <li>Proteger nossos direitos e propriedade</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  4. Cookies e Tecnologias Similares
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site. 
                  Os cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita 
                  nosso site.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Tipos de cookies que utilizamos:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2 mb-4">
                  <li><strong>Cookies Necessários:</strong> Essenciais para o funcionamento do site</li>
                  <li><strong>Cookies de Análise:</strong> Nos ajudam a entender como os visitantes interagem com o site</li>
                  <li><strong>Cookies de Marketing:</strong> Utilizados para personalizar anúncios e medir campanhas</li>
                  <li><strong>Cookies de Preferências:</strong> Lembram suas escolhas e configurações</li>
                </ul>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Você pode gerenciar suas preferências de cookies através do banner de cookies que aparece 
                  em sua primeira visita ao site. Você também pode configurar seu navegador para recusar 
                  cookies, mas isso pode afetar a funcionalidade do site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  5. Compartilhamento de Informações
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas 
                  seguintes situações:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Com prestadores de serviços que nos auxiliam na operação do site (sob acordos de confidencialidade)</li>
                  <li>Quando exigido por lei ou processo legal</li>
                  <li>Para proteger nossos direitos, propriedade ou segurança</li>
                  <li>Com seu consentimento explícito</li>
                  <li>Em caso de fusão, aquisição ou venda de ativos (com notificação prévia)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  6. Segurança dos Dados
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger 
                  suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. 
                  No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é 100% 
                  seguro.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Medidas de segurança incluem:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Criptografia de dados sensíveis</li>
                  <li>Controles de acesso restritos</li>
                  <li>Monitoramento regular de segurança</li>
                  <li>Atualizações de segurança regulares</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  7. Seus Direitos (LGPD)
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você possui os seguintes direitos:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li><strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
                  <li><strong>Correção:</strong> Solicitar a correção de dados incompletos ou desatualizados</li>
                  <li><strong>Anonimização, Bloqueio ou Eliminação:</strong> Solicitar a remoção de dados desnecessários</li>
                  <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong>Eliminação:</strong> Solicitar a exclusão de dados tratados com seu consentimento</li>
                  <li><strong>Revogação do Consentimento:</strong> Retirar seu consentimento a qualquer momento</li>
                  <li><strong>Informação:</strong> Obter informações sobre compartilhamento de dados</li>
                </ul>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
                  Para exercer seus direitos, entre em contato conosco através do e-mail:{' '}
                  <a 
                    href="mailto:contato@brands.ppg.br" 
                    className="text-violet-700 dark:text-violet-400 hover:underline"
                  >
                    contato@brands.ppg.br
                  </a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  8. Retenção de Dados
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos 
                  descritos nesta política, a menos que um período de retenção mais longo seja exigido ou 
                  permitido por lei. Quando não houver mais necessidade de reter suas informações, elas serão 
                  excluídas ou anonimizadas de forma segura.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  9. Links para Sites de Terceiros
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas 
                  de privacidade ou conteúdo desses sites. Recomendamos que você leia as políticas de privacidade 
                  de qualquer site que visite.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  10. Alterações nesta Política
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre 
                  alterações significativas publicando a nova política nesta página e atualizando a data de 
                  "Última atualização". Recomendamos que você revise esta política periodicamente para se manter 
                  informado sobre como protegemos suas informações.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  11. Contato
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade 
                  ou ao tratamento de seus dados pessoais, entre em contato conosco:
                </p>
                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="text-slate-700 dark:text-slate-300 mb-2">
                    <strong>BRANDS</strong>
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">
                    E-mail:{' '}
                    <a 
                      href="mailto:contato@brands.ppg.br" 
                      className="text-violet-700 dark:text-violet-400 hover:underline"
                    >
                      contato@brands.ppg.br
                    </a>
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    Telefone:{' '}
                    <a 
                      href="https://wa.me/5528992783978" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-violet-700 dark:text-violet-400 hover:underline"
                    >
                      (28) 99278-3978
                    </a>
                  </p>
                </div>
              </section>

              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                <Link
                  href="/"
                  className="text-violet-700 dark:text-violet-400 hover:underline font-medium"
                >
                  ← Voltar para a página inicial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

