"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brands, getAvailableLetters } from "@/lib/coc/brands";

export default function PedidoDeCOC() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<typeof brands[0] | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filteredBrands = useMemo(() => {
    if (!activeLetter) return brands;
    return brands.filter(
      (b) =>
        b.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .charAt(0)
          .toUpperCase() === activeLetter
    );
  }, [activeLetter]);

  const handleBrandClick = (brand: typeof brands[0]) => {
    setSelectedBrand(brand);
    // Rolar até o formulário
    const formSection = document.getElementById("form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    // Collect file attachments
    const fileInputs = e.currentTarget.querySelectorAll('input[type="file"]');
    const attachments = Array.from(fileInputs)
      .flatMap(input => Array.from(input.files || []))
      .filter(file => file.size > 0); // Filter out empty files

    // Convert files to base64 for JSON transmission
    const attachmentPromises = attachments.map(file =>
      new Promise<string | null>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      })
    );

    try {
      // Wait for all files to be converted to base64
      const attachmentResults = await Promise.all(attachmentPromises);
      const attachmentData = attachmentResults
        .map((result, index) => ({
          name: attachments[index]?.name || `file_${index}`,
          type: attachments[index]?.type || 'application/octet-stream',
          data: result // base64 encoded
        }))
        .filter(att => att.data !== null); // Remove failed conversions

      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        plate: formData.get("plate"),
        vin: formData.get("vin"),
        message: formData.get("message"),
        brand: selectedBrand?.name || formData.get("brand"),
        subject: "Pedido de COC",
        attachments: attachmentData
      };

      const response = await fetch("/send-mail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Ocorreu um erro ao enviar o pedido. Por favor tente novamente.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao enviar o pedido. Por favor tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero section */}
      <section className="bg-[var(--navy)] text-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            Pedido de COC
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Certificado de Conformidade para legalização de veículos importados.
            Tratamos do pedido junto do representante oficial da marca.
          </p>
        </div>
      </section>

      {/* Seção de seleção de marcas */}
      <section className="py-12 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl text-navy mb-2">
              Selecione a marca do seu veículo
            </h2>
            <p className="text-muted">
              Clique na logo da marca para preencher automaticamente o formulário
            </p>
          </div>

          {/* Filtro por letra */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-8">
            {getAvailableLetters(brands).map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                  activeLetter === letter
                    ? "bg-primary text-white"
                    : "bg-[var(--navy-mid)]/5 text-navy hover:bg-primary/10 hover:text-primary border border-[var(--border)]"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Grade de logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {filteredBrands.map((brand) => (
              <button
                key={brand.slug}
                onClick={() => handleBrandClick(brand)}
                className={`group bg-white rounded-xl border ${
                  selectedBrand?.slug === brand.slug
                    ? "border-primary bg-primary/5"
                    : "border-[var(--border)] hover:border-primary"
                } hover:shadow-[0_6px_24px_rgba(199,106,58,0.12)] transition-all p-4 flex flex-col items-center text-center gap-2`}
              >
                <div className="w-16 h-16 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="font-display font-bold text-navy text-sm group-hover:text-primary transition-colors">
                  {brand.name}
                </span>
                <span className="text-primary font-bold text-sm">
                  {brand.price}€
                </span>
                <span className="text-muted text-xs">
                  {brand.daysMin}–{brand.daysMax} dias
                </span>
              </button>
            ))}
          </div>

          {filteredBrands.length === 0 && (
            <p className="text-center text-muted">
              Nenhuma marca encontrada com a letra selecionada.
            </p>
          )}

          <p className="text-center text-muted text-sm">
            Não encontrou a marca pretendida?{" "}
            <a href="/#contacts" className="text-primary font-semibold hover:underline">
              Entre em contacto connosco
            </a>
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section id="form" className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 md:p-10">
            {submitted ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Pedido enviado com sucesso!</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Recebemos o seu pedido de COC. Entraremos em contacto em até 24h úteis para confirmar os dados e apresentar o orçamento.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all"
                >
                  Enviar novo pedido
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-display font-extrabold text-center text-gray-900 mb-3">
                    {selectedBrand ? `Solicitar COC ${selectedBrand.name}` : "Solicitar COC"}
                  </h2>
                  <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Preencha os dados do veículo para avançarmos com o pedido.
                  </p>
                </div>

                {/* Informações da marca selecionada */}
                {selectedBrand && (
                  <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                          <img
                            src={selectedBrand.logo}
                            alt={selectedBrand.name}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-bold text-gray-900">{selectedBrand.name}</h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                              <span className="text-primary font-bold text-lg">{selectedBrand.price}€</span>
                              <span className="text-gray-500 text-xs ml-1">preço</span>
                            </div>
                            <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                              <span className="text-gray-900 font-bold text-lg">{selectedBrand.daysMin}-{selectedBrand.daysMax}</span>
                              <span className="text-gray-500 text-xs ml-1">dias úteis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedBrand(null)}
                        className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                      >
                        Alterar marca
                      </button>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Nome *
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        name="email"
                        required
                        className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="seu@email.com"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Telemóvel
                      </label>
                      <input
                        name="phone"
                        className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="+351 912 345 678"
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Matrícula
                      </label>
                      <input
                        name="plate"
                        className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Ex: AA-00-00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Número de Chassis (VIN) *
                    </label>
                    <input
                      name="vin"
                      required
                      className="w-full h-[52px] bg-white border border-gray-300 rounded-lg px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Ex: WAUZZZ8K6CA123456"
                    />
                  </div>

                  {/* Documentos necessários baseados na marca */}
                  {selectedBrand && selectedBrand.docs.length > 0 && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Documentos necessários para {selectedBrand.name}
                      </h4>
                      <ul className="space-y-2">
                        {selectedBrand.docs.map((doc, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Mensagem adicional
                    </label>
                    <textarea
                      name="message"
                      className="w-full h-[120px] bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Detalhes adicionais sobre o veículo ou instruções especiais (opcional)"
                    />
                  </div>

                  {/* Campo de upload de ficheiros */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Anexar ficheiros
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

                  {/* Campo oculto para a marca */}
                  <input type="hidden" name="brand" value={selectedBrand?.name || ""} />

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-[50px] bg-primary hover:bg-primary-dark text-white rounded-lg font-display font-bold text-[0.95rem] flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          A enviar...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Enviar Pedido de COC
                        </>
                      )}
                    </button>
                    <p className="text-center text-gray-500 text-sm mt-3">
                      Entraremos em contacto em até 24h úteis
                    </p>
                  </div>

                  {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Informações adicionais */}
      <section className="py-12 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-display font-bold text-navy text-xl mb-3">O que é o COC?</h3>
              <p className="text-muted">
                O Certificado de Conformidade (COC) é um documento oficial emitido pelo fabricante que comprova que o veículo cumpre todas as normas técnicas e ambientais da União Europeia.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-display font-bold text-navy text-xl mb-3">Quando é necessário?</h3>
              <ul className="text-muted space-y-2">
                <li>• Importação de veículo da UE ou fora da UE</li>
                <li>• Regularização de dados técnicos</li>
                <li>• Confirmação de variantes para o IMT</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-display font-bold text-navy text-xl mb-3">Como funciona?</h3>
              <ol className="text-muted space-y-2">
                <li>1. Envio dos dados do veículo</li>
                <li>2. Validação e orçamento</li>
                <li>3. Pedido ao fabricante</li>
                <li>4. Entrega do COC</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Footer showContacts={false} />
    </main>
  );
}