import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/rateLimit";
import { buildContactEmailHtml } from "@/lib/contactEmailTemplate";

// E-mail para onde as mensagens do formulário de contato são enviadas.
const CONTACT_TO_EMAIL = "joaopedro_oliva@outlook.com";

// O Resend não deixa enviar de qualquer endereço sem antes verificar um
// domínio próprio (DNS). Até você configurar um domínio verificado no
// painel do Resend, "onboarding@resend.dev" é o remetente de testes deles,
// que funciona sem nenhuma configuração extra.
const FROM_EMAIL = "Portfólio <onboarding@resend.dev>";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  // Campo "honeypot": no formulário real ele fica escondido visualmente,
  // então uma pessoa nunca o preenche. Bots que preenchem formulários
  // automaticamente, porém, costumam preencher todo campo que encontram no
  // HTML — se esse campo chegar com valor, tratamos como spam.
  website?: string;
}

function isValidPayload(data: unknown): data is ContactPayload {
  if (typeof data !== "object" || data === null) return false;
  const { name, email, message } = data as Record<string, unknown>;
  return (
    typeof name === "string" &&
    name.trim().length > 1 &&
    typeof email === "string" &&
    /\S+@\S+\.\S+/.test(email) &&
    typeof message === "string" &&
    message.trim().length > 5
  );
}

// POST /api/contact — recebe os dados do formulário de contato e envia um
// e-mail via Resend. Ficar no servidor (API route) é obrigatório aqui: a
// API key do Resend é secreta e nunca pode ir para o código que roda no
// navegador do visitante.
export async function POST(request: Request) {
  // "x-forwarded-for" é o header que a Vercel (e proxies em geral) usam pra
  // informar o IP original de quem fez a requisição — o Next.js roda atrás
  // de um proxy, então "request" sozinho não expõe o IP diretamente.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas mensagens em pouco tempo. Tente novamente em alguns minutos." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Preencha nome, e-mail e mensagem corretamente." },
      { status: 400 }
    );
  }

  const { name, email, message, website } = body;

  if (website) {
    // Honeypot preenchido = bot. Respondemos como se tivesse dado certo
    // (pra não ensinar o bot a identificar e contornar essa proteção) mas
    // não enviamos e-mail nenhum.
    return NextResponse.json({ ok: true, mode: "honeypot" });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Sem API key configurada (ex.: rodando local sem .env.local), não dá
    // pra chamar o Resend de verdade. Em vez de quebrar o protótipo, só
    // logamos no servidor — assim você ainda consegue testar o formulário
    // ponta a ponta antes de configurar a chave de verdade.
    console.warn("[contact] RESEND_API_KEY não configurada. Mensagem recebida:", {
      name,
      email,
      message,
    });
    return NextResponse.json({ ok: true, mode: "dev-log" });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Novo contato pelo portfólio — ${name}`,
    html: buildContactEmailHtml({ name, email, message }),
    // "text" é o fallback pra clientes de e-mail que não renderizam HTML
    // (raro hoje em dia, mas é boa prática sempre mandar os dois).
    text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
  });

  if (error) {
    console.error("[contact] Falha ao enviar e-mail via Resend:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar a mensagem agora. Tente novamente mais tarde." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, mode: "sent" });
}
