// Lista de categorias e dorks exibidas na página.
// Cada dork tem um nome amigável (name) e a query real do Google (query).
const CATEGORIES = [
  { icon:"🎻", title:"Clássicos", dorks:[
    {name:"robots.txt (filetype)", query:'filetype:txt "robots.txt"'},
    {name:"robots.txt (inurl)", query:'inurl:robots.txt'},
    {name:"Login admin clássico", query:'intitle:login "admin"'},
    {name:"admin/login.php", query:'inurl:/admin/login.php'},
    {name:"Apache Status exposto", query:'inurl:server-status "Apache Status"'},
    {name:"Apache2 Ubuntu Default Page", query:'intitle:"Apache2 Ubuntu Default Page"'},
    {name:"Index of Apache", query:'intitle:"index of /" "Apache"'},
    {name:".htaccess exposto", query:'filetype:htaccess'},
    {name:"Secret em txt/cfg", query:'ext:txt OR ext:cfg "secret"'},
    {name:"phpMyAdmin porta alternativa", query:'inurl:8443 OR inurl:8080 "phpMyAdmin"'}
  ]},
  { icon:"📄", title:"Documentos expostos", dorks:[
    {name:"PDF confidencial", query:'filetype:pdf "confidential"'},
    {name:"PDF uso interno", query:'filetype:pdf "internal use only"'},
    {name:"PDF não distribuir", query:'filetype:pdf "do not distribute"'},
    {name:"Excel com senha", query:'filetype:xlsx "password"'},
    {name:"Planilha de salários", query:'filetype:xls "salary"'},
    {name:"Word/Docx restrito", query:'filetype:doc OR filetype:docx "not for distribution"'},
    {name:"PowerPoint interno", query:'filetype:pptx "internal"'},
    {name:"CSV com credenciais", query:'filetype:csv "email" "password"'},
    {name:"Faturas em PDF", query:'filetype:pdf intitle:"invoice"'},
    {name:"Currículos expostos", query:'filetype:pdf "resume" "phone" "address"'}
  ]},
  { icon:"📁", title:"Listagem de diretórios", dorks:[
    {name:"Index of raiz", query:'intitle:"index of /"'},
    {name:"Parent directory", query:'intitle:"index of" "parent directory"'},
    {name:"Index of FTP", query:'intitle:"index of" inurl:ftp'},
    {name:"Index of backup", query:'intitle:"index of" "backup"'},
    {name:"Index of database", query:'intitle:"index of" "database"'},
    {name:"Index of pastas antigas", query:'intitle:"index of" "old"'},
    {name:"Index of private", query:'intitle:"index of" "private"'},
    {name:"Index of .git", query:'intitle:"index of" ".git"'},
    {name:"Index of uploads", query:'intitle:"index of" "uploads"'},
    {name:"Index of logs", query:'intitle:"index of" "logs"'}
  ]},
  { icon:"⚙️", title:"Configs de serviços", dorks:[
    {name:"Config Nginx", query:'filetype:conf inurl:nginx'},
    {name:"Config Apache/httpd", query:'filetype:conf inurl:httpd'},
    {name:"Docker Compose", query:'filetype:yml "docker-compose"'},
    {name:"Kubernetes Secret (yaml)", query:'filetype:yaml "apiVersion" "kind: Secret"'},
    {name:"INI com dados de banco", query:'filetype:ini "database"'},
    {name:"Properties JDBC", query:'filetype:properties "jdbc"'},
    {name:"CFG com senha", query:'filetype:cfg "password"'},
    {name:"wp-config.php.bak", query:'inurl:wp-config.php.bak'},
    {name:"Credenciais AWS", query:'inurl:.aws/credentials'},
    {name:"XML de configuração", query:'filetype:xml "configuration" "password"'}
  ]},
  { icon:"🗄️", title:"Arquivos de banco de dados", dorks:[
    {name:"Dump SQL (INSERT INTO)", query:'filetype:sql "INSERT INTO"'},
    {name:"Dump SQL com senha", query:'filetype:sql "CREATE TABLE" "password"'},
    {name:"Dump phpMyAdmin", query:'filetype:sql "phpMyAdmin SQL Dump"'},
    {name:"MySQL dump", query:'filetype:sql "-- MySQL dump"'},
    {name:"Tabela de usuários", query:'filetype:sql intext:"INSERT INTO" "users"'},
    {name:"Arquivos .db / .sqlite", query:'filetype:db OR filetype:sqlite'},
    {name:"Backup de SQL", query:'filetype:bak filetype:sql'},
    {name:"Access .mdb", query:'filetype:mdb'}
  ]},
  { icon:"🔑", title:"Arquivos sensíveis", dorks:[
    {name:".env com senha de DB", query:'filetype:env "DB_PASSWORD"'},
    {name:".env com API key", query:'filetype:env "API_KEY"'},
    {name:"Log com senha", query:'filetype:log "password"'},
    {name:"Log de erro com senha", query:'filetype:log "error" "password"'},
    {name:"Chave privada (.pem)", query:'filetype:pem "PRIVATE KEY"'},
    {name:"Chave RSA privada", query:'filetype:key "BEGIN RSA PRIVATE KEY"'},
    {name:"JSON com private_key", query:'filetype:json "private_key" "BEGIN PRIVATE KEY"'},
    {name:"Config do Git exposta", query:'inurl:.git/config'},
    {name:"Chave SSH exposta", query:'inurl:.ssh/id_rsa'},
    {name:".htpasswd exposto", query:'inurl:.htpasswd'}
  ]},
  { icon:"🌐", title:"Subdomínios / painéis", dorks:[
    {name:"Ambientes dev/staging", query:'inurl:dev OR inurl:staging OR inurl:homolog'},
    {name:"Ambientes test/qa", query:'inurl:test OR inurl:qa OR inurl:sandbox'},
    {name:"Painéis administrativos", query:'inurl:cpanel OR inurl:webmail OR inurl:portal'},
    {name:"Index of API", query:'intitle:"index of" inurl:api'},
    {name:"Jenkins exposto", query:'inurl:jenkins'},
    {name:"Grafana exposto", query:'inurl:grafana'},
    {name:"Kibana exposto", query:'inurl:kibana'},
    {name:"phpMyAdmin exposto", query:'inurl:phpmyadmin'}
  ]},
  { icon:"📝", title:"WordPress", dorks:[
    {name:"Uploads do WP", query:'inurl:wp-content/uploads'},
    {name:"admin-ajax.php", query:'inurl:/wp-admin/admin-ajax.php'},
    {name:"xmlrpc.php exposto", query:'inurl:xmlrpc.php'},
    {name:"Index of plugins", query:'intitle:"index of" wp-content/plugins'},
    {name:"Log dentro de wp-content", query:'filetype:log inurl:wp-content'},
    {name:"Backup do wp-config", query:'inurl:wp-config.php~'},
    {name:"debug.log exposto", query:'inurl:wp-content/debug.log'},
    {name:"Powered by WordPress + admin", query:'intext:"Powered by WordPress" inurl:wp-admin'}
  ]},
  { icon:"⚠️", title:"Potenciais vulnerabilidades", dorks:[
    {name:"Erro de sintaxe SQL", query:'intext:"sql syntax near"'},
    {name:"Erro mysql_connect", query:'intext:"Warning: mysql_connect()"'},
    {name:"Fatal error com linha", query:'intext:"Fatal error" "on line"'},
    {name:"phpinfo() exposto", query:'intitle:"phpinfo()" "PHP Version"'},
    {name:"Warning include() falho", query:'intext:"Warning: include(" "failed to open stream"'},
    {name:"Erro Oracle ORA-01756", query:'intext:"ORA-01756"'},
    {name:"Erro OLE DB / ODBC", query:'intext:"Microsoft OLE DB Provider for ODBC Drivers error"'},
    {name:"Erro no Apache Tomcat", query:'intitle:"Apache Tomcat" "Error Report"'}
  ]},
  { icon:"🤖", title:"IA / LLM expostos", dorks:[
    {name:"OpenAI key em .env", query:'filetype:env "OPENAI_API_KEY"'},
    {name:"Pinecone key em .env", query:'filetype:env "PINECONE_API_KEY"'},
    {name:"Anthropic key exposta", query:'intext:"ANTHROPIC_API_KEY"'},
    {name:"Token Hugging Face", query:'intext:"HUGGINGFACE_TOKEN"'},
    {name:"JSON com api_key OpenAI", query:'filetype:json "api_key" "openai"'},
    {name:"Index of langchain", query:'intitle:"index of" "langchain"'},
    {name:"Ollama rodando", query:'intitle:"Ollama is running"'},
    {name:"Ollama na porta 11434", query:'inurl:11434 intitle:"Ollama"'},
    {name:"ChromaDB exposto", query:'intitle:"Chroma" inurl:8000'}
  ]}
];

