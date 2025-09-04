import { useEffect, useRef, useState } from "react";
import Banner from "./Banner";
import Badge from 'react-bootstrap/Badge';

type Msg = { id: string; role: "user" | "assistant" | "system"; text: string };

const API_URL = "https://2get.icoma.com.br/api/chat";

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

  return (
    <div className="card" style={{ width: 'min(920px, 108vw)' }}>
      <Banner />
      <h2 className="text-xl font-semibold mb-3 text-slate-200">Chat do Assistant</h2>
      <div
        ref={listRef}
        style={{ height: 360, overflow: 'auto', padding: 8, border: '1px solid #2a3357', borderRadius: 10, marginBottom: 12 }}
      >
        {messages.map((m) => (
          <Badge bg="secondary"
            key={m.id}
            className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] whitespace-pre-wrap px-3 py-2 rounded-2xl text-sm leading-relaxed
                ${m.role === "user" ? "bg-blue-600 text-white" :
                  m.role === "assistant" ? "bg-slate-700 text-slate-100" :
                    "bg-amber-100 text-amber-900"}`}
            >
              {m.text}
              {m.role === "assistant" && m.text}
            </div>
          </Badge>
        ))}
        {loading && <div className="text-xs text-slate-400">Gerando sua resposta...</div>}
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
    </div>
  );
}
