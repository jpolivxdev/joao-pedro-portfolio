// Monta o HTML do e-mail que você recebe quando alguém preenche o
// formulário de contato do portfólio.
//
// E-mail HTML é diferente de HTML normal de site: cada cliente de e-mail
// (Gmail, Outlook, Apple Mail...) renderiza com um motor próprio, muitos
// ignoram <style> no <head> e alguns nem suportam Flexbox/Grid direito.
// Por isso o padrão do mercado pra HTML de e-mail é: estilo inline (attr
// "style" em cada tag, não classes) e layout com <table>, em vez de
// div/flex — é mais "feio" de escrever, mas é o que renderiza igual em
// mais lugares.

interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

const ACCENT = "#3b82f6";
const INK = "#0d1117";
const MUTED = "#57606a";
const BORDER = "#e6edf3";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactEmailHtml({ name, email, message }: ContactEmailData) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  // Mensagem pode ter quebras de linha — convertidas pra <br> porque HTML
  // ignora "\n" sozinho.
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <body style="margin:0;padding:32px 16px;background-color:#f6f8fa;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background-color:#ffffff;border:1px solid ${BORDER};border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background-color:${INK};padding:20px 28px;">
          <span style="color:#ffffff;font-size:16px;font-weight:bold;">
            Novo contato pelo portfólio
          </span>
        </td>
      </tr>
      <tr>
        <td style="padding:28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:16px;">
                <span style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:${MUTED};">Nome</span>
                <span style="display:block;font-size:15px;color:${INK};margin-top:4px;">${safeName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:16px;">
                <span style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:${MUTED};">E-mail</span>
                <a href="mailto:${safeEmail}" style="display:block;font-size:15px;color:${ACCENT};margin-top:4px;text-decoration:none;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding-top:8px;border-top:1px solid ${BORDER};">
                <span style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:${MUTED};margin-top:16px;">Mensagem</span>
                <p style="font-size:15px;line-height:1.6;color:${INK};margin:8px 0 0;">${safeMessage}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;background-color:#f6f8fa;border-top:1px solid ${BORDER};">
          <span style="font-size:12px;color:${MUTED};">
            Enviado automaticamente pelo formulário de contato do seu portfólio. Responda direto pra este e-mail — o "responder" já vai pro remetente acima.
          </span>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
