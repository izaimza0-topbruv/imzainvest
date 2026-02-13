// IMZA Invest - Homepage JavaScript

document.addEventListener('DOMContentLoaded', () => {
    setupCalculator();
    setupCountdown();
    setupMobileMenu();
    setupSmoothScroll();
});

// ============ COMPOUND INTEREST CALCULATOR ============

function setupCalculator() {
    const inputs = ['calc-starting-amount', 'calc-monthly-investment', 'calc-years', 'calc-return-rate'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', updateCalculator);
        }
    });
    updateCalculator();
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function calculateCompoundInterest(principal, monthlyPayment, years, annualRate) {
    const n = 12; // Monthly compounding
    const r = annualRate / 100;
    const t = years;
    const P = principal;
    const PMT = monthlyPayment;
    
    // Future Value = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    const futureValue = P * Math.pow(1 + r/n, n*t) + PMT * ((Math.pow(1 + r/n, n*t) - 1) / (r/n || 1));
    const totalInvested = P + (PMT * n * t);
    const growth = futureValue - totalInvested;
    
    return { futureValue, totalInvested, growth };
}

function updateCalculator() {
    const starting = parseFloat(document.getElementById('calc-starting-amount')?.value) || 1000;
    const monthly = parseFloat(document.getElementById('calc-monthly-investment')?.value) || 250;
    const years = parseFloat(document.getElementById('calc-years')?.value) || 3;
    const rate = parseFloat(document.getElementById('calc-return-rate')?.value) || 8;
    
    const result = calculateCompoundInterest(starting, monthly, years, rate);
    
    const investedEl = document.getElementById('total-invested');
    const finalEl = document.getElementById('final-value');
    const growthEl = document.getElementById('growth');
    
    if (investedEl) investedEl.textContent = formatCurrency(result.totalInvested);
    if (finalEl) finalEl.textContent = formatCurrency(result.futureValue);
    if (growthEl) {
        growthEl.textContent = formatCurrency(result.growth);
        growthEl.className = result.growth >= 0 ? 'result-value positive' : 'result-value negative';
    }
}

// ============ COUNTDOWN TIMER ============

function setupCountdown() {
    const targetDate = new Date('2028-09-01T00:00:00'); // September 1st, 2028 (uni start)
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            document.querySelector('.countdown-values').innerHTML = '<span class="countdown-complete">🎓 University Time!</span>';
            return;
        }
        
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        
        const yearsEl = document.getElementById('countdown-years');
        const monthsEl = document.getElementById('countdown-months');
        const daysEl = document.getElementById('countdown-days');
        
        if (yearsEl) yearsEl.textContent = years;
        if (monthsEl) monthsEl.textContent = months;
        if (daysEl) daysEl.textContent = days;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour
}

// ============ MOBILE MENU ============

function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.textContent = '☰';
            });
        });
    }
}

// ============ SMOOTH SCROLL ============

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============ NEWSLETTER FORM ============

function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const messageDiv = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('newsletter-email').value;
        const honeypot = form.querySelector('input[name="website"]').value;
        const consent = form.querySelector('input[name="consent"]').checked;
        
        // Validate honeypot (should be empty)
        if (honeypot) {
            console.warn('Honeypot triggered');
            showMessage('Something went wrong. Please try again.', 'error');
            return;
        }
        
        // Validate email
        if (!email || !email.includes('@')) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate consent
        if (!consent) {
            showMessage('Please agree to receive emails.', 'error');
            return;
        }
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showMessage('✅ Success! Check your email for updates.', 'success');
                form.reset();
                submitBtn.textContent = 'Get Updates →';
                
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                }, 5000);
            } else {
                showMessage('Oops! Something went wrong. Please try again.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Get Updates →';
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Get Updates →';
        }
    });
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        
        // Auto-hide error messages after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                messageDiv.className = 'form-message';
            }, 5000);
        }
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNewsletterForm);
} else {
    setupNewsletterForm();
}
