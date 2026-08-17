interface LeadRequest {
  method?: string;
  body?: unknown;
}

interface LeadResponse {
  status(code: number): LeadResponse;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
}

type Lead = { name: string; phone: string; service: string; message: string; website?: string };

function valid(body: unknown): body is Lead {
  if (!body || typeof body !== 'object') return false;
  const lead = body as Record<string, unknown>;
  return ['name', 'phone', 'service', 'message'].every(key => typeof lead[key] === 'string' && (lead[key] as string).trim().length > 1);
}

export default async function handler(request: LeadRequest, response: LeadResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!valid(request.body) || request.body.website) {
    response.status(400).json({ error: 'Invalid lead payload' });
    return;
  }
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    response.status(503).json({ error: 'Lead delivery is not configured' });
    return;
  }
  const lead = request.body;
  const text = [
    'New Adstele lead',
    `Name: ${lead.name.trim()}`,
    `Phone / Telegram: ${lead.phone.trim()}`,
    `Service: ${lead.service.trim()}`,
    `Message: ${lead.message.trim()}`,
  ].join('\n');
  const telegram = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!telegram.ok) {
    response.status(502).json({ error: 'Telegram delivery failed' });
    return;
  }
  response.status(200).json({ ok: true });
}
