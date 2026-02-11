// IMZA Money Lab - Interactive Calculators

document.addEventListener('DOMContentLoaded', () => {
    // Initialise all calculators
    setupCompoundInterest();
    setupSavingsGoal();
    setupTimeToMillion();
    setupCostOfWaiting();
    setupEmergencyFund();
    setupISACalculator();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ============ UTILITY FUNCTIONS ============

function formatCurrency(value) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-GB').format(Math.round(value));
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

function calculateMonthlyPaymentNeeded(goal, starting, years, annualRate) {
    const n = 12;
    const r = annualRate / 100;
    const t = years;
    const FV = goal;
    const P = starting;
    
    // PMT = [FV - P(1 + r/n)^(nt)] / [((1 + r/n)^(nt) - 1) / (r/n)]
    const compoundFactor = Math.pow(1 + r/n, n*t);
    const numerator = FV - (P * compoundFactor);
    const denominator = (compoundFactor - 1) / (r/n || 1);
    const pmt = numerator / denominator;
    
    return Math.max(0, pmt);
}

// ============ CALCULATOR 1: Compound Interest ============

function setupCompoundInterest() {
    const inputs = ['ci-starting', 'ci-monthly', 'ci-years', 'ci-rate'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateCompoundInterest);
    });
    updateCompoundInterest();
}

function updateCompoundInterest() {
    const starting = parseFloat(document.getElementById('ci-starting')?.value) || 0;
    const monthly = parseFloat(document.getElementById('ci-monthly')?.value) || 0;
    const years = parseFloat(document.getElementById('ci-years')?.value) || 1;
    const rate = parseFloat(document.getElementById('ci-rate')?.value) || 0;
    
    const result = calculateCompoundInterest(starting, monthly, years, rate);
    
    const investedEl = document.getElementById('ci-invested');
    const finalEl = document.getElementById('ci-final');
    const growthEl = document.getElementById('ci-growth');
    
    if (investedEl) investedEl.textContent = formatCurrency(result.totalInvested);
    if (finalEl) finalEl.textContent = formatCurrency(result.futureValue);
    if (growthEl) growthEl.textContent = formatCurrency(result.growth);
    
    // Calculate difference starting at 15 vs 25
    const at15 = calculateCompoundInterest(starting, monthly, 50, rate);
    const at25 = calculateCompoundInterest(starting, monthly, 40, rate);
    const difference = at15.futureValue - at25.futureValue;
    
    const diffEl = document.getElementById('ci-difference');
    if (diffEl) diffEl.textContent = formatCurrency(difference);
    
    // Update chart
    updateCompoundChart(starting, monthly, years, rate);
}

