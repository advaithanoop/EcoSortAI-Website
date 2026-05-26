// script.js – initializes charts and chatbot UI

// ----- Chart.js setup -----
function initLineChart() {
  const ctx = document.getElementById('lineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Waste (kg)',
        data: [120, 150, 130, 160, 180, 170, 190],
        borderColor: 'var(--accent-emerald)',
        backgroundColor: 'rgba(0,255,157,0.2)',
        tension: 0.4,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: { display: true },
        y: { display: true }
      }
    }
  });
}

function initPieChart() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Recycled', 'Landfilled', 'Compost'],
      datasets: [{
        data: [55, 30, 15],
        backgroundColor: [
          'var(--accent-emerald)',
          'rgba(255,255,255,0.1)',
          'var(--accent-cyan)'
        ],
        borderColor: '#0a0a0a',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

// ----- Chatbot toggle -----
const chatbotToggle = document.getElementById('chatbotToggle');
const icon = chatbotToggle.querySelector('.chatbot-icon');
const panel = chatbotToggle.querySelector('.chatbot-panel');
icon.addEventListener('click', () => {
  panel.classList.toggle('hidden');
});

// ----- Send message (dummy echo) -----
const sendBtn = document.getElementById('sendBtn');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');
sendBtn.addEventListener('click', () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  const userBubble = document.createElement('div');
  userBubble.className = 'bubble user';
  userBubble.textContent = msg;
  chatBody.appendChild(userBubble);
  chatInput.value = '';
  setTimeout(() => {
    const botBubble = document.createElement('div');
    botBubble.className = 'bubble bot';
    botBubble.textContent = 'I see you typed: ' + msg;
    chatBody.appendChild(botBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
});

// ----- Initialize everything on DOM ready -----
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lineChart')) initLineChart();
  if (document.getElementById('pieChart')) initPieChart();
});
