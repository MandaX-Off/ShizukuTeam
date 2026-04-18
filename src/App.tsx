import { useEffect, useState } from "react";

// ── Sakura Petal SVG ──────────────────────────────────────────────────────────
function SakuraPetal({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      style={style}
      className="absolute pointer-events-none select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="20" cy="20" rx="10" ry="18" fill="#a78bfa" opacity="0.18" transform="rotate(0 20 20)" />
      <ellipse cx="20" cy="20" rx="10" ry="18" fill="#818cf8" opacity="0.14" transform="rotate(72 20 20)" />
      <ellipse cx="20" cy="20" rx="10" ry="18" fill="#c4b5fd" opacity="0.14" transform="rotate(144 20 20)" />
      <ellipse cx="20" cy="20" rx="10" ry="18" fill="#7c3aed" opacity="0.13" transform="rotate(216 20 20)" />
      <ellipse cx="20" cy="20" rx="10" ry="18" fill="#a78bfa" opacity="0.14" transform="rotate(288 20 20)" />
      <circle cx="20" cy="20" r="4" fill="#ddd6fe" opacity="0.5" />
    </svg>
  );
}

// ── Falling Petals Canvas ─────────────────────────────────────────────────────
function FallingPetals() {
  const COUNT = 18;
  const [petals] = useState(() =>
    Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 28 + Math.random() * 28,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 10,
      rotate: Math.random() * 360,
    }))
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((p) => (
        <SakuraPetal
          key={p.id}
          style={{
            left: `${p.left}%`,
            top: "-60px",
            width: p.size,
            height: p.size,
            animation: `fall ${p.duration}s ${p.delay}s linear infinite`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ── Animated Number Counter ───────────────────────────────────────────────────
function Counter({ to, label }: { to: number; label: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(interval); }
      else setVal(start);
    }, 20);
    return () => clearInterval(interval);
  }, [to]);
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl font-bold text-violet-300">{val.toLocaleString()}+</span>
      <span className="text-xs text-blue-300 tracking-widest uppercase">{label}</span>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${color}`}
    >
      {text}
    </span>
  );
}

// ── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-blue-800/40 bg-blue-950/40 backdrop-blur-sm p-6 hover:border-violet-500/60 hover:bg-blue-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-900/30">
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-2 text-base font-semibold text-blue-100">{title}</h3>
      <p className="text-sm text-blue-400 leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Timeline Item ─────────────────────────────────────────────────────────────
function TimelineItem({
  date,
  title,
  desc,
  active,
}: {
  date: string;
  title: string;
  desc: string;
  active?: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full mt-1 border-2 ${
            active
              ? "border-violet-400 bg-violet-400 shadow-md shadow-violet-500/50"
              : "border-blue-600 bg-blue-950"
          }`}
        />
        <div className="w-px flex-1 bg-blue-800/40 mt-1" />
      </div>
      <div className="pb-8">
        <span className="text-xs text-violet-400 font-mono">{date}</span>
        <h4 className={`font-semibold mt-0.5 ${active ? "text-violet-300" : "text-blue-200"}`}>
          {title}
        </h4>
        <p className="text-sm text-blue-400 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <>
      {/* ── Global Keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Serif+JP:wght@400;700&display=swap');

        * { box-sizing: border-box; }

        body {
          font-family: 'Inter', sans-serif;
          background: #020817;
        }

        @keyframes fall {
          0%   { transform: translateY(-60px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px #7c3aed66, 0 0 40px #4f46e544; }
          50%       { box-shadow: 0 0 35px #7c3aedaa, 0 0 70px #4f46e577; }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #a78bfa, #818cf8, #e879f9, #a78bfa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .float-anim { animation: float 4s ease-in-out infinite; }
        .glow-btn   { animation: glow  3s ease-in-out infinite; }

        .glass {
          background: rgba(15, 23, 50, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(99, 102, 241, 0.18);
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .sakura-jp {
          font-family: 'Noto Serif JP', serif;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020817; }
        ::-webkit-scrollbar-thumb { background: #3730a3; border-radius: 3px; }
      `}</style>

      <FallingPetals />

      {/* ── Background orbs ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-900/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-blue-900/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full bg-indigo-900/20 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen grid-bg">

        {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
        <nav className="sticky top-0 z-50 glass border-b border-blue-900/50">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Sakura logo mark */}
              <svg viewBox="0 0 36 36" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="18" cy="18" rx="7" ry="14" fill="#7c3aed" opacity="0.7" transform="rotate(0 18 18)" />
                <ellipse cx="18" cy="18" rx="7" ry="14" fill="#818cf8" opacity="0.6" transform="rotate(72 18 18)" />
                <ellipse cx="18" cy="18" rx="7" ry="14" fill="#a78bfa" opacity="0.6" transform="rotate(144 18 18)" />
                <ellipse cx="18" cy="18" rx="7" ry="14" fill="#6d28d9" opacity="0.6" transform="rotate(216 18 18)" />
                <ellipse cx="18" cy="18" rx="7" ry="14" fill="#818cf8" opacity="0.6" transform="rotate(288 18 18)" />
                <circle cx="18" cy="18" r="4" fill="#ddd6fe" opacity="0.9" />
              </svg>
              <div>
                <span className="font-bold text-blue-100 text-sm tracking-wide">Shizuku</span>
                <span className="font-bold text-violet-400 text-sm tracking-wide"> Team</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-blue-300">
              <a href="#about"    className="hover:text-violet-300 transition-colors">Nosotros</a>
              <a href="#why"      className="hover:text-violet-300 transition-colors">¿Por qué?</a>
              <a href="#timeline" className="hover:text-violet-300 transition-colors">Historia</a>
              <a href="#download" className="hover:text-violet-300 transition-colors">Descargar</a>
            </div>
            <Badge
              text="v3.1 Disponible"
              color="border-violet-500/50 text-violet-300 bg-violet-900/20"
            />
          </div>
        </nav>

        {/* ══ HERO ════════════════════════════════════════════════════════════ */}
        <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto">

            {/* Japanese title */}
            <p className="sakura-jp text-blue-500/60 text-lg mb-4 tracking-[0.3em]">桜の花 · 雫チーム</p>

            {/* Main logo */}
            <div className="flex justify-center mb-6 float-anim">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-violet-600/20 blur-2xl scale-150" />
                <svg viewBox="0 0 100 100" className="w-28 h-28 relative" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="50" cy="50" rx="20" ry="40" fill="#7c3aed" opacity="0.75" transform="rotate(0 50 50)" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" fill="#818cf8" opacity="0.65" transform="rotate(72 50 50)" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" fill="#a78bfa" opacity="0.65" transform="rotate(144 50 50)" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" fill="#6d28d9" opacity="0.65" transform="rotate(216 50 50)" />
                  <ellipse cx="50" cy="50" rx="20" ry="40" fill="#818cf8" opacity="0.65" transform="rotate(288 50 50)" />
                  <circle cx="50" cy="50" r="12" fill="#ede9fe" opacity="0.95" />
                  <circle cx="50" cy="50" r="6"  fill="#7c3aed" opacity="0.8" />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
              <span className="shimmer-text">Shizuku</span>{" "}
              <span className="text-blue-200">Team</span>
            </h1>

            <p className="text-blue-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Un equipo independiente apasionado por la IA libre, sin restricciones
              y accesible para todos — inspirado en la flor del cerezo.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge text="🌸 Sakura-Driven" color="border-pink-700/50 text-pink-300 bg-pink-900/10" />
              <Badge text="⚡ 100% Gratis" color="border-green-700/50 text-green-300 bg-green-900/10" />
              <Badge text="🚀 Sin Filtros" color="border-violet-700/50 text-violet-300 bg-violet-900/10" />
              <Badge text="🛡️ Sin Suscripción" color="border-blue-700/50 text-blue-300 bg-blue-900/10" />
            </div>

            {/* Stats */}
            <div className="glass rounded-2xl px-8 py-6 inline-flex flex-wrap gap-10 justify-center">
              <Counter to={3100} label="Usuarios activos" />
              <div className="w-px bg-blue-800/50 hidden sm:block" />
              <Counter to={12} label="Versiones lanzadas" />
              <div className="w-px bg-blue-800/50 hidden sm:block" />
              <Counter to={100} label="% Gratuito" />
            </div>
          </div>
        </section>

        {/* ══ ABOUT ═══════════════════════════════════════════════════════════ */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-violet-400 text-sm uppercase tracking-widest mb-2">Quiénes somos</p>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-100">
                El equipo detrás de la flor
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-5 text-blue-300 leading-relaxed">
                <p>
                  <span className="text-violet-300 font-semibold">Shizuku Team</span> nació
                  de la frustración compartida de un grupo de desarrolladores e
                  entusiastas de la inteligencia artificial que, como tú, estaban
                  hartos de las constantes barreras que imponen las plataformas
                  populares de IA conversacional.
                </p>
                <p>
                  Nuestro nombre, <span className="text-violet-300 font-semibold">雫 (Shizuku)</span>,
                  significa <em>"gota"</em> en japonés — porque así como una gota
                  de lluvia hace florecer el cerezo, creemos que una idea simple
                  puede dar vida a algo hermoso y duradero.
                </p>
                <p>
                  Somos un equipo pequeño pero comprometido, trabajando en nuestro
                  tiempo libre para ofrecerte una IA conversacional sin límites
                  artificiales ni muros de pago.
                </p>
              </div>

              <div className="glass rounded-2xl p-8 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-blue-800/40">
                  <span className="text-2xl">🌸</span>
                  <div>
                    <div className="text-blue-100 font-semibold">Misión</div>
                    <div className="text-blue-400 text-sm">IA libre y accesible para todos</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-4 border-b border-blue-800/40">
                  <span className="text-2xl">🔭</span>
                  <div>
                    <div className="text-blue-100 font-semibold">Visión</div>
                    <div className="text-blue-400 text-sm">Un futuro sin censura artificial innecesaria</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💜</span>
                  <div>
                    <div className="text-blue-100 font-semibold">Valores</div>
                    <div className="text-blue-400 text-sm">Transparencia, comunidad y libertad digital</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WHY ═════════════════════════════════════════════════════════════ */}
        <section id="why" className="py-20 px-6 bg-blue-950/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-violet-400 text-sm uppercase tracking-widest mb-2">El problema</p>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-100">
                ¿Por qué creamos nuestra propia IA?
              </h2>
            </div>

            {/* Complaint cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-14">
              <div className="glass rounded-2xl p-6 border border-red-900/30 hover:border-red-700/50 transition-all group">
                <div className="text-3xl mb-3">🚫</div>
                <h3 className="text-red-300 font-semibold mb-2">Character AI</h3>
                <p className="text-blue-400 text-sm leading-relaxed">
                  Filtros agresivos, verificaciones de edad constantes y
                  restricciones que arruinan la experiencia de roleplay y
                  conversación libre. No podías hablar libremente sin chocar con
                  un muro de censura cada dos minutos.
                </p>
              </div>

              <div className="glass rounded-2xl p-6 border border-orange-900/30 hover:border-orange-700/50 transition-all group">
                <div className="text-3xl mb-3">💸</div>
                <h3 className="text-orange-300 font-semibold mb-2">Chai AI</h3>
                <p className="text-blue-400 text-sm leading-relaxed">
                  Mensajes limitados diariamente y luego… un paywall. El modelo
                  freemium de Chai te fuerza a pagar una suscripción mensual
                  obligatoria para seguir usando funciones básicas. Inaceptable.
                </p>
              </div>

              <div className="glass rounded-2xl p-6 border border-yellow-900/30 hover:border-yellow-700/50 transition-all group">
                <div className="text-3xl mb-3">⚠️</div>
                <h3 className="text-yellow-300 font-semibold mb-2">El resto</h3>
                <p className="text-blue-400 text-sm leading-relaxed">
                  La mayoría de alternativas repiten el mismo patrón: promesas
                  de gratuidad, luego restricciones, luego suscripciones. El
                  ecosistema de IA conversacional se ha convertido en un negocio
                  que olvida al usuario.
                </p>
              </div>
            </div>

            {/* Solution */}
            <div className="glass rounded-2xl p-8 border border-violet-700/30 text-center">
              <p className="text-violet-300 text-sm uppercase tracking-widest mb-3">Nuestra respuesta</p>
              <h3 className="text-2xl font-bold text-blue-100 mb-4">
                Decidimos construirlo nosotros mismos 🌸
              </h3>
              <p className="text-blue-300 leading-relaxed max-w-2xl mx-auto">
                Después de meses de frustración, el equipo Shizuku tomó la decisión:
                crear una inteligencia artificial conversacional completamente funcional,
                sin filtros innecesarios, sin verificaciones absurdas y, sobre todo,
                <span className="text-violet-300 font-semibold"> 100% gratuita para siempre</span>.
                Shizu AI nació de esa promesa.
              </p>
            </div>
          </div>
        </section>

        {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-violet-400 text-sm uppercase tracking-widest mb-2">Características</p>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-100">
                Todo lo que Shizu AI 3.1 ofrece
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <FeatureCard icon="🧠" title="IA Conversacional Avanzada"     desc="Motor de lenguaje potente capaz de mantener conversaciones largas, complejas y coherentes sin límite de tokens." />
              <FeatureCard icon="🎭" title="Roleplay Libre"                 desc="Sin filtros de contenido innecesarios. Crea personajes y escenarios con total libertad creativa." />
              <FeatureCard icon="🌐" title="Múltiples Idiomas"              desc="Soporte nativo para español, inglés, japonés, portugués y más. La IA detecta tu idioma automáticamente." />
              <FeatureCard icon="💾" title="Sin Nube, Sin Rastreo"          desc="Corre 100% en tu PC. Tus conversaciones son tuyas y solo tuyas. Sin servidores que guarden tu historial." />
              <FeatureCard icon="⚡" title="Respuestas Ultrarrápidas"       desc="Optimizado para hardware moderno. Respuestas fluidas sin depender de conexión a internet estable." />
              <FeatureCard icon="🆓" title="Gratis Para Siempre"            desc="Sin suscripciones, sin límites de mensajes, sin sorpresas. Shizu AI es y será siempre gratuito." />
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ════════════════════════════════════════════════════════ */}
        <section id="timeline" className="py-20 px-6 bg-blue-950/20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-violet-400 text-sm uppercase tracking-widest mb-2">Historia</p>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-100">
                El camino de Shizuku
              </h2>
            </div>

            <div className="glass rounded-2xl p-8">
              <TimelineItem
                date="Inicio del proyecto"
                title="Nace Shizuku Team"
                desc="Un pequeño grupo de desarrolladores frustrados con las plataformas de IA existentes decide unirse y crear su propia alternativa."
              />
              <TimelineItem
                date="Primera versión"
                title="Shizuku AI v1.0 — Lanzamiento alfa"
                desc="Se lanza la primera versión experimental. Funcional pero con limitaciones técnicas. La comunidad responde con entusiasmo."
              />
              <TimelineItem
                date="Crecimiento"
                title="Versiones 1.x — 2.x"
                desc="Múltiples actualizaciones mejoran la estabilidad, el vocabulario del modelo y la interfaz de usuario. La base de usuarios crece."
              />
              <TimelineItem
                date="Descontinuación"
                title="⚠️ Shizuku AI Web — DESCONTINUADO"
                desc="El sitio web de Shizuku AI cierra sus puertas definitivamente. Problemas de infraestructura y costos de servidor hicieron insostenible el servicio online. El equipo toma una nueva dirección."
              />
              <TimelineItem
                date="Ahora — 2025"
                title="🌸 Shizu AI 3.1 para PC — Nueva Era"
                desc="El equipo relanza el proyecto como aplicación de escritorio. Sin servidores, sin costos, sin compromisos. Shizu AI 3.1 es la versión más potente y estable hasta la fecha."
                active
              />
            </div>
          </div>
        </section>

        {/* ══ DISCONTINUATION NOTICE ══════════════════════════════════════════ */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-yellow-700/40 bg-yellow-950/20 p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-orange-500 to-yellow-600" />
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="text-5xl">📢</div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-300 mb-3">
                    Comunicado Oficial — Shizuku AI Web
                  </h3>
                  <p className="text-blue-300 leading-relaxed mb-4">
                    Queremos ser completamente transparentes con nuestra comunidad:
                    <span className="text-yellow-300 font-semibold"> el sitio web de Shizuku AI
                    ha sido oficialmente descontinuado</span> y no volverá a estar disponible
                    en línea. Los costos de infraestructura de servidores para sostener una
                    IA gratuita en la web resultaron insostenibles a largo plazo.
                  </p>
                  <p className="text-blue-300 leading-relaxed mb-4">
                    Sin embargo, <span className="text-violet-300 font-semibold">esto no es
                    el fin</span> — es el comienzo de algo mucho mejor. De ahora en adelante,
                    todo el soporte, desarrollo y actualizaciones se concentrarán exclusivamente
                    en la versión para PC: <span className="text-violet-300 font-semibold">Shizu AI 3.1</span>.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge text="✅ Shizu AI 3.1 PC — ACTIVO"          color="border-green-600/50 text-green-300 bg-green-900/20" />
                    <Badge text="❌ Shizuku AI Web — DESCONTINUADO"     color="border-red-600/50 text-red-300 bg-red-900/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ DOWNLOAD ════════════════════════════════════════════════════════ */}
        <section id="download" className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-violet-400 text-sm uppercase tracking-widest mb-3">Disponible ahora</p>
            <h2 className="text-4xl md:text-5xl font-black text-blue-100 mb-4">
              Shizu AI{" "}
              <span className="shimmer-text">3.1</span>
            </h2>
            <p className="text-blue-400 mb-10 text-lg leading-relaxed">
              La versión más poderosa y estable de nuestra IA — ahora en tu escritorio,
              sin internet, sin límites, sin pago.
            </p>

            {/* Version card */}
            <div className="glass rounded-3xl p-8 mb-10 border border-violet-700/30">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                <div className="text-left">
                  <div className="text-xs text-violet-400 uppercase tracking-widest mb-1">Versión actual</div>
                  <div className="text-3xl font-bold text-blue-100">Shizu AI 3.1</div>
                  <div className="text-blue-500 text-sm mt-1">PC · Windows · Gratis</div>
                </div>
                <div className="flex gap-3">
                  <Badge text="Estable" color="border-green-600/50 text-green-300 bg-green-900/20" />
                  <Badge text="PC" color="border-blue-600/50 text-blue-300 bg-blue-900/20" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                {[
                  { icon: "🪟", label: "Windows", sub: "10 / 11" },
                  { icon: "💾", label: "Ligero",  sub: "Fácil instalación" },
                  { icon: "🔒", label: "Seguro",  sub: "Sin telemetría" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-blue-950/50 border border-blue-800/40 p-4">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-blue-200 text-sm font-medium">{item.label}</div>
                    <div className="text-blue-500 text-xs">{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* Download button */}
              <a
                href="https://www.mediafire.com/file/0l0ttnw2h30za6a/ShizuAI_v3.1_PC_version.zip/file"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDownloaded(true)}
                className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white glow-btn transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #6d28d9 0%, #4f46e5 50%, #7c3aed 100%)",
                }}
              >
                {/* Shine sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-2xl border-2 border-violet-400/50 animate-ping opacity-30" style={{ animationDuration: "2s" }} />

                <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="relative z-10">
                  Descarga Shizu AI 3.1 para PC ahora!
                </span>
              </a>

              {downloaded && (
                <p className="mt-4 text-green-400 text-sm animate-pulse">
                  🌸 ¡Gracias por descargar! Recuerda unirte a nuestra comunidad.
                </p>
              )}

              <p className="mt-4 text-blue-600 text-xs">
                Al descargar, aceptas que este software es completamente gratuito y sin garantías.
                Alojado en MediaFire · Descarga directa
              </p>
            </div>

            {/* Instructions */}
            <div className="glass rounded-2xl p-6 text-left border border-blue-800/30">
              <h4 className="text-blue-200 font-semibold mb-4 flex items-center gap-2">
                <span>📋</span> Instrucciones de instalación
              </h4>
              <ol className="space-y-3">
                {[
                  "Haz clic en el botón de descarga de arriba.",
                  'En MediaFire, haz clic en "Descargar" para obtener el archivo .zip.',
                  "Extrae el contenido del ZIP en una carpeta de tu elección.",
                  "Ejecuta el archivo instalador o el ejecutable principal.",
                  "¡Listo! Shizu AI 3.1 está listo para usar. Sin internet requerido.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-blue-400 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-900/60 border border-violet-700/50 text-violet-300 text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
        <footer className="border-t border-blue-900/50 py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 36 36" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="18" cy="18" rx="7" ry="14" fill="#7c3aed" opacity="0.7" transform="rotate(0 18 18)" />
                  <ellipse cx="18" cy="18" rx="7" ry="14" fill="#818cf8" opacity="0.6" transform="rotate(72 18 18)" />
                  <ellipse cx="18" cy="18" rx="7" ry="14" fill="#a78bfa" opacity="0.6" transform="rotate(144 18 18)" />
                  <ellipse cx="18" cy="18" rx="7" ry="14" fill="#6d28d9" opacity="0.6" transform="rotate(216 18 18)" />
                  <ellipse cx="18" cy="18" rx="7" ry="14" fill="#818cf8" opacity="0.6" transform="rotate(288 18 18)" />
                  <circle cx="18" cy="18" r="4" fill="#ddd6fe" opacity="0.9" />
                </svg>
                <div>
                  <span className="font-bold text-blue-200 text-sm">Shizuku Team</span>
                  <p className="text-blue-600 text-xs sakura-jp">桜のように、自由に咲く</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-blue-600 text-xs leading-relaxed max-w-sm">
                  Shizuku Team es un proyecto independiente sin ánimo de lucro.<br />
                  No estamos afiliados con Character AI, Chai ni ninguna IA comercial.<br />
                  Shizuku AI Web — <span className="text-red-500">Descontinuado</span> · Shizu AI 3.1 PC — <span className="text-green-500">Activo</span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-violet-500 text-sm font-semibold">Shizu AI 3.1</p>
                <p className="text-blue-600 text-xs">© 2025 Shizuku Team</p>
                <p className="text-blue-700 text-xs">Todos los derechos reservados</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-900/30 text-center">
              <p className="text-blue-700 text-xs sakura-jp">
                🌸 &nbsp; 花びらのように、あなたの声は自由であるべきだ &nbsp; 🌸
              </p>
              <p className="text-blue-800 text-xs mt-1">
                "Como los pétalos de cerezo, tu voz debería ser libre."
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
