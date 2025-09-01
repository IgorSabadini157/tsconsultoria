const CONFIG = {
    whatsappNumber: "+5519989331636", // formato completo com DDI/DD — ex.: +5511999999999
    whatsappMsg: "Olá, gostaria de saber mais sobre a TS Consultoria",
    instagramUser: "_tsconsultoriaocupacional",
    email: "tatiani.tsconsultoria@gmail.com",
    address: "Rua Doutor Luiz Anhaia Melo, 541, Centro, Mogi Guaçu - SP",
    // COMO OBTER O LINK DO GOOGLE MAPS (EMBED):
    // 1) Abra o Google Maps e pesquise seu endereço.
    // 2) Clique em 'Compartilhar' > 'Incorporar um mapa' > 'Copiar HTML'.
    // 3) Do HTML copiado, extraia o valor de src do <iframe> e cole abaixo:
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.836628105779!2d-46.9449991850394!3d-22.37911648535878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c85942b27568ab%3A0x1d3a6d557a66f272!2sR.%20Dr.%20Luiz%20Anhaia%20Mello%2C%20541%20-%20Centro%2C%20Mogi%20Gua%C3%A7u%20-%20SP%2C%2013840-055!5e0!3m2!1spt-BR!2sbr!4v1678886400000!5m2!1spt-BR!2sbr" // cole o URL completo que começa com https://
};

// Preenche links dinâmicos de contato
(function initContacts() {
    // WhatsApp links
    const waBase = "https://wa.me/";
    const num = CONFIG.whatsappNumber.replace(/\D/g, "");
    const text = encodeURIComponent(CONFIG.whatsappMsg);
    const waLink = `${waBase}${num}?text=${text}`;

    const whatsEls = ["ctaWhats", "areasWhats", "fabWhats", "contactWhats"]
        .map(id => document.getElementById(id))
        .filter(Boolean);
    whatsEls.forEach(a => a.href = waLink);

    // Instagram links
    const instaUrl = `https://instagram.com/${CONFIG.instagramUser}`;
    const instaEls = ["fabInsta", "contactInsta"]
        .map(id => document.getElementById(id))
        .filter(Boolean);
    instaEls.forEach(a => a.href = instaUrl);

    // E-mail (fab usa mailto no HTML); atualiza contato
    const emailEl = document.getElementById("contactEmail");
    if (emailEl) { emailEl.href = `mailto:${CONFIG.email}`; emailEl.textContent = CONFIG.email; }

    // Endereço
    const addrEl = document.getElementById("contactAddress");
    if (addrEl) { addrEl.textContent = CONFIG.address; }

    // Google Maps iframe
    const map = document.getElementById("mapFrame");
    if (map && CONFIG.googleMapsEmbedUrl && CONFIG.googleMapsEmbedUrl.startsWith("https://")) {
        map.src = CONFIG.googleMapsEmbedUrl;
    }
})();

// Tema escuro/claro
const themeSwitch = document.getElementById('theme-switch__checkbox');
const root = document.documentElement;

// Verificar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    root.classList.add('dark');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});

// Animação de revelação no scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
});

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Ano atual no footer
document.getElementById('year').textContent = new Date().getFullYear();