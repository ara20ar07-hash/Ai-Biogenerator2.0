// js/advice-ui.js
// Renders the structured JSON report into rich HTML cards

// ─── Score ring SVG ──────────────────────────────────────────────────────────
function scoreRing(score, label, color = '#7c3aed') {
  const r = 28, c = 36, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return `
  <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="currentColor" stroke-width="5" style="color:rgba(124,92,252,0.12)"/>
      <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${color}" stroke-width="5"
        stroke-dasharray="${dash} ${circ}" stroke-dashoffset="${circ / 4}"
        stroke-linecap="round" transform="rotate(-90 ${c} ${c})"/>
      <text x="${c}" y="${c + 5}" text-anchor="middle" style="font-size:15px;font-weight:700;fill:${color}">${score}</text>
    </svg>
    <span style="font-size:11px;color:var(--color-text-secondary);text-align:center">${label}</span>
  </div>`;
}

// ─── Effort badge ────────────────────────────────────────────────────────────
function effortBadge(effort) {
  const map = {
    low:    { bg: '#d1fae5', color: '#065f46', label: '⚡ Low effort' },
    medium: { bg: '#fef3c7', color: '#92400e', label: '🔧 Medium effort' },
    high:   { bg: '#fee2e2', color: '#991b1b', label: '💪 High effort' },
  };
  const s = map[effort] || map.medium;
  return `<span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:${s.bg};color:${s.color}">${s.label}</span>`;
}

// ─── Status pill for benchmarking ───────────────────────────────────────────
function statusPill(status) {
  const map = {
    behind: { bg: '#fee2e2', color: '#991b1b', icon: '▼' },
    on_par: { bg: '#fef3c7', color: '#92400e', icon: '●' },
    ahead:  { bg: '#d1fae5', color: '#065f46', icon: '▲' },
  };
  const s = map[status] || map.on_par;
  return `<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;background:${s.bg};color:${s.color}">${s.icon} ${status.replace('_', ' ')}</span>`;
}

