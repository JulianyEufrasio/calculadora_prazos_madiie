// ============================================================
//  Calculadora de Prazo de Estágio — Madiie Soluções Acadêmicas
//  calculadora.js
// ============================================================

// ------------------------------------------------------------
//  FERIADOS NACIONAIS
// ------------------------------------------------------------

function calcularPascoa(ano) {
  const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100;
  const d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(ano, mes - 1, dia));
}

function getFeriadosAno(ano) {
  const s = new Set();
  [[1,1],[4,21],[5,1],[9,7],[10,12],[11,2],[11,15],[11,20],[12,25]]
    .forEach(([m, d]) => s.add(`${ano}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`));
  const p = calcularPascoa(ano);
  const add = (base, n) => { const d = new Date(base); d.setUTCDate(d.getUTCDate() + n); return d; };
  const chave = d => d.toISOString().slice(0, 10);
  s.add(chave(add(p, -48))); s.add(chave(add(p, -47)));
  s.add(chave(add(p,  -2))); s.add(chave(p));
  s.add(chave(add(p,  60)));
  return s;
}

const _cache = {};
function feriadosDoAno(ano) {
  if (!_cache[ano]) _cache[ano] = getFeriadosAno(ano);
  return _cache[ano];
}

function ehDiaUtil(data) {
  const dow = data.getUTCDay();
  return dow !== 0 && dow !== 6 && !feriadosDoAno(data.getUTCFullYear()).has(data.toISOString().slice(0,10));
}

// ------------------------------------------------------------
//  DATAS
// ------------------------------------------------------------

function diasUteisEntre(dataInicio, dataFim) {
  let count = 0;
  const cur = new Date(dataInicio);
  while (cur <= dataFim) {
    if (ehDiaUtil(cur)) count++;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return count;
}

function addDias(data, n) {
  const r = new Date(data);
  r.setUTCDate(r.getUTCDate() + n);
  return r;
}

function fmt(data) {
  return data.toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' });
}

function parseData(str) {
  if (!str) return null;
  const [ano, mes, dia] = str.split('-').map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia));
}

// ------------------------------------------------------------
//  CÁLCULO
// ------------------------------------------------------------

function calcular() {
  const dataVenda      = parseData(document.getElementById('venda').value);
  const dataFim        = parseData(document.getElementById('fim').value);
  const horas          = parseInt(document.getElementById('horas').value, 10);
  const horasPorDia    = parseFloat(document.getElementById('horasdia').value);

  const res = document.getElementById('res');
  res.style.display = 'block';
  res.className = 'result';

  if (!dataVenda || !dataFim || !horas || horas <= 0 || !horasPorDia || horasPorDia <= 0) {
    res.classList.add('nok');
    document.getElementById('badge').className = 'badge nok';
    document.getElementById('badge').textContent = '⚠ Atenção';
    document.getElementById('rtitle').textContent = 'Preencha todos os campos corretamente.';
    document.getElementById('rsub').textContent = '';
    document.getElementById('stats').innerHTML = '';
    document.getElementById('tl').innerHTML = '';
    return;
  }

  const diasNecessarios = Math.ceil(horas / horasPorDia);

  // Início seguro = 25 dias após fechamento; mínimo = 20 dias
  const inicioSeguro = addDias(dataVenda, 25);
  const inicioMinimo = addDias(dataVenda, 20);

  // Abertura TCE = 10 dias antes do início
  const tceSeguro = addDias(inicioSeguro, -10);
  const tceMinimo = addDias(inicioMinimo, -10);

  // Fechamento = 5 dias antes da abertura do TCE
  const fechSeguro = addDias(tceSeguro, -5);
  const fechMinimo = addDias(tceMinimo, -5);

  const diasSeguro = diasUteisEntre(inicioSeguro, dataFim);
  const diasMinimo = diasUteisEntre(inicioMinimo, dataFim);

  let status;
  if (diasSeguro >= diasNecessarios)      status = 'ok';
  else if (diasMinimo >= diasNecessarios) status = 'atencao';
  else                                    status = 'nok';

  const tceUsar  = status === 'ok' ? tceSeguro  : tceMinimo;
  const fechUsar = status === 'ok' ? fechSeguro : fechMinimo;
  const diasDisp = status === 'nok' ? diasMinimo : diasSeguro;

  renderizar({ status, horas, horasPorDia, diasNecessarios, diasDisp, dataVenda, fechUsar, tceUsar, dataFim });
}

// ------------------------------------------------------------
//  RENDERIZAÇÃO
// ------------------------------------------------------------

function renderizar(d) {
  const res    = document.getElementById('res');
  const badge  = document.getElementById('badge');
  const rtitle = document.getElementById('rtitle');
  const rsub   = document.getElementById('rsub');
  const stats  = document.getElementById('stats');
  const tl     = document.getElementById('tl');

  res.classList.add(d.status);
  badge.className = 'badge ' + d.status;

  if (d.status === 'ok') {
    badge.textContent  = '✓ Viável';
    rtitle.textContent = 'O estágio pode ser concluído no prazo!';
    rsub.textContent   = '';
  } else if (d.status === 'atencao') {
    badge.textContent  = '⚠ Viável com atenção';
    rtitle.textContent = 'Possível, mas sem margem de segurança.';
    rsub.textContent   = 'Qualquer atraso na validação da faculdade pode inviabilizar o estágio.';
  } else {
    badge.textContent  = '✗ Não possível';
    rtitle.textContent = 'Não é possível cumprir o estágio neste prazo.';
    rsub.textContent   = 'Não há dias úteis suficientes para completar ' + d.horas + 'h antes de ' + fmt(d.dataFim) + '.';
  }

  const horasLabel = d.horasPorDia % 1 === 0 ? d.horasPorDia + 'h/dia' : d.horasPorDia + 'h/dia';

  stats.innerHTML = `
    <div class="stat">
      <p class="slabel">Carga horária</p>
      <p class="sval">${d.horas}h</p>
    </div>
    <div class="stat">
      <p class="slabel">Dias necessários</p>
      <p class="sval">${d.diasNecessarios} úteis</p>
    </div>
    <div class="stat">
      <p class="slabel">Horas por dia</p>
      <p class="sval">${horasLabel}</p>
    </div>
  `;

  tl.innerHTML = `
    <div class="tl-row">
      <div class="dot d-coral"></div>
      <div class="tl-info">
        <p class="tlabel">Fechamento do contrato até</p>
        <p class="tdate">${fmt(d.fechUsar)}</p>
        <p class="tnote">Mínimo 5 dias antes da abertura do TCE</p>
      </div>
    </div>
    <div class="tl-row">
      <div class="dot d-amber"></div>
      <div class="tl-info">
        <p class="tlabel">Abertura do TCE até</p>
        <p class="tdate">${fmt(d.tceUsar)}</p>
        <p class="tnote">10 dias antes do início do estágio</p>
      </div>
    </div>
    <div class="tl-row">
      <div class="dot d-blue"></div>
      <div class="tl-info">
        <p class="tlabel">Prazo final de conclusão</p>
        <p class="tdate">${fmt(d.dataFim)}</p>
      </div>
    </div>
  `;
}