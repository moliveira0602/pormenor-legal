import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Termos e Condições | Pormenor",
  description: "Termos e Condições de Utilização do website e softwares associados da Pormenor.",
};

export default function TermosECondicoes() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="font-display font-extrabold text-4xl tracking-tight">Termos e Condições</h1>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-[var(--border)] shadow-[0_4px_32px_rgba(7,17,43,0.06)]">
            <p className="text-muted leading-relaxed">
              O Utilizador do website e softwares associados reconhece que ao usar a mesma está a aceitar os presentes Termos de Utilização.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Alteração dos Termos de Utilização</h2>
            <p className="text-muted leading-relaxed">
              A Pormenor reserva-se o direito de, a qualquer momento, sem necessidade de aviso prévio e com efeitos imediatos, alterar, adicionar, atualizar ou eliminar, parcial ou totalmente os presentes Termos de Utilização. Deve verificar as alterações e se não concordar, deve abandonar o website.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Acesso ao Software</h2>
            <p className="text-muted leading-relaxed">
              A Pormenor tem o direito exclusivo de a qualquer momento, suspender, parcial ou totalmente, o acesso ao website e softwares associados, em especial nas operações de gestão, manutenção, reparação, alteração ou modernização e encerrar, definitiva ou temporariamente, parcial ou totalmente, a qualquer momento, de acordo com a sua vontade, o sistema ou qualquer um dos serviços, sem aviso prévio.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Direitos de Propriedade Intelectual</h2>
            <p className="text-muted leading-relaxed">
              O Utilizador reconhece que os conteúdos do website e softwares associados estão protegidos por direitos de propriedade intelectual e obriga-se a respeitar tais direitos.
            </p>
            <p className="text-muted leading-relaxed">
              Os direitos sobre textos, imagens, gráficos, som e animação e todas as outras informações, bem como o modo como são representadas graficamente no sistema, incluindo as marcas, logótipos, símbolos e a disposição e estrutura do mesmo são da titularidade da Pormenor.
            </p>
            <p className="text-muted leading-relaxed">
              O Utilizador não está autorizado a transmitir, publicar, modificar, copiar, vender, utilizar ou distribuir, por qualquer forma, os textos, imagens ou outras informações contidas neste website e/ou softwares associados ou parte deles sem autorização prévia, por escrito, da Pormenor. A utilização de marcas e logótipos no website e softwares associados assim como a disponibilização dos materiais existentes nos mesmos, não concedem, nem podem ser interpretados como concedendo, permissão aos Utilizadores para utilizar, direta ou indiretamente, tais marcas, logótipos ou materiais.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Dados Pessoais</h2>
            <p className="text-muted leading-relaxed">
              A utilização deste sistema não implica necessariamente o fornecimento de dados pessoais. No entanto, caso pretenda solicitar pedidos de esclarecimento, sugestões ou proceder à marcação de reuniões deverá indicar-nos alguns dados, incluindo o seu nome, endereço de e-mail e número de telefone, sendo os mesmos tratados nos termos definidos na Política de Privacidade, disponível neste website.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Informações</h2>
            <p className="text-muted leading-relaxed">
              A informação disponibilizada no sistema visa essencialmente esclarecer e informar os Utilizadores sobre aspetos relativos à atividade e aos serviços prestados pela Pormenor.
            </p>
            <p className="text-muted leading-relaxed">
              As informações disponibilizadas foram objeto de análise minuciosa. No entanto, tais informações têm um carácter meramente indicativo, podendo conter erros ou imprecisões, e não dispensando, por exemplo, a consulta aos serviços prestados.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Responsabilidade</h2>
            <p className="text-muted leading-relaxed">
              A Pormenor não será responsável por erros que possam ocorrer devido a irregularidades do sistema, falha (temporária ou permanente) do website e/ou softwares associados, das aplicações ou de outras ferramentas. A Pormenor não se responsabiliza por quaisquer danos resultantes da utilização indevida ou da impossibilidade de utilização do sistema.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Links</h2>
            <p className="text-muted leading-relaxed">
              A plataforma <a href="https://pormenor.pt" target="_blank" rel="noreferrer" className="text-primary underline">https://pormenor.pt</a> poderá disponibilizar links para páginas de outras entidades. Estes sites não pertencem, nem são operados ou controlados pela Pormenor, pelo que não se responsabiliza, aprova ou por qualquer forma apoia ou subscreve o conteúdo desses sites, nem dos sites com ele ligados ou neles referidos. A utilização destes links é da inteira responsabilidade dos Utilizadores.
            </p>
            <p className="text-muted leading-relaxed">
              A criação de links para <a href="https://pormenor.pt" target="_blank" rel="noreferrer" className="text-primary underline">https://pormenor.pt</a> carece de autorização prévia, por escrito.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Validade dos Termos e Condições de Utilização</h2>
            <p className="text-muted leading-relaxed">
              Se alguma parte ou disposição dos presentes Termos de Utilização não for executável ou estiver em conflito com a lei aplicável, a validade das restantes partes ou disposições não será afetada.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Lei Aplicável</h2>
            <p className="text-muted leading-relaxed">
              À gestão, administração, utilização e aplicação dos Termos de Utilização do site e softwares associados é aplicável a Lei Portuguesa.
            </p>

            <h2 className="font-display font-bold text-navy text-xl mt-8 mb-2">Foro Competente</h2>
            <p className="text-muted leading-relaxed">
              Para dirimir, todas as questões e litígios que possam surgir, inerentes aos presentes Termos e Condições, é competente em exclusivo o foro da Comarca de Braga, com expressa renúncia de qualquer outro.
            </p>
          </div>
        </div>
      </section>

      <Footer showContacts={false} />
    </main>
  );
}
