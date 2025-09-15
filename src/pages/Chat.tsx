import { useEffect, useRef, useState } from "react";
import Banner from "./Banner";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navegador from "./Navegador";

type Msg = { id: string; role: "user" | "assistant" | "system"; text: string };

const API_URL = "https://2get.icoma.com.br/api/chat";

type Atividade =
  | string
  | { nome?: string; descricao?: string; justificativa?: string;[key: string]: any };

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [threadId, setThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const payload: any = { message: text };
      if (threadId?.startsWith("thread_")) payload.threadId = threadId;

      const r = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await r.json().catch(() => ({} as any));
      if (!r.ok) throw new Error(data?.error || "Falha na API");

      if (data?.threadId?.startsWith("thread_")) setThreadId(data.threadId);

      const assistantText = (data?.text ?? "").toString();
      const assistantMsg: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: assistantText || "[sem texto]",
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e: any) {
      const errMsg: Msg = { id: crypto.randomUUID(), role: "system", text: `Erro: ${e.message || e}` };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const parseThread = (text: string) => {
    try {
      const obj = JSON.parse(text);
      if (obj && typeof obj === "object" && ("analise" in obj || "rotina_de_atividades" in obj || "message" in obj || "mensagem" in obj || "resposta" in obj)) {
        return obj;
      }
    } catch {
    }
    return null;
  };

  function ThreadDisplay({ data }: { data: any }) {
    const hasRotina = Array.isArray(data.rotina_de_atividades) && data.rotina_de_atividades.length > 0;
    return (
      <div className="space-y-3 p-1">
        {data.analise && (
          <div>
            <strong>2Get:</strong>
            <p className="whitespace-pre-wrap">{data.analise}</p>
          </div>
        )}
        {data.message && (
          <div>
            <strong>2Get:</strong>
            <p className="whitespace-pre-wrap">{data.message}</p>
          </div>
        )}
        {data.mensagem && (
          <div>
            <strong>2Get:</strong>
            <p className="whitespace-pre-wrap">{data.mensagem}</p>
          </div>
        )}
        {data.resposta && (
          <div>
            <strong>2Get:</strong>
            <p className="whitespace-pre-wrap">{data.resposta}</p>
          </div>
        )}
        {hasRotina && (
          <div>
            <strong>Rotina de atividades:</strong>
            <ul className="list-disc pl-5 space-y-1">
              {data.rotina_de_atividades.map((item: Atividade, i: number) => {
                if (typeof item === "string") {
                  return <li key={i}>{item}</li>;
                }
                if (item && typeof item === "object") {
                  return (
                    <li key={i}>
                      {item.nome && <div><strong>{item.nome}</strong></div>}
                      {item.descricao && <div className="whitespace-pre-wrap">{item.descricao}</div>}
                      {item.justificativa && (
                        <div className="text-xs opacity-80 whitespace-pre-wrap">Justificativa: {item.justificativa}</div>
                      )}
                    </li>
                  );
                }
                return <li key={i}>[Atividade inválida]</li>;
              })}
            </ul>
          </div>
        )}
        {hasRotina && data.orientacoes_personalizadas && (
          <div>
            <strong>Orientações:</strong>
            <p className="whitespace-pre-wrap">{data.orientacoes_personalizadas}</p>
          </div>
        )}
        {hasRotina && data.proposito_teorico && (
          <div>
            <strong>Propósito teórico:</strong>
            <p className="whitespace-pre-wrap">{data.proposito_teorico}</p>
          </div>
        )}
        {hasRotina && Array.isArray(data.referencias) && data.referencias.length > 0 && (
          <div>
            <strong>Referências:</strong>
            <ul className="list-disc pl-5">
              {data.referencias.map((ref: string, i: number) => (
                <li key={i}>{ref}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <Container fluid className="p-4">
      <Row>
        <Col>
          <Navegador />
        </Col>
      </Row>
      <Row>
        <Col>
          <Banner />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 style={{ textAlign: 'center', marginBottom: 12, color: '#e0e0e0' }}>2Get Companion</h1>
          <div ref={listRef} style={{
            flex: '1 1 auto', overflowY: 'auto',
            padding: 8, border: '1px solid #2a3357',
            borderRadius: 10, marginBottom: 12,
            width: 1090, maxWidth: '100%',
            minWidth: 420,
            minHeight: '60vh'
          }}>
            {messages.map((m) => {
              const threadDataAssistant = m.role === 'assistant' ? parseThread(m.text) : null;
              return (
                <Alert
                  variant="primary"
                  key={m.id}
                  style={{
                    backgroundColor: m.role === 'user' ? '#1e293b' :
                      m.role === 'assistant' ? '#0c55f5ff' : '#3b0820', textAlign: m.role === 'user' ? 'right' : 'left',
                    color: '#e0e0e0', border: 'none',
                    maxWidth: '70%', marginLeft: m.role === 'user' ? 'auto' : 0,
                    marginRight: m.role === 'user' ? 0 : 'auto', marginBottom: 8
                  }}
                >
                  <div>
                    {threadDataAssistant ? <ThreadDisplay data={threadDataAssistant} /> : m.text}
                  </div>
                </Alert>
              );
            })}
            {loading && <Alert variant="light">Gerando sua resposta…</Alert>}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Digite sua mensagem…"
              style={{ flex: 1 }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
            >
              Enviar
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}