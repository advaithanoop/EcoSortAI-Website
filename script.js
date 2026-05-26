// script.js – EcoSort AI Premium Dynamic Controls & Animations

// ==================== TSPARTICLES BACKGROUND ====================
if (typeof tsParticles !== 'undefined') {
  tsParticles.load("particles-bg", {
    fpsLimit: 120,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["#00ff9d", "#00f0ff", "#ffffff"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.4,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: 3 },
        random: true
      },
      links: {
        enable: true,
        distance: 150,
        color: "#00ff9d",
        opacity: 0.15,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out"
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.35
          }
        },
        push: {
          quantity: 4
        }
      }
    },
    background: {
      color: "transparent"
    },
    detectRetina: true
  });
}

// ==================== GSAP ENTRANCE ANIMATIONS ====================
window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    // Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".navbar", { y: -50, opacity: 0, duration: 1.5 })
      .from(".hero-content h1", { y: 60, opacity: 0, duration: 1.2 }, "-=1")
      .from(".hero-content .subhead", { y: 40, opacity: 0, duration: 1.2 }, "-=1")
      .from(".cta .btn", { scale: 0.9, opacity: 0, duration: 1, stagger: 0.2 }, "-=0.8")
      .from(".hero-visual img", { x: 80, opacity: 0, duration: 1.5 }, "-=1.2");

    // Staggered reveals for feature cards, testimonials, and dashboard stats
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: "#features",
        start: "top 80%"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    gsap.from(".testimonial-card", {
      scrollTrigger: {
        trigger: "#testimonials",
        start: "top 80%"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    gsap.from(".pricing-card", {
      scrollTrigger: {
        trigger: "#pricing",
        start: "top 80%"
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    });
  }
});

// ==================== INTERACTIVE PRICING TOGGLE ====================
const pricingToggle = document.getElementById('pricingToggle');
if (pricingToggle) {
  pricingToggle.addEventListener('change', (e) => {
    const isAnnual = e.target.checked;
    const prices = document.querySelectorAll('.price');
    const toggleSpans = document.querySelectorAll('.toggle-switch span');

    // Toggle active classes on text labels
    if (isAnnual) {
      toggleSpans[0].classList.remove('active');
      toggleSpans[1].classList.add('active');
    } else {
      toggleSpans[0].classList.add('active');
      toggleSpans[1].classList.remove('active');
    }

    prices.forEach(price => {
      const card = price.closest('.pricing-card');
      const monthVal = price.getAttribute('data-month');
      const annualVal = price.getAttribute('data-annual');
      
      // Animate price update with number slide feel
      let targetPrice = isAnnual ? `$${annualVal}` : `$${monthVal}`;
      if (price.closest('[data-plan="Free"]')) {
        targetPrice = "$0";
      } else {
        targetPrice = isAnnual ? `$${annualVal}` : `$${monthVal}`;
      }

      // Smooth opacity swap
      price.style.opacity = 0;
      setTimeout(() => {
        price.innerHTML = targetPrice + (isAnnual ? `<span style="font-size:1rem;color:var(--text-muted);font-weight:500;">/yr</span>` : `<span style="font-size:1rem;color:var(--text-muted);font-weight:500;">/mo</span>`);
        price.style.opacity = 1;
      }, 200);
    });
  });
}

// ==================== REAL-TIME DASHBOARD CHARTS ====================
let lineChartInstance, pieChartInstance;

function initLineChart() {
  const canvas = document.getElementById('lineChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // Custom neon gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(0, 255, 157, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 255, 157, 0.0)');

  lineChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Sorted Waste (kg)',
        data: [280, 420, 390, 580, 510, 690, 840],
        borderColor: '#00ff9d',
        borderWidth: 3,
        backgroundColor: gradient,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#00ff9d',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(5, 10, 8, 0.9)',
          borderColor: 'rgba(0, 255, 157, 0.2)',
          borderWidth: 1,
          titleFont: { family: 'Outfit', weight: 'bold' },
          bodyFont: { family: 'Inter' }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#8fa09b', font: { family: 'Inter' } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#8fa09b', font: { family: 'Inter' } }
        }
      }
    }
  });
}

function initPieChart() {
  const canvas = document.getElementById('pieChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  pieChartInstance = new Chart(ctx, {
    type: 'doughnut', // Doughnut gives a cleaner premium look
    data: {
      labels: ['Recycled', 'Organic Compost', 'Residual Landfill'],
      datasets: [{
        data: [68, 22, 10],
        backgroundColor: [
          '#00ff9d', // Recycled
          '#00f0ff', // Compost
          'rgba(255, 255, 255, 0.08)' // Landfill
        ],
        borderColor: '#050a08',
        borderWidth: 3,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#8fa09b',
            font: { family: 'Inter', size: 11 },
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(5, 10, 8, 0.9)',
          borderColor: 'rgba(0, 240, 255, 0.2)',
          borderWidth: 1,
          titleFont: { family: 'Outfit', weight: 'bold' },
          bodyFont: { family: 'Inter' }
        }
      },
      cutout: '70%' // Thin sleek premium doughnut
    }
  });
}

