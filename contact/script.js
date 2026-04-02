// ========== Character Counter ==========
const textarea = document.querySelector('.message-area textarea');
const charCount = document.querySelector('.char-count');

if (textarea && charCount) {
  const maxLength = parseInt(textarea.getAttribute('maxlength')) || 100;

  textarea.addEventListener('input', () => {
    const remaining = maxLength - textarea.value.length;
    charCount.textContent = `${remaining}/${maxLength}`;

    if (remaining <= 10) {
      charCount.style.color = '#e05a00';
    } else {
      charCount.style.color = '#999';
    }
  });
}

// ========== Send Button ==========
const sendBtn = document.querySelector('.send-btn');

sendBtn && sendBtn.addEventListener('click', () => {
  const name = document.querySelector('.field[placeholder="الإسم"]');
  const email = document.querySelector('.field[placeholder="البريد الإلكتروني"]');
  const message = document.querySelector('.message-area textarea');

  const errors = [];

  if (!name || !name.value.trim()) errors.push('يرجى إدخال الإسم');
  if (!email || !email.value.trim()) errors.push('يرجى إدخال البريد الإلكتروني');
  if (!message || !message.value.trim()) errors.push('يرجى إدخال المحتوى');

  if (errors.length > 0) {
    showToast(errors[0], 'error');
    return;
  }

  showToast('تم الإرسال بنجاح!', 'success');

  // Reset fields
  if (name) name.value = '';
  if (email) email.value = '';
  if (message) {
    message.value = '';
    if (charCount) charCount.textContent = `100/100`;
    if (charCount) charCount.style.color = '#999';
  }
});

// ========== Toast Notification ==========
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;

  const colors = {
    success: '#1b3a6b',
    error: '#c0392b',
    info: '#555'
  };

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: colors[type] || colors.info,
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '10px',
    fontFamily: "'Cairo', sans-serif",
    fontSize: '0.95rem',
    fontWeight: '600',
    zIndex: '9999',
    boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
    opacity: '0',
    transition: 'all 0.3s ease',
    direction: 'rtl'
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ========== Input Focus Animation ==========
document.querySelectorAll('.field').forEach(el => {
  if (el.tagName === 'INPUT') {
    el.addEventListener('focus', () => el.parentElement && el.parentElement.classList.add('focused'));
    el.addEventListener('blur', () => el.parentElement && el.parentElement.classList.remove('focused'));
  }
});

// ========== WhatsApp Button ==========
const waBtn = document.querySelector('.whatsapp-btn img');
if (waBtn) {
  waBtn.addEventListener('click', () => {
    window.open('https://wa.me/966114444999', '_blank');
  });
}
