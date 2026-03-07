import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidade | Pormenor",
  description: "Política de Privacidade e disposições legais de utilização da Pormenor.",
};

export default function PoliticaDePrivacidade() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="font-display font-extrabold text-4xl tracking-tight">Política de Privacidade</h1>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-[var(--border)] shadow-[0_4px_32px_rgba(7,17,43,0.06)]">
            <h2 className="font-display font-bold text-navy text-xl mb-2">Disposições Legais de Utilização</h2>
            <h3 className="font-display font-bold text-navy text-lg mb-2">Responsável pelo tratamento de dados</h3>
            <p className="text-muted leading-relaxed">
              A Pormenor, com o email <a href="mailto:geral@pormenor.pt" className="text-primary underline">geral@pormenor.pt</a>, é a responsável pelo tratamento dos seus dados pessoais.
            </p>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">Finalidades do tratamento</h3>
            <p className="text-muted leading-relaxed">Os dados pessoais que tratamos através desta página serão unicamente utilizados para as seguintes finalidades:</p>
            <ul className="list-disc pl-5 text-muted space-y-2 mt-2">
              <li>Comunicação com clientes e esclarecimento de dúvidas;</li>
              <li>Processamento de pedidos de informação e marcação de reuniões;</li>
              <li>Comunicações de marketing direto (caso tenha consentido no tratamento dos seus dados pessoais para esta finalidade);</li>
              <li>Processamento de faturas depois de realizado o serviço pretendido;</li>
              <li>Processamento e elaboração de orçamentos;</li>
              <li>Solicitação de apoio/suporte ao serviço adquirido.</li>
            </ul>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">Prazo de Conservação</h3>
            <p className="text-muted leading-relaxed">Conservamos os seus dados apenas durante o período que for necessário no âmbito da finalidade para a qual estes foram recolhidos.</p>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">Consentimento</h3>
            <p className="text-muted leading-relaxed">
              Ao consentir nesta política de privacidade, está a dar permissão para processar os seus dados pessoais especificamente para os fins identificados e selecionados. Se o consentimento for legalmente necessário para o tratamento de dados pessoais, o titular dos dados tem o direito de retirar o seu consentimento em qualquer altura, embora esse direito não comprometa a licitude do tratamento efetuado com base no consentimento previamente dado nem o tratamento posterior dos mesmos dados, baseado noutra base legal, como é o caso de uma obrigação legal a que a Pormenor esteja sujeita. Para retirar o seu consentimento, pode contactar-nos através de carta ou do endereço de e-mail <a href="mailto:geral@pormenor.pt" className="text-primary underline">geral@pormenor.pt</a>.
            </p>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">Direitos dos utilizadores</h3>
            <p className="text-muted leading-relaxed">O utilizador pode exercer a todo o tempo os seus direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade, através de solicitação por qualquer dos seguintes meios:</p>
            <ul className="list-disc pl-5 text-muted space-y-2 mt-2">
              <li>E-mail: <a href="mailto:geral@pormenor.pt" className="text-primary underline">geral@pormenor.pt</a></li>
              <li>Através do menu RGPD da área privada: Clique no menu e escolha a opção mais apropriada.</li>
            </ul>
            <p className="text-muted leading-relaxed mt-2">O titular poderá ainda apresentar reclamações sobre o tratamento de dados junto da Comissão Nacional de Proteção de Dados.</p>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">Transferências internacionais de dados</h3>
            <p className="text-muted leading-relaxed">
              A Pormenor, poderá no, âmbito das finalidades descritas, transferir os seus dados do utilizador para fora do território do Espaço Económico Europeu (EEE). Nestes casos, cumprirá rigorosamente as disposições legais aplicáveis, nomeadamente à determinação da adequabilidade do(s) país(es) de destino no que respeita à proteção de dados pessoais e aos requisitos aplicáveis a tais transferências.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-10 mb-2">Uso de Cookies</h2>
            <p className="text-muted leading-relaxed">
              A nossa política de utilização de cookies foi criada para o informar da forma como a Pormenor utiliza os dados de navegação, ou qualquer outra informação que tratamos em relação ao acesso e à utilização dos websites e outros conteúdos multimédia da Pormenor, diretamente ou por intermediário de conteúdos publicitários presentes noutros websites.
            </p>
            <p className="text-muted leading-relaxed mt-2">
              Estas informações são comunicadas de acordo com a regulamentação em vigor, incluindo o RGPD e a diretiva 2002/58/CE.
            </p>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">1. Os diferentes cookies</h3>
            <p className="text-muted leading-relaxed">No âmbito desta política, “cookies e outros marcadores” representam o conjunto de marcadores registados ou lidos durante a consulta dos websites e conteúdos multimédia da Pormenor, na UE ou EEE.</p>
            <p className="text-muted leading-relaxed mt-2">Exemplos: cookies http e “flash”, web beacons/píxeis, scripts ou “fingerprinting”.</p>
            <h4 className="font-display font-bold text-navy mt-4">O que é um ficheiro cookie?</h4>
            <p className="text-muted leading-relaxed">Um cookie é um conjunto de informações de pequeno tamanho, conservado no seu terminal quando consulta determinados websites.</p>
            <h4 className="font-display font-bold text-navy mt-4">O que é um web beacon?</h4>
            <p className="text-muted leading-relaxed">Um web beacon é um código ou imagem presente em certas páginas para controlar o tráfego.</p>
            <h4 className="font-display font-bold text-navy mt-4">O que é o cálculo de pegada?</h4>
            <p className="text-muted leading-relaxed">“Fingerprinting” cria um identificador único da máquina baseado na configuração para efeitos de acompanhamento.</p>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">2. Cookies utilizados nos websites da Pormenor</h3>
            <p className="text-muted leading-relaxed">Existem diferentes razões para utilização de cookies:</p>
            <h4 className="font-display font-bold text-navy mt-4">(A) Cookies essenciais</h4>
            <p className="text-muted leading-relaxed">Necessários ao funcionamento do website e comunicação eletrónica. Não requerem consentimento.</p>
            <ul className="list-disc pl-5 text-muted space-y-2 mt-2">
              <li>Garantem qualidade e segurança de navegação.</li>
              <li>Conservam informações inseridas entre páginas.</li>
              <li>Permitem permanência no mesmo servidor durante a sessão.</li>
              <li>Redirecionam para idioma/filial adequada.</li>
              <li>Gerem picos de carga.</li>
              <li>Registam aceitação/recusa da análise de dados.</li>
            </ul>
            <h4 className="font-display font-bold text-navy mt-4">(B) Cookies de melhoria</h4>
            <p className="text-muted leading-relaxed">Melhoram a experiência (ex.: análise de comportamento, chatbot, livechat). Requerem consentimento.</p>
            <h4 className="font-display font-bold text-navy mt-4">(C) Cookies publicitários e de personalização</h4>
            <p className="text-muted leading-relaxed">Oferecem conteúdos e ofertas adaptados aos seus interesses. Requerem consentimento.</p>
            <h4 className="font-display font-bold text-navy mt-4">(D) Cookies de terceiros</h4>
            <p className="text-muted leading-relaxed">Permitem partilha de conteúdos e utilização de ferramentas de terceiros (redes sociais, vídeo). Consulte as políticas desses terceiros.</p>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">3. Cookies e meios de comunicação terceiros</h3>
            <p className="text-muted leading-relaxed">A Pormenor está presente em diferentes médias geridos por terceiros. A navegação/interação pode ser comunicada à Pormenor para aferir pertinência de conteúdos e campanhas.</p>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">4. Como gerir estes cookies?</h3>
            <p className="text-muted leading-relaxed">O consentimento pode ser formulado via parâmetros do browser ou solução de gestão de tags/banners de cookies implementada pela Pormenor.</p>
            <p className="text-muted leading-relaxed mt-2">Bloquear cookies pode afetar funcionalidades e segurança da navegação.</p>

            <h3 className="font-display font-bold text-navy text-lg mt-8 mb-2">5. Exercer os seus direitos</h3>
            <p className="text-muted leading-relaxed">Dispõe de direitos de acesso, retificação, oposição, limitação e eliminação. Exerça-os na área reservada em pormenor.pt (menu RGPD) ou via <a href="mailto:geral@pormenor.pt" className="text-primary underline">geral@pormenor.pt</a>. Pode apresentar reclamação junto da autoridade competente.</p>
          </div>
        </div>
      </section>

      <Footer showContacts={false} />
    </main>
  );
}