// Live simulation of metrics
function simulateMetrics() {
  setInterval(() => {
    // Waste counter tick
    const totalWasteElem = document.getElementById('totalWaste');
    if (totalWasteElem) {
      let currentVal = parseInt(totalWasteElem.innerText.replace(/,/g, '').replace(' kg', ''));
      let newVal = currentVal + Math.floor(Math.random() * 5) + 1;
      totalWasteElem.innerText = newVal.toLocaleString() + ' kg';
    }

    // Efficiency tick
    const effElem = document.getElementById('efficiency');
    if (effElem) {
      let currentVal = parseInt(effElem.innerText.replace('%', ''));
      let targetVal = 85 + Math.floor(Math.random() * 5); // 85% to 90%
      if (currentVal !== targetVal) {
        effElem.innerText = targetVal + '%';
      }
    }
  }, 3000);
}

// ==================== PREMIUM AI CHATBOT SYSTEM ====================
const chatbotToggle = document.getElementById('chatbotToggle');
if (chatbotToggle) {
  const icon = chatbotToggle.querySelector('.chatbot-icon');
  const panel = chatbotToggle.querySelector('.chatbot-panel');
  
  icon.addEventListener('click', () => {
    panel.classList.toggle('hidden');
    // Save state indicator
    if (!panel.classList.contains('hidden')) {
      const chatInput = document.getElementById('chatInput');
      if (chatInput) chatInput.focus();
    }
  });
}

const sendBtn = document.getElementById('sendBtn');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');

// AI Smart waste replies dictionary
const aiResponses = {
  "plastic": "♻️ **Plastic Sorting:** Most clear plastic bottles (PET #1, HDPE #2) are widely recyclable! Make sure to rinse and dry them first.",
  "paper": "📄 **Paper & Cardboard:** Clean, dry paper products can go into your blue recycling bin. Avoid greasy pizza boxes, as the grease degrades the paper pulp.",
  "glass": "🍾 **Glass Sorting:** Glass bottles and jars are 100% infinitely recyclable! Wash them out, and group them by colors if requested by local waste streams.",
  "metal": "🥫 **Aluminium & Steel Cans:** Cans are highly valuable recyclables! Rinse well. Squashing aluminium cans helps save space.",
  "compost": "🍎 **Organic Compost:** Fruit peels, coffee grounds, eggshells, and garden clippings are excellent for compost! Keep dairy and meat waste out to avoid bad odors.",
  "battery": "🔋 **Hazardous E-Waste:** Batteries, old smartphones, and chargers must *never* go in standard bins. Bring them to designated electronic recycling depots.",
  "hello": "👋 **Welcome to EcoSort AI!** I am your smart waste assistant. Type in any trash type (e.g., 'plastic bottle', 'apple peel', 'cardboard') or ask about our AI sensors!"
};

function addMessage(text, isUser) {
  if (!chatBody) return;
  const bubble = document.createElement('div');
  bubble.className = `bubble ${isUser ? 'user' : 'bot'}`;
  
  // Format markdown-like bold and links
  let formattedText = text
    .replace(/\*\*(.*?)\*\"/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

  bubble.innerHTML = formattedText;
  chatBody.appendChild(bubble);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleChatSubmit() {
  if (!chatInput) return;
  const query = chatInput.value.trim();
  if (!query) return;

  addMessage(query, true);
  chatInput.value = '';

  // Animated Typing Indicator
  const typingBubble = document.createElement('div');
  typingBubble.className = 'bubble bot typing-indicator';
  typingBubble.innerHTML = `<span style="display:inline-block;animation:typingPulse 1s infinite alternate;">EcoSort AI is analyzing...</span>`;
  chatBody.appendChild(typingBubble);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Keyframes style insert dynamically for typing pulse
  if (!document.getElementById('typing-pulse-style')) {
    const style = document.createElement('style');
    style.id = 'typing-pulse-style';
    style.innerHTML = `@keyframes typingPulse { 0% { opacity: 0.3; } 100% { opacity: 1; } }`;
    document.head.appendChild(style);
  }

  // Answer matching
  setTimeout(() => {
    typingBubble.remove();
    const queryLower = query.toLowerCase();
    let reply = "🔍 *Analyzing item...* EcoSort AI classifies this as general waste. For best results, consult your local recycling guidelines!";

    for (const [key, val] of Object.entries(aiResponses)) {
      if (queryLower.includes(key)) {
        reply = val;
        break;
      }
    }

    addMessage(reply, false);
  }, 1000);
}

if (sendBtn && chatInput) {
  sendBtn.addEventListener('click', handleChatSubmit);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleChatSubmit();
  });
}

// Voice mic placeholder feedback
const micBtn = document.querySelector('.voice');
if (micBtn) {
  micBtn.addEventListener('click', () => {
    addMessage("🎤 *Listening for waste types...* Speak now.", false);
    setTimeout(() => {
      addMessage("⚠️ Voice recognition requires microphone permissions. Please type your query in the input box instead!", false);
    }, 2000);
  });
}

// Contact form premium confirmation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const oldText = btn.innerText;
    
    btn.innerText = "✓ Message Transmitted";
    btn.style.background = "#00f0ff";
    btn.style.boxShadow = "0 0 20px #00f0ff";
    
    setTimeout(() => {
      btn.innerText = oldText;
      btn.style.background = "var(--accent-emerald)";
      btn.style.boxShadow = "var(--neon-glow-emerald)";
      contactForm.reset();
    }, 3000);
  });
}

// ==================== CHART & SIMULATION INITS ====================
window.addEventListener('DOMContentLoaded', () => {
  initLineChart();
  initPieChart();
  simulateMetrics();
});
