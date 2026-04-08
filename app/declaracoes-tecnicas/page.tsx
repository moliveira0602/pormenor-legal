import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Declarações Técnicas | Pormenor",
  description:
    "Obtenção de declarações técnicas para regularização do seu veículo. Tratamos de toda a documentação necessária junto das entidades competentes.",
};

const servicos = [
  "Certificado CE de Conformidade (COC)",
  "Certificado de Características Técnicas",
  "Certificação Documental – Modelo 9 – ACAP",
  "Declaração de Pneumáticos",
  "Declaração de Peso Bruto Rebocável",
  "Declaração de Nº de Motor",
  "Chapas de Construtor",
  "Homologação IMC",
  "Declaração de Especificações Técnicas",
  "Declaração de Conformidade com Normas Ambientais",
  "Declaração de Equipamento Original",
  "Declaração de Versão/Variant",
];

const assuntoOptions = [
  "",
  "Certificado CE de Conformidade (COC)",
  "Certificado de Características Técnicas",
  "Certificação Documental – Modelo 9 – ACAP",
  "Declaração de Pneumáticos",
  "Declaração de Peso Bruto Rebocável",
  "Declaração de Nº de Motor",
  "Chapas de Construtor",
  "Homologação IMT",
  "Declaração de Especificações Técnicas",
  "Outro",
];

export default function DeclaracoesTecnicas() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-5 h-0.5 bg-primary inline-block" />
            Declarações Técnicas
          </div>
          <h1 className="font-display font-extrabold text-4xl tracking-tight">
            Declarações Técnicas
          </h1>
          <p className="text-white/70 mt-3 max-w-3xl">
            Obtenção de declarações técnicas para regularização do seu veículo.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/#contacts"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-display font-bold no-underline"
            >
              Pedir Orçamento
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display font-extrabold text-navy text-2xl mb-4">
              Lista de Serviços Incluídos
            </h2>
            <p className="text-muted mb-6">
              Tratamos de toda a documentação necessária para a obtenção de
              declarações técnicas junto das entidades competentes.
            </p>
            <ul className="space-y-2 text-muted">
              {servicos.map((servico, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary flex-shrink-0">
                    description
                  </span>
                  <span>{servico}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--border)] p-6 md:p-8">
            <h3 className="font-display font-bold text-navy text-xl mb-4">
              Solicite a sua Declaração Técnica
            </h3>
            <p className="text-muted mb-6">
              Preencha o formulário abaixo para obter um orçamento personalizado.
              Tratamos de todo o processo consigo.
            </p>

            <form className="space-y-6" id="declaracoes-tecnicas-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Assunto *
                  </label>
                  <select
                    required
                    className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="" disabled>
                      Selecione o tipo de declaração
                    </option>
                    {assuntoOptions.map((opcao, index) => (
                      <option key={index} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nome *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Contacto *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+351 912 345 678"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Matrícula ou VIN
                </label>
                <input
                  type="text"
                  className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Ex: AA-00-00 ou WAUZZZ8K6CA123456"
                />
              </div>

              {/* Campo de upload de ficheiros */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Anexar ficheiros (opcional)
                </label>
                <input
                  type="file"
                  name="attachments"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white hover:file:bg-primary-dark"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.zip"
                  multiple
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceitos: PDF, JPG, PNG, DOC, DOCX, ZIP (máx. 10MB por ficheiro)
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full h-[50px] bg-primary hover:bg-primary-dark text-white rounded-lg font-display font-bold text-[0.95rem] flex items-center justify-center gap-2 transition-all"
                >
                  Solicitar Orçamento
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  Entraremos em contacto em até 24h úteis
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}