// ─── Verdict banner ──────────────────────────────────────────────────────────
function verdictBanner(verdict, opportunity, confidence) {
  const map = {
    needs_work: { emoji: '🚧', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', color: '#b91c1c' },
    on_track:   { emoji: '📈', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', color: '#92400e' },
    strong:     { emoji: '🚀', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', color: '#065f46' },
  };
  const s = map[verdict] || map.on_track;
  return `
  <div class="result-card" style="border-color:${s.border};background:${s.bg}">
    <div style="display:flex;align-items:flex-start;gap:12px">
      <span style="font-size:2rem;line-height:1">${s.emoji}</span>
      <div style="flex:1">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
          <span style="font-size:13px;font-weight:700;color:${s.color}">AI Growth Verdict</span>
          <span style="font-size:11px;font-weight:600;padding:2px 10px;border-radius:100px;background:${s.border};color:${s.color}">${confidence}% confidence</span>
        </div>
        <p style="font-size:15px;font-weight:600;color:var(--color-text-primary);line-height:1.5">${opportunity}</p>
      </div>
    </div>
  </div>`;
}

// ─── Score dashboard ─────────────────────────────────────────────────────────
function scoreDashboard(scores) {
  const colors = {
    bio: '#7c3aed', consistency: '#ec4899', hooks: '#f59e0b',
    engagement: '#10b981', posting: '#3b82f6',
  };
  const rings = Object.entries(scores)
    .filter(([k]) => k !== 'overall')
    .map(([k, v]) => scoreRing(v, k.charAt(0).toUpperCase() + k.slice(1), colors[k]))
    .join('');

  return `
  <div class="result-card">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      ${scoreRing(scores.overall, 'Overall', '#7c3aed')}
      <div>
        <p style="font-size:13px;font-weight:700;color:var(--color-text-primary)">Profile score breakdown</p>
        <p style="font-size:12px;color:var(--color-text-secondary)">Based on your submitted content</p>
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:space-around">${rings}</div>
  </div>`;
}

// ─── Recommendations ─────────────────────────────────────────────────────────
function recommendationCards(recs) {
  const priorityColors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6'];
  return recs.map((r, i) => `
  <div class="result-card" style="border-left:3px solid ${priorityColors[i] || '#7c3aed'}">
    <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;flex-wrap:wrap">
      <span style="font-size:11px;font-weight:800;padding:2px 10px;border-radius:100px;background:${priorityColors[i]}22;color:${priorityColors[i]}">#${r.priority} Priority</span>
      ${effortBadge(r.effort)}
      <span style="font-size:11px;color:var(--color-text-secondary);margin-left:auto">⏱ ${r.timeframe}</span>
    </div>
    <p style="font-size:14px;font-weight:700;color:var(--color-text-primary);margin-bottom:6px">${r.title}</p>
    <p style="font-size:13px;color:var(--color-text-secondary);margin-bottom:12px;line-height:1.6">${r.why}</p>
    <div style="background:var(--color-background-secondary);border-radius:8px;padding:12px;margin-bottom:10px">
      <p style="font-size:11px;font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">How to implement</p>
      <ol style="margin:0;padding-left:16px;display:flex;flex-direction:column;gap:6px">
        ${r.howToImplement.map(step => `<li style="font-size:13px;color:var(--color-text-primary);line-height:1.5">${step}</li>`).join('')}
      </ol>
    </div>
    <p style="font-size:12px;color:#10b981;font-weight:600">📈 Expected: ${r.expectedImpact}</p>
  </div>`).join('');
}

// ─── Content examples ────────────────────────────────────────────────────────
function contentExampleCards(examples) {
  return examples.map(ex => `
  <div class="result-card">
    <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-secondary);margin-bottom:12px">${ex.label || ex.type.replace(/_/g,' ')}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
      <div style="background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:10px">
        <p style="font-size:10px;font-weight:700;color:#b91c1c;margin-bottom:6px;text-transform:uppercase">Before</p>
        <p style="font-size:12px;color:var(--color-text-primary);line-height:1.5">${ex.before}</p>
      </div>
      <div style="background:rgba(16,185,129,0.07);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:10px">
        <p style="font-size:10px;font-weight:700;color:#065f46;margin-bottom:6px;text-transform:uppercase">After ✨</p>
        <p style="font-size:12px;color:var(--color-text-primary);line-height:1.5">${ex.after}</p>
      </div>
    </div>
    <p style="font-size:12px;color:var(--color-text-secondary);line-height:1.5">💡 <strong>Why it works:</strong> ${ex.whyItWorks}</p>
  </div>`).join('');
}

// ─── Tactical playbook ───────────────────────────────────────────────────────
function playbookCard(p) {
  const hashtagHtml = [
    { tier: 'Tier 1 (niche, high-intent)', tags: p.hashtagStrategy?.tier1 || [] },
    { tier: 'Tier 2 (mid-size, discovery)', tags: p.hashtagStrategy?.tier2 || [] },
    { tier: 'Tier 3 (broad, reach)', tags: p.hashtagStrategy?.tier3 || [] },
  ].map(t => `
    <div style="margin-bottom:8px">
      <p style="font-size:11px;font-weight:700;color:var(--color-text-secondary);margin-bottom:4px">${t.tier}</p>
      <div style="display:flex;flex-wrap:wrap;gap:4px">${t.tags.map(h => `<span style="font-size:11px;background:rgba(124,92,252,0.1);color:#7c3aed;padding:2px 8px;border-radius:100px">${h}</span>`).join('')}</div>
    </div>`).join('');

  const ctaHtml = (p.ctaTemplates || []).map(c =>
    `<div style="background:var(--color-background-secondary);border-radius:6px;padding:8px 10px;font-size:12px;color:var(--color-text-primary)">"${c}"</div>`
  ).join('');

  return `
  <div class="result-card">
    <p style="font-size:13px;font-weight:700;color:var(--color-text-primary);margin-bottom:12px">🗓 Tactical playbook</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      <div>
        <p style="font-size:11px;font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px">Posting cadence</p>
        <p style="font-size:13px;color:var(--color-text-primary)">${p.postingCadence}</p>
      </div>
      <div>
        <p style="font-size:11px;font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px">Best times</p>
        ${(p.bestPostingTimes || []).map(t => `<p style="font-size:12px;color:var(--color-text-primary)">• ${t}</p>`).join('')}
      </div>
    </div>
    <div style="margin-bottom:14px">
      <p style="font-size:11px;font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">Hashtag strategy</p>
      ${hashtagHtml}
      <p style="font-size:11px;color:var(--color-text-secondary);margin-top:6px">${p.hashtagStrategy?.explanation || ''}</p>
    </div>
    <div style="margin-bottom:14px">
      <p style="font-size:11px;font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px">CTA templates</p>
      <div style="display:flex;flex-direction:column;gap:6px">${ctaHtml}</div>
    </div>
    <div>
      <p style="font-size:11px;font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px">Content mix & cross-post plan</p>
      <p style="font-size:12px;color:var(--color-text-primary);line-height:1.6">${p.contentMix}</p>
      <p style="font-size:12px;color:var(--color-text-primary);line-height:1.6;margin-top:6px">${p.crossPostPlan}</p>
    </div>
  </div>`;
}

// ─── Benchmarking table ──────────────────────────────────────────────────────
function benchmarkCard(bench) {
  const rows = (bench.metrics || []).map(m => `
  <tr style="border-bottom:1px solid var(--color-border-tertiary)">
    <td style="padding:10px 8px;font-size:12px;font-weight:600;color:var(--color-text-primary)">${m.metric}</td>
    <td style="padding:10px 8px;font-size:12px;color:var(--color-text-primary);text-align:center">${m.theirEstimate}</td>
    <td style="padding:10px 8px;font-size:12px;color:var(--color-text-secondary);text-align:center">${m.benchmarkRange}</td>
    <td style="padding:10px 8px;font-size:12px;text-align:center">${statusPill(m.status)}</td>
  </tr>`).join('');

  return `
  <div class="result-card">
    <p style="font-size:13px;font-weight:700;color:var(--color-text-primary);margin-bottom:6px">📊 Benchmarking dashboard</p>
    <p style="font-size:12px;color:var(--color-text-secondary);margin-bottom:12px">${bench.summary}</p>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid var(--color-border-primary)">
            <th style="padding:8px;font-size:11px;font-weight:700;text-align:left;color:var(--color-text-secondary);text-transform:uppercase">Metric</th>
            <th style="padding:8px;font-size:11px;font-weight:700;text-align:center;color:var(--color-text-secondary);text-transform:uppercase">You</th>
            <th style="padding:8px;font-size:11px;font-weight:700;text-align:center;color:var(--color-text-secondary);text-transform:uppercase">Benchmark</th>
            <th style="padding:8px;font-size:11px;font-weight:700;text-align:center;color:var(--color-text-secondary);text-transform:uppercase">Status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

// ─── A/B test cards ──────────────────────────────────────────────────────────
function abTestCards(tests) {
  return `
  <div class="result-card">
    <p style="font-size:13px;font-weight:700;color:var(--color-text-primary);margin-bottom:12px">🧪 A/B test ideas</p>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${tests.map((t, i) => `
      <div style="background:var(--color-background-secondary);border-radius:8px;padding:12px">
        <p style="font-size:11px;font-weight:700;color:#7c3aed;margin-bottom:6px;text-transform:uppercase">Test ${i + 1}: ${t.hypothesis}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:6px">
          <div>
            <p style="font-size:10px;font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;margin-bottom:3px">Control</p>
            <p style="font-size:12px;color:var(--color-text-primary)">${t.control}</p>
          </div>
          <div>
            <p style="font-size:10px;font-weight:700;color:#7c3aed;text-transform:uppercase;margin-bottom:3px">Variant</p>
            <p style="font-size:12px;color:var(--color-text-primary)">${t.variant}</p>
          </div>
        </div>
        <p style="font-size:11px;color:var(--color-text-secondary)">📏 Measure: ${t.metric} · ⏱ ${t.duration}</p>
      </div>`).join('')}
    </div>
  </div>`;
}

// ─── Main render function ────────────────────────────────────────────────────
export const renderAdviceReport = (report, container) => {
  // Clear previous results
  Array.from(container.querySelectorAll('.result-card')).forEach(el => el.remove());
  document.getElementById('emptyState')?.classList.add('hidden');

  const sections = [
    verdictBanner(report.executiveSummary.verdict, report.executiveSummary.mainOpportunity, report.executiveSummary.confidenceScore),
    scoreDashboard(report.profileScore),
    '<p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-secondary);padding:4px 0 8px;border-top:1px solid var(--color-border-tertiary);margin-top:4px">Top 5 recommendations</p>',
    recommendationCards(report.recommendations),
    '<p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-text-secondary);padding:4px 0 8px;border-top:1px solid var(--color-border-tertiary);margin-top:4px">Content rewrites</p>',
    contentExampleCards(report.contentExamples),
    playbookCard(report.tacticalPlaybook),
    benchmarkCard(report.benchmarking),
    abTestCards(report.abTests),
  ];

  const wrapper = document.createElement('div');
  wrapper.innerHTML = sections.join('');
  container.appendChild(wrapper);
};