// Monta a query final: se um domínio alvo foi digitado, prefixa com site:dominio
function montarQuery(dork) {
  const alvo = document.getElementById('alvo').value.trim();
  return alvo ? `site:${alvo} ${dork}` : dork;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function highlightQuery(q) {
  return escapeHtml(q).replace(/(site:\S+)/, '<b>$1</b>');
}

// Gera o HTML de todas as categorias e dorks, chamada sempre que o domínio muda
function render() {
  const container = document.getElementById('categorias');
  let totalDorks = 0;

  // Nuvem de tags com o nome de cada categoria, clicável
  document.getElementById('tagCloud').innerHTML = CATEGORIES.map((cat, ci) =>
    `<span class="tag" onclick="irParaCategoria(${ci})">${cat.icon} ${escapeHtml(cat.title)}</span>`
  ).join('');

  container.innerHTML = CATEGORIES.map((cat, ci) => {
    totalDorks += cat.dorks.length;
    const rows = cat.dorks.map((dork, di) => {
      const finalQuery = montarQuery(dork.query);
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(finalQuery);
      const rowId = `d-${ci}-${di}`;
      return `
        <div class="dork-row" id="resultado-${ci}-${di}">
          <div class="dork-row-top">
            <span class="dork-name">${escapeHtml(dork.name)}</span>
            <div class="dork-actions">
              <a class="btn-open" href="${url}" target="_blank" rel="noopener">↗ Abrir</a>
              <button class="btn-copy" id="copy-${rowId}" onclick="copiarQuery('${rowId}', this)">⧉ Copiar</button>
            </div>
          </div>
          <div class="dork-query" id="query-${rowId}">${highlightQuery(finalQuery)}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="category" id="cat-${ci}">
        <div class="category-header" onclick="toggleCategory(${ci})">
          <div class="category-icon">${cat.icon}</div>
          <div class="category-info">
            <div class="category-title">${escapeHtml(cat.title)}</div>
            <div class="category-count">${cat.dorks.length} dorks</div>
          </div>
          <div class="chevron" id="chevron-${ci}">–</div>
        </div>
        <div class="category-body">${rows}</div>
      </div>
    `;
  }).join('');

  document.getElementById('topStatus').innerHTML =
    `<span style="color:var(--accent)">${totalDorks}</span> dorks em ${CATEGORIES.length} categorias`;
}

// Abre/fecha uma categoria e alterna o símbolo do indicador entre – e +
function toggleCategory(i) {
  const cat = document.getElementById('cat-' + i);
  cat.classList.toggle('collapsed');
  document.getElementById('chevron-' + i).textContent = cat.classList.contains('collapsed') ? '+' : '–';
}

// Clique na nuvem de tags: garante que a categoria esteja aberta e rola até ela
function irParaCategoria(i) {
  const cat = document.getElementById('cat-' + i);
  cat.classList.remove('collapsed');
  document.getElementById('chevron-' + i).textContent = '–';
  cat.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Copia a query da dork pra área de transferência e mostra feedback visual
function copiarQuery(rowId, btn) {
  const text = document.getElementById('query-' + rowId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = '✓ Copiado';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1500);
  });
}

render();