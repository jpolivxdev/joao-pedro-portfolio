"use client"; // formulário precisa de estado (valores digitados, status de
// envio) e de um evento onSubmit — nada disso existe em Server Components.

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // Controla o botão "Enviar" (fica desabilitado até a pessoa marcar o
  // consentimento) — é mais claro pra quem preenche do que deixar clicar
  // e só then mostrar um erro.
  const [consent, setConsent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!consent) {
      setStatus("error");
      setErrorMessage("É necessário concordar com o uso dos dados para enviar a mensagem.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      // Campo honeypot: veja o comentário no <input name="website"> abaixo.
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };

    try {
      // Chama nossa própria API route (/api/contact), que roda no servidor
      // e é quem de fato conversa com o Resend usando a API key secreta.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Erro ao enviar mensagem.");
      }

      setStatus("success");
      form.reset();
      // form.reset() só limpa o HTML; o checkbox é "controlado" pelo React
      // (checked={consent}), então precisa zerar o estado também, senão ele
      // volta a aparecer marcado no próximo render.
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Erro ao enviar mensagem.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot anti-spam: escondido de gente de verdade com CSS (nunca
          com "display: none" — alguns bots já sabem ignorar campos assim),
          mas continua presente no HTML, então bots que preenchem tudo que
          encontram acabam preenchendo ele também. tabIndex=-1 e
          autoComplete="off" evitam que ele atrapalhe a navegação por
          teclado ou o autopreenchimento do navegador. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px overflow-hidden"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          className="w-full rounded-lg border border-border bg-background-elevated px-4 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-background-elevated px-4 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-accent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={6}
          rows={4}
          className="w-full rounded-lg border border-border bg-background-elevated px-4 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-accent resize-none"
        />
      </div>

      {/* Consentimento LGPD: a pessoa precisa marcar essa caixa antes de
          conseguir enviar. Não é aconselhamento jurídico, mas é a prática
          comum pra deixar explícito pra que os dados (nome, e-mail e
          mensagem) serão usados — aqui, só responder o contato por e-mail,
          nada é salvo em banco de dados. */}
      <label className="flex items-start gap-2.5 text-xs text-muted">
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-border bg-background-elevated accent-[var(--color-accent)] shrink-0"
        />
        Autorizo o uso destes dados (nome, e-mail e mensagem) apenas para que João Pedro
        entre em contato comigo, conforme a LGPD.
      </label>

      <button
        type="submit"
        disabled={status === "sending" || !consent}
        className="rounded-full bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed self-start"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="text-sm text-accent">Mensagem enviada! Retorno em breve.</p>
        )}
        {status === "error" && <p className="text-sm text-red-400">{errorMessage}</p>}
      </div>
    </form>
  );
}
