/**
 * SHNU-LLM decoder-only Transformer, drawn as inline SVG so it inherits the
 * site's theme tokens (CSS variables from index.css) and needs no image asset.
 */

const BOX_X = 140;
const BOX_W = 240;
const BOX_H = 34;
const CX = BOX_X + BOX_W / 2;

type BoxProps = { y: number; label: string; sub?: string; tone?: "plain" | "accent" | "muted" };

function Box({ y, label, sub, tone = "plain" }: BoxProps) {
  const fill = tone === "accent" ? "var(--color-clay-tint)" : tone === "muted" ? "var(--color-cream-dim)" : "var(--color-card)";
  const stroke = tone === "accent" ? "var(--color-clay)" : "var(--color-border)";
  return (
    <g>
      <rect x={BOX_X} y={y} width={BOX_W} height={BOX_H} rx={8} fill={fill} stroke={stroke} />
      <text x={CX} y={y + (sub ? 15 : 21)} textAnchor="middle" fontSize={12.5} fontWeight={600} fill="var(--color-ink)">
        {label}
      </text>
      {sub && (
        <text x={CX} y={y + 28} textAnchor="middle" fontSize={10} fill="var(--color-ink-faint)">
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ from, to }: { from: number; to: number }) {
  return <line x1={CX} y1={from} x2={CX} y2={to - 2} stroke="var(--color-ink-faint)" strokeWidth={1.25} markerEnd="url(#arch-arrow)" />;
}

function Add({ y }: { y: number }) {
  return (
    <g>
      <circle cx={CX} cy={y} r={11} fill="var(--color-card)" stroke="var(--color-sage)" strokeWidth={1.5} />
      <text x={CX} y={y + 4.5} textAnchor="middle" fontSize={14} fontWeight={600} fill="var(--color-sage)">+</text>
    </g>
  );
}

export default function ArchitectureDiagram() {
  // Vertical layout (y positions of each element's top edge)
  const tokens = 8;
  const embed = 66;
  const blockTop = 120;
  const norm1 = 146;
  const attn = 194;
  const add1 = 256;
  const norm2 = 290;
  const ffn = 338;
  const add2 = 400;
  const blockBottom = 426;
  const finalNorm = 452;
  const head = 510;
  const logits = 568;

  return (
    <figure className="w-full">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 520 612"
          role="img"
          aria-labelledby="arch-title arch-desc"
          className="w-full max-w-[520px] mx-auto min-w-[320px] font-sans"
        >
          <title id="arch-title">SHNU-LLM architecture</title>
          <desc id="arch-desc">
            Token IDs pass through an embedding layer, then eight decoder blocks. Each block applies RMSNorm, causal
            self-attention with RoPE, and a residual add, then RMSNorm, a SwiGLU feed-forward network, and another
            residual add. A final RMSNorm feeds the language-model head, whose weights are tied to the embedding,
            producing logits over the 16K vocabulary.
          </desc>
          <defs>
            <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--color-ink-faint)" />
            </marker>
          </defs>

          <Box y={tokens} label="Token IDs" sub="up to 512 tokens" tone="muted" />
          <Arrow from={tokens + BOX_H} to={embed} />
          <Box y={embed} label="Token embedding" sub="16K × 512" />
          <Arrow from={embed + BOX_H} to={norm1} />

          {/* Repeated decoder block */}
          <rect
            x={BOX_X - 52}
            y={blockTop}
            width={BOX_W + 104}
            height={blockBottom - blockTop}
            rx={14}
            fill="none"
            stroke="var(--color-clay)"
            strokeDasharray="5 4"
          />
          <text x={BOX_X + BOX_W + 44} y={blockTop + 20} textAnchor="end" fontSize={13} fontWeight={700} fill="var(--color-clay)">
            × 8
          </text>
          <text x={BOX_X - 42} y={blockBottom - 10} fontSize={10} fontWeight={600} fill="var(--color-clay)" letterSpacing="0.06em">
            DECODER BLOCK
          </text>

          {/* residual skip connections */}
          <path d={`M ${CX} ${norm1 - 10} H ${BOX_X - 24} V ${add1} H ${CX - 11}`} fill="none" stroke="var(--color-sage)" strokeWidth={1.25} />
          <path d={`M ${CX} ${add1 + 11 + 8} H ${BOX_X - 24} V ${add2} H ${CX - 11}`} fill="none" stroke="var(--color-sage)" strokeWidth={1.25} />
          <text x={BOX_X - 30} y={(norm1 + add1) / 2} fontSize={9.5} fill="var(--color-sage)" textAnchor="end" transform={`rotate(-90 ${BOX_X - 30} ${(norm1 + add1) / 2})`}>
            residual
          </text>

          <Box y={norm1} label="RMSNorm" />
          <Arrow from={norm1 + BOX_H} to={attn} />
          <Box y={attn} label="Causal self-attention" sub="8 heads · RoPE" tone="accent" />
          <Arrow from={attn + BOX_H} to={add1 - 11} />
          <Add y={add1} />
          <Arrow from={add1 + 11} to={norm2} />
          <Box y={norm2} label="RMSNorm" />
          <Arrow from={norm2 + BOX_H} to={ffn} />
          <Box y={ffn} label="SwiGLU feed-forward" tone="accent" />
          <Arrow from={ffn + BOX_H} to={add2 - 11} />
          <Add y={add2} />
          <Arrow from={add2 + 11} to={finalNorm} />

          <Box y={finalNorm} label="Final RMSNorm" />
          <Arrow from={finalNorm + BOX_H} to={head} />
          <Box y={head} label="LM head" sub="512 → 16K" />
          <Arrow from={head + BOX_H} to={logits} />
          <Box y={logits} label="Logits" sub="next-token distribution" tone="muted" />

          {/* tied input/output embeddings */}
          <path
            d={`M ${BOX_X + BOX_W} ${head + BOX_H / 2} H ${BOX_X + BOX_W + 90} V ${embed + BOX_H / 2} H ${BOX_X + BOX_W + 2}`}
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth={1.25}
            strokeDasharray="4 3"
            markerEnd="url(#arch-arrow)"
          />
          <text
            x={BOX_X + BOX_W + 102}
            y={(head + embed) / 2 + BOX_H / 2}
            fontSize={10}
            fill="var(--color-gold)"
            textAnchor="middle"
            transform={`rotate(90 ${BOX_X + BOX_W + 102} ${(head + embed) / 2 + BOX_H / 2})`}
          >
            tied weights
          </text>
        </svg>
      </div>
    </figure>
  );
}
