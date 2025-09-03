import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

type Msg = { from: 'user' | 'ai', text: string };

export default function Chat() {
  const [ready, setReady] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setReady(!!u));
    return () => unsub();
  }, []);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMsgs(m => [...m, { from: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, threadId }),
      });
      const data = await r.json();

      if (!r.ok) throw new Error(data?.error || 'Erro');
      if (data.threadId) setThreadId(data.threadId);
      if (data.threadId && !threadId) setThreadId(data.threadId);
      if (data.text) setMsgs(m => [...m, { from: 'ai', text: data.text }]);
    } catch (err: any) {
      setMsgs(m => [...m, { from: 'ai', text: `Falhou: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  if (!ready) return <div className="center">Carregando...</div>;

  return (
    <div className="card" style={{ width: 'min(820px, 95vw)' }}>
      <h1>Chat do Assistant</h1>

      <div style={{ height: 360, overflow: 'auto', padding: 8, border: '1px solid #2a3357', borderRadius: 10, marginBottom: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ margin: '8px 0', textAlign: m.from === 'user' ? 'right' : 'left' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: 12,
              background: m.from === 'user' ? '#1a2250' : '#0f1430',
              border: '1px solid #2a3357'
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="center">Gerando resposta…</div>}
      </div>

      <form onSubmit={send} className="form" style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite sua mensagem…"
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={loading}>Enviar</button>
      </form>
    </div>
  );
}