function updateCompoundChart(starting, monthly, years, rate) {
    const chart = document.getElementById('ci-chart');
    if (!chart) return;
    
    chart.innerHTML = '';
    
    const points = 10;
    const step = years / points;
    
    for (let i = 0; i <= points; i++) {
        const year = i * step;
        const result = calculateCompoundInterest(starting, monthly, year, rate);
        const maxValue = calculateCompoundInterest(starting, monthly, years, rate).futureValue;
        const heightPercent = (result.futureValue / maxValue) * 100;
        
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${Math.max(5, heightPercent)}%`;
        
        const label = document.createElement('span');
        label.textContent = year === 0 ? 'Start' : `Y${Math.round(year)}`;
        bar.appendChild(label);
        
        chart.appendChild(bar);
    }
}

// ============ CALCULATOR 2: Savings Goal ============

function setupSavingsGoal() {
    const inputs = ['sg-goal', 'sg-starting', 'sg-years', 'sg-rate'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateSavingsGoal);
    });
    updateSavingsGoal();
}

function updateSavingsGoal() {
    const goal = parseFloat(document.getElementById('sg-goal')?.value) || 60000;
    const starting = parseFloat(document.getElementById('sg-starting')?.value) || 0;
    const years = parseFloat(document.getElementById('sg-years')?.value) || 1;
    const rate = parseFloat(document.getElementById('sg-rate')?.value) || 0;
    
    const monthlyNeeded = calculateMonthlyPaymentNeeded(goal, starting, years, rate);
    const result = calculateCompoundInterest(starting, monthlyNeeded, years, rate);
    const percentSaved = (result.totalInvested / goal) * 100;
    
    const monthlyEl = document.getElementById('sg-monthly');
    const investedEl = document.getElementById('sg-invested');
    const growthEl = document.getElementById('sg-growth');
    const percentEl = document.getElementById('sg-percent');
    
    if (monthlyEl) monthlyEl.textContent = formatCurrency(monthlyNeeded);
    if (investedEl) investedEl.textContent = formatCurrency(result.totalInvested);
    if (growthEl) growthEl.textContent = formatCurrency(result.growth);
    if (percentEl) percentEl.textContent = Math.round(percentSaved) + '%';
}

// ============ CALCULATOR 3: Time to Million ============

function setupTimeToMillion() {
    const inputs = ['tm-starting', 'tm-monthly', 'tm-rate'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateTimeToMillion);
    });
    updateTimeToMillion();
}

function updateTimeToMillion() {
    const starting = parseFloat(document.getElementById('tm-starting')?.value) || 0;
    const monthly = parseFloat(document.getElementById('tm-monthly')?.value) || 0;
    const rate = parseFloat(document.getElementById('tm-rate')?.value) || 0;
    
    // Find years to £1M
    let years = 0;
    let maxYears = 100;
    
    for (let y = 0; y <= maxYears; y++) {
        const result = calculateCompoundInterest(starting, monthly, y, rate);
        if (result.futureValue >= 1000000) {
            years = y;
            break;
        }
    }
    
    const result = calculateCompoundInterest(starting, monthly, years, rate);
    
    // Assume starting age of 15
    const startAge = 15;
    const ageAtMillion = startAge + years;
    
    const yearsEl = document.getElementById('tm-years');
    const ageEl = document.getElementById('tm-age');
    const investedEl = document.getElementById('tm-invested');
    const freeEl = document.getElementById('tm-free');
    
    if (yearsEl) yearsEl.textContent = years;
    if (ageEl) ageEl.textContent = ageAtMillion;
    if (investedEl) investedEl.textContent = formatCurrency(result.totalInvested);
    if (freeEl) freeEl.textContent = formatCurrency(result.growth);
}

// ============ CALCULATOR 4: Cost of Waiting ============

function setupCostOfWaiting() {
    const inputs = ['cw-monthly', 'cw-start-age', 'cw-end-age', 'cw-rate'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateCostOfWaiting);
    });
    updateCostOfWaiting();
}

function updateCostOfWaiting() {
    const monthly = parseFloat(document.getElementById('cw-monthly')?.value) || 0;
    const startAge = parseFloat(document.getElementById('cw-start-age')?.value) || 15;
    const endAge = parseFloat(document.getElementById('cw-end-age')?.value) || 65;
    const rate = parseFloat(document.getElementById('cw-rate')?.value) || 0;
    
    const yearsEarly = endAge - startAge;
    const yearsLate = endAge - (startAge + 10);
    
    const resultEarly = calculateCompoundInterest(0, monthly, Math.max(0, yearsEarly), rate);
    const resultLate = calculateCompoundInterest(0, monthly, Math.max(0, yearsLate), rate);
    
    const costOfWaiting = resultEarly.futureValue - resultLate.futureValue;
    
    // Update age displays
    const age1El = document.getElementById('cw-age1');
    const age2El = document.getElementById('cw-age2');
    if (age1El) age1El.textContent = startAge;
    if (age2El) age2El.textContent = startAge + 10;
    
    // Update results
    const result1El = document.getElementById('cw-result1');
    const result2El = document.getElementById('cw-result2');
    const invested1El = document.getElementById('cw-invested1');
    const invested2El = document.getElementById('cw-invested2');
    const costEl = document.getElementById('cw-cost');
    
    if (result1El) result1El.textContent = formatCurrency(resultEarly.futureValue);
    if (result2El) result2El.textContent = formatCurrency(resultLate.futureValue);
    if (invested1El) invested1El.textContent = formatCurrency(resultEarly.totalInvested);
    if (invested2El) invested2El.textContent = formatCurrency(resultLate.totalInvested);
    if (costEl) costEl.textContent = formatCurrency(costOfWaiting);
}

// ============ CALCULATOR 5: Emergency Fund ============

function setupEmergencyFund() {
    const monthlyEl = document.getElementById('ef-monthly');
    const monthsEl = document.getElementById('ef-months');
    
    if (monthlyEl) monthlyEl.addEventListener('input', updateEmergencyFund);
    if (monthsEl) {
        monthsEl.addEventListener('input', updateEmergencyFund);
        monthsEl.addEventListener('input', function() {
            const display = document.getElementById('ef-months-display');
            if (display) display.textContent = this.value + ' months';
        });
    }
    updateEmergencyFund();
}

function updateEmergencyFund() {
    const monthlyExpenses = parseFloat(document.getElementById('ef-monthly')?.value) || 0;
    const months = parseFloat(document.getElementById('ef-months')?.value) || 6;
    
    const target = monthlyExpenses * months;
    const monthlySavings = 250;
    const timeToSave = target / monthlySavings;
    
    const targetEl = document.getElementById('ef-target');
    const timeEl = document.getElementById('ef-time');
    
    if (targetEl) targetEl.textContent = formatCurrency(target);
    if (timeEl) timeEl.textContent = Math.ceil(timeToSave) + ' months';
}

// ============ CALCULATOR 6: ISA Calculator ============

function setupISACalculator() {
    const inputs = ['isa-amount', 'isa-return', 'isa-years', 'isa-tax'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateISACalculator);
    });
    updateISACalculator();
}

function updateISACalculator() {
    const amount = parseFloat(document.getElementById('isa-amount')?.value) || 0;
    const returnRate = parseFloat(document.getElementById('isa-return')?.value) || 0;
    const years = parseFloat(document.getElementById('isa-years')?.value) || 1;
    const taxRate = parseFloat(document.getElementById('isa-tax')?.value) || 40;
    
    // Calculate ISA value (no tax)
    const isaResult = calculateCompoundInterest(amount, 0, years, returnRate);
    
    // Calculate taxable equivalent (dividends + capital gains taxed)
    // Simplified: assume growth is taxed at income tax rate on gains
    const taxableGrowth = isaResult.growth * (1 - taxRate/100);
    const taxableValue = amount + taxableGrowth;
    const taxSaved = isaResult.futureValue - taxableValue;
    
    const valueEl = document.getElementById('isa-value');
    const savedEl = document.getElementById('isa-saved');
    const growthEl = document.getElementById('isa-growth');
    
    if (valueEl) valueEl.textContent = formatCurrency(isaResult.futureValue);
    if (savedEl) savedEl.textContent = formatCurrency(taxSaved);
    if (growthEl) growthEl.textContent = formatCurrency(isaResult.growth);
}

// ============ SHARE FUNCTIONALITY ============

function shareResult(calculator) {
    const text = getShareText(calculator);
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'IMZA Invest Calculator',
            text: text,
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text + ' ' + url).then(() => {
            alert('Result copied to clipboard!');
        });
    }
}

function getShareText(calculator) {
    switch(calculator) {
        case 'compound':
            const final = document.getElementById('ci-final')?.textContent;
            return `I could turn my savings into ${final} with compound interest! Calculate yours:`;
        default:
            return 'Check out these free financial calculators!';
    }
}
