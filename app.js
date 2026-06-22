/*
  Sim-Invest
  Desenvolvido por Isabella Pereira (Bells) - 2025 - Open Source
*/

const investmentData = {
  cdiRate: 0.1415,
  taxRulesVersion: "2026-current",
  investmentTypes: [
    { name: "CDI", category: "renda_fixa", institution: "Geral", taxType: "regressivo", defaultRate: 14.15, frequency: "annual", hasIOF: true, riskLevel: "baixo" },
    { name: "CDB Prefixado", category: "renda_fixa", institution: "Geral", taxType: "regressivo", defaultRate: 14.5, frequency: "annual", hasIOF: true, riskLevel: "baixo" },
    { name: "CDB Pós-Fixado (% CDI)", category: "renda_fixa", institution: "Geral", taxType: "regressivo", defaultRate: 110, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo" },
    { name: "Tesouro Selic", category: "renda_fixa", institution: "Governo", taxType: "regressivo", defaultRate: 14.25, frequency: "annual", hasIOF: true, riskLevel: "muito_baixo" },
    { name: "Tesouro Prefixado", category: "renda_fixa", institution: "Governo", taxType: "regressivo", defaultRate: 14.5, frequency: "annual", hasIOF: true, riskLevel: "baixo" },
    { name: "Tesouro IPCA", category: "renda_fixa", institution: "Governo", taxType: "regressivo", defaultRate: 8.5, frequency: "annual", hasIOF: true, riskLevel: "baixo" },

    { name: "Nubank - Nuconta", category: "fintechs", institution: "Nubank", taxType: "regressivo", defaultRate: 100, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "Nubank - CDB", category: "fintechs", institution: "Nubank", taxType: "regressivo", defaultRate: 105, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "Mercado Pago - Conta", category: "fintechs", institution: "Mercado Pago", taxType: "regressivo", defaultRate: 105, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "Mercado Pago - Cofrinho", category: "fintechs", institution: "Mercado Pago", taxType: "regressivo", defaultRate: 120, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "Mercado Pago - Cofrinho Meli+ (promo)", category: "fintechs", institution: "Mercado Pago", taxType: "regressivo", defaultRate: 140, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "Inter - Porquinho", category: "fintechs", institution: "Inter", taxType: "regressivo", defaultRate: 100, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "PicPay - Conta", category: "fintechs", institution: "PicPay", taxType: "regressivo", defaultRate: 102, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "C6 Bank - CDB", category: "fintechs", institution: "C6 Bank", taxType: "regressivo", defaultRate: 106, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "BTG Pactual - CDB", category: "fintechs", institution: "BTG Pactual", taxType: "regressivo", defaultRate: 100, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "99Pay", category: "fintechs", institution: "99", taxType: "isento", defaultRate: 110, frequency: "cdi-percent", hasIOF: false, riskLevel: "baixo_medio", notes: "110% do CDI até R$ 5 mil; acima disso, excedente rende menos" },
    { name: "99Pay - Acelerador", category: "fintechs", institution: "99", taxType: "isento", defaultRate: 130, frequency: "cdi-percent", hasIOF: false, riskLevel: "baixo_medio", notes: "taxa promocional/condicionada a missões" },

    { name: "LCI", category: "isento", institution: "Geral", taxType: "isento", defaultRate: 12.5, frequency: "annual", hasIOF: false, riskLevel: "baixo" },
    { name: "LCA", category: "isento", institution: "Geral", taxType: "isento", defaultRate: 12.0, frequency: "annual", hasIOF: false, riskLevel: "baixo" },
    { name: "CRI", category: "isento", institution: "Geral", taxType: "isento", defaultRate: 13.0, frequency: "annual", hasIOF: false, riskLevel: "baixo" },
    { name: "CRA", category: "isento", institution: "Geral", taxType: "isento", defaultRate: 12.5, frequency: "annual", hasIOF: false, riskLevel: "baixo" },
    { name: "Poupança", category: "isento", institution: "Geral", taxType: "isento", defaultRate: 6.17, frequency: "annual", hasIOF: false, riskLevel: "muito_baixo" },

    { name: "Ações", category: "renda_variavel", institution: "B3", taxType: "acoes", defaultRate: 12.0, frequency: "annual", hasIOF: false, riskLevel: "muito_alto" },
    { name: "Fundos Imobiliários (FIIs)", category: "renda_variavel", institution: "B3", taxType: "dividendo_isento", defaultRate: 1.1, frequency: "monthly", hasIOF: false, riskLevel: "alto" },

    { name: "Fundos DI", category: "fundos", institution: "Geral", taxType: "regressivo", defaultRate: 95, frequency: "cdi-percent", hasIOF: true, riskLevel: "baixo_medio" },
    { name: "Fundos Multimercado", category: "fundos", institution: "Geral", taxType: "regressivo", defaultRate: 12.0, frequency: "annual", hasIOF: true, riskLevel: "medio" },
    { name: "Fundos de Ações", category: "fundos", institution: "Geral", taxType: "regressivo", defaultRate: 10.0, frequency: "annual", hasIOF: true, riskLevel: "alto" }
  ],
  riskLevels: {
    muito_baixo: { name: "Muito Baixo", color: "#10b981", description: "Risco mínimo, capital garantido" },
    baixo: { name: "Baixo", color: "#3b82f6", description: "Baixo risco, retorno previsível" },
    baixo_medio: { name: "Baixo-Médio", color: "#eab308", description: "Risco moderado, boa previsibilidade" },
    medio: { name: "Médio", color: "#f97316", description: "Risco equilibrado, retorno variável" },
    alto: { name: "Alto", color: "#ef4444", description: "Alto risco, alta volatilidade" },
    muito_alto: { name: "Muito Alto", color: "#8b5cf6", description: "Risco máximo, alta volatilidade" }
  },
  investorProfiles: {
    conservador: {
      name: "Conservador",
      description: "Prioriza segurança do capital",
      allowedRisks: ["muito_baixo", "baixo", "baixo_medio"],
      preferredRisks: ["muito_baixo", "baixo"]
    },
    moderado: {
      name: "Moderado",
      description: "Busca equilíbrio entre risco e retorno",
      allowedRisks: ["baixo", "baixo_medio", "medio", "alto"],
      preferredRisks: ["baixo_medio", "medio"]
    },
    arrojado: {
      name: "Arrojado",
      description: "Aceita alto risco por maior retorno",
      allowedRisks: ["baixo_medio", "medio", "alto", "muito_alto"],
      preferredRisks: ["alto", "muito_alto"]
    }
  }
};

const { investmentTypes, riskLevels, investorProfiles, cdiRate } = investmentData;

const categoryNames = {
  renda_fixa: "🏦 Renda Fixa Tradicional",
  fintechs: "📱 Fintechs / Bancos Digitais",
  isento: "🌱 Isentos de IR",
  renda_variavel: "📈 Renda Variável",
  fundos: "💼 Fundos de Investimento"
};

const irTable = [
  { minDays: 0, maxDays: 180, rate: 0.225 },
  { minDays: 181, maxDays: 360, rate: 0.20 },
  { minDays: 361, maxDays: 720, rate: 0.175 },
  { minDays: 721, maxDays: 9999, rate: 0.15 }
];

const iofTable = [
  { day: 1, rate: 0.96 }, { day: 2, rate: 0.93 }, { day: 3, rate: 0.90 },
  { day: 4, rate: 0.86 }, { day: 5, rate: 0.83 }, { day: 6, rate: 0.80 },
  { day: 7, rate: 0.76 }, { day: 8, rate: 0.73 }, { day: 9, rate: 0.70 },
  { day: 10, rate: 0.66 }, { day: 11, rate: 0.63 }, { day: 12, rate: 0.60 },
  { day: 13, rate: 0.56 }, { day: 14, rate: 0.53 }, { day: 15, rate: 0.50 },
  { day: 16, rate: 0.46 }, { day: 17, rate: 0.43 }, { day: 18, rate: 0.40 },
  { day: 19, rate: 0.36 }, { day: 20, rate: 0.33 }, { day: 21, rate: 0.30 },
  { day: 22, rate: 0.26 }, { day: 23, rate: 0.23 }, { day: 24, rate: 0.20 },
  { day: 25, rate: 0.16 }, { day: 26, rate: 0.13 }, { day: 27, rate: 0.10 },
  { day: 28, rate: 0.06 }, { day: 29, rate: 0.03 }, { day: 30, rate: 0.00 }
];

let individualChart = null;
let allResults = [];
let currentFilter = "all";
let selectedProfile = "";
let bestGeneralOption = null;
let rankingExpanded = false;

function formatarCampoMoeda(value) {
  let number = value.replace(/\D/g, "");
  if (!number || number === "0") return "";
  number = (parseFloat(number) / 100).toFixed(2);
  return "R$ " + number.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseCurrencyValue(value) {
  if (!value) return 0;
  return parseFloat(value.replace(/R\$\s?/g, "").replace(/\./g, "").replace(",", ".")) || 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

function setupCurrencyMasks() {
  const currencyInputs = document.querySelectorAll(".currency-input");

  currencyInputs.forEach((input) => {
    if (input.id.includes("initial")) {
      input.value = "R$ 5.000,00";
    } else if (input.id.includes("monthly")) {
      input.value = "R$ 500,00";
    }

    input.addEventListener("input", function (e) {
      const cursorPosition = e.target.selectionStart || 0;
      const oldValue = e.target.value;
      const oldLength = oldValue.length;
      const newValue = formatarCampoMoeda(e.target.value);

      if (newValue !== oldValue) {
        e.target.value = newValue;
        const newLength = newValue.length;
        const lengthDiff = newLength - oldLength;
        const newCursorPosition = Math.min(newLength, Math.max(3, cursorPosition + lengthDiff));

        setTimeout(() => {
          try {
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
          } catch (error) {}
        }, 0);
      }
    });

    input.addEventListener("blur", function (e) {
      if (!e.target.value || e.target.value === "R$ ") {
        if (input.id.includes("initial")) {
          e.target.value = "R$ 10.000,00";
        } else if (input.id.includes("monthly")) {
          e.target.value = "R$ 1.000,00";
        }
      }
    });
  });
}

function setupTabNavigation() {
  document.addEventListener("click", function (event) {
    const button = event.target.closest(".tab-btn");
    if (!button) return;

    event.preventDefault();

    const targetTab = button.getAttribute("data-tab");

    document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));

    button.classList.add("active");

    const targetContent = document.getElementById(`${targetTab}-tab`);
    if (targetContent) targetContent.classList.add("active");
  });
}

function populateInvestmentTypes() {
  const select = document.getElementById("individual-type");
  if (!select) return;

  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Selecione um tipo";
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  const grouped = {};

  investmentTypes.forEach((type) => {
    if (!grouped[type.category]) grouped[type.category] = [];
    grouped[type.category].push(type);
  });

  Object.entries(grouped).forEach(([category, types]) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = categoryNames[category] || category;

    types.forEach((type) => {
      const option = document.createElement("option");
      option.value = type.name;
      option.textContent = type.institution !== "Geral" ? `${type.name} (${type.institution})` : type.name;
      optgroup.appendChild(option);
    });

    select.appendChild(optgroup);
  });
}

function setupInvestmentTypeHandler() {
  const typeSelect = document.getElementById("individual-type");
  if (!typeSelect) return;

  typeSelect.addEventListener("change", function () {
    const selectedType = investmentTypes.find((type) => type.name === this.value);

    if (selectedType) {
      updateRateField(selectedType);
      showInvestmentInfo(selectedType);
    } else {
      hideInvestmentInfo();
    }
  });
}

function setupProfileHandler() {
  const profileSelect = document.getElementById("investor-profile");
  if (!profileSelect) return;

  profileSelect.addEventListener("change", function () {
    selectedProfile = this.value;

    if (selectedProfile && allResults.length > 0) {
      atualizarCardMelhorPerfil();
      applyCurrentFilter();
    } else {
      resetProfileCard();
    }
  });
}

function setupForms() {
  document.addEventListener("submit", function (e) {
    if (e.target.id === "individual-form") {
      e.preventDefault();
      handleIndividualSimulation();
    }

    if (e.target.id === "comparative-form") {
      e.preventDefault();
      handleComparativeSimulation();
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target.closest("#export-csv")) {
      exportToCSV();
    }
  });
}

function setupComparativeInteractions() {
  document.addEventListener("click", function (e) {
    if (e.target.closest("#toggle-ranking")) {
      toggleRankingVisibility();
    }
  });
}

function setupReadingHelperToggle() {
  const toggleBtn = document.getElementById("reading-helper-toggle");
  const moreContent = document.getElementById("reading-helper-more");

  if (!toggleBtn || !moreContent) return;

  moreContent.classList.add("hidden");
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.textContent = "Ler mais";

  toggleBtn.addEventListener("click", function () {
    const isHidden = moreContent.classList.contains("hidden");

    if (isHidden) {
      moreContent.classList.remove("hidden");
      toggleBtn.textContent = "Ler menos";
      toggleBtn.setAttribute("aria-expanded", "true");
    } else {
      moreContent.classList.add("hidden");
      toggleBtn.textContent = "Ler mais";
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

function resetProfileCard() {
  document.getElementById("best-profile-name").textContent = "Selecione um perfil";
  document.getElementById("best-profile-value").textContent = "R$ 0,00";
  document.getElementById("profile-description").textContent = "Opção mais alinhada ao seu perfil";
}

function handleIndividualSimulation() {
  try {
    const formData = {
      initialAmount: parseCurrencyValue(document.getElementById("individual-initial").value),
      monthlyAmount: parseCurrencyValue(document.getElementById("individual-monthly").value),
      period: parseInt(document.getElementById("individual-period").value, 10) || 0,
      type: document.getElementById("individual-type").value,
      rate: parseFloat(document.getElementById("individual-rate").value) || 0
    };

    if (!validateIndividualForm(formData)) return;

    const selectedType = investmentTypes.find((type) => type.name === formData.type);
    if (!selectedType) {
      showToast("Tipo de investimento não encontrado");
      return;
    }

    const monthlyRate = calculateMonthlyRate(selectedType, formData.rate);
    const simulation = runSimulation(
      formData.initialAmount,
      formData.monthlyAmount,
      formData.period,
      monthlyRate,
      selectedType
    );

    displayIndividualResults(simulation, formData.type);
  } catch (error) {
    console.error("Erro na simulação individual:", error);
    showToast("Erro ao executar simulação.");
  }
}

function handleComparativeSimulation() {
  try {
    const formData = {
      initialAmount: parseCurrencyValue(document.getElementById("comparative-initial").value),
      monthlyAmount: parseCurrencyValue(document.getElementById("comparative-monthly").value),
      period: parseInt(document.getElementById("comparative-period").value, 10) || 0
    };

    if (!validateComparativeForm(formData)) return;

    selectedProfile = document.getElementById("investor-profile").value;
    if (!selectedProfile) {
      showToast("Selecione seu perfil de investidor");
      return;
    }

    allResults = [];

    investmentTypes.forEach((type) => {
      const monthlyRate = calculateMonthlyRate(type, type.defaultRate);
      const simulation = runSimulation(
        formData.initialAmount,
        formData.monthlyAmount,
        formData.period,
        monthlyRate,
        type
      );

      allResults.push({
        name: type.name,
        institution: type.institution,
        category: type.category,
        riskLevel: type.riskLevel,
        notes: type.notes || "",
        finalAmount: simulation.finalAmount,
        finalAmountNet: simulation.finalAmountNet,
        totalInvested: simulation.totalInvested,
        totalTaxes: simulation.totalTaxes,
        yield: simulation.yield,
        yieldNet: simulation.yieldNet,
        yearlyData: simulation.yearlyData,
        taxType: type.taxType,
        hasIOF: type.hasIOF
      });
    });

    allResults.sort((a, b) => b.finalAmountNet - a.finalAmountNet);
    bestGeneralOption = allResults[0] || null;

    displayComparativeResults();
  } catch (error) {
    console.error("Erro na simulação comparativa:", error);
    showToast("Erro ao executar comparação.");
  }
}

function calculateMonthlyRate(type, inputRate) {
  switch (type.frequency) {
    case "annual":
      return Math.pow(1 + inputRate / 100, 1 / 12) - 1;
    case "monthly":
      return inputRate / 100;
    case "cdi-percent": {
      const cdiMonthlyRate = Math.pow(1 + cdiRate, 1 / 12) - 1;
      return cdiMonthlyRate * (inputRate / 100);
    }
    default:
      return 0;
  }
}

function calculateIRRate(days) {
  for (const bracket of irTable) {
    if (days >= bracket.minDays && days <= bracket.maxDays) {
      return bracket.rate;
    }
  }
  return 0.15;
}

function calculateIOFRate(days) {
  if (days > 30) return 0;
  const iofData = iofTable.find((item) => item.day === days);
  return iofData ? iofData.rate : 0;
}

function calculateTaxes(grossReturn, days, taxType, hasIOF) {
  let irTax = 0;
  let iofTax = 0;

  if (taxType === "regressivo") {
    irTax = grossReturn * calculateIRRate(days);
  } else if (taxType === "acoes") {
    irTax = grossReturn * 0.15;
  }

  if (hasIOF && days <= 30) {
    iofTax = grossReturn * calculateIOFRate(days);
  }

  return {
    irTax,
    iofTax,
    totalTax: irTax + iofTax
  };
}

function runSimulation(initialAmount, monthlyAmount, periodYears, monthlyRate, investmentType) {
  const totalMonths = periodYears * 12;
  const totalDays = periodYears * 365;
  let balance = initialAmount;
  const yearlyData = [];
  let cumulativeInvested = initialAmount;
  let cumulativeInterest = 0;

  for (let year = 1; year <= periodYears; year++) {
    let yearlyInterest = 0;

    for (let month = 1; month <= 12; month++) {
      const monthlyInterest = balance * monthlyRate;
      balance += monthlyInterest;
      yearlyInterest += monthlyInterest;
      cumulativeInterest += monthlyInterest;

      balance += monthlyAmount;
      cumulativeInvested += monthlyAmount;
    }

    const taxes = calculateTaxes(
      cumulativeInterest,
      totalDays,
      investmentType.taxType,
      investmentType.hasIOF
    );

    yearlyData.push({
      year,
      invested: cumulativeInvested,
      interest: yearlyInterest,
      balance,
      balanceNet: balance - taxes.totalTax,
      taxes: taxes.totalTax
    });
  }

  const totalInvested = initialAmount + (monthlyAmount * totalMonths);
  const finalAmount = balance;
  const grossReturn = finalAmount - totalInvested;
  const finalTaxes = calculateTaxes(
    grossReturn,
    totalDays,
    investmentType.taxType,
    investmentType.hasIOF
  );
  const finalAmountNet = finalAmount - finalTaxes.totalTax;
  const netReturn = finalAmountNet - totalInvested;

  return {
    totalInvested,
    finalAmount,
    finalAmountNet,
    totalTaxes: finalTaxes.totalTax,
    yield: totalInvested > 0 ? (grossReturn / totalInvested) * 100 : 0,
    yieldNet: totalInvested > 0 ? (netReturn / totalInvested) * 100 : 0,
    yearlyData
  };
}

function updateRateField(type) {
  const rateInput = document.getElementById("individual-rate");
  const rateLabel = document.getElementById("individual-rate-label");
  if (!rateInput || !rateLabel) return;

  switch (type.frequency) {
    case "annual":
      rateInput.value = type.defaultRate.toFixed(2);
      rateLabel.textContent = "Taxa (% ao ano)";
      break;
    case "monthly":
      rateInput.value = type.defaultRate.toFixed(2);
      rateLabel.textContent = "Taxa (% ao mês)";
      break;
    case "cdi-percent":
      rateInput.value = type.defaultRate.toFixed(0);
      rateLabel.textContent = "Percentual do CDI (%)";
      break;
  }
}

function showInvestmentInfo(type) {
  const panel = document.getElementById("investment-info");
  const badge = document.getElementById("risk-badge");
  const description = document.getElementById("risk-description");
  const irInfo = document.getElementById("ir-info");
  const iofInfo = document.getElementById("iof-info");

  if (!panel) return;

  const riskInfo = riskLevels[type.riskLevel];

  if (riskInfo) {
    badge.textContent = riskInfo.name;
    badge.className = `risk-badge ${type.riskLevel.replace(/_/g, "-")}`;
    description.textContent = riskInfo.description;
  }

  switch (type.taxType) {
    case "regressivo":
      irInfo.textContent = "Tabela regressiva (22,5% a 15%)";
      irInfo.className = "tax-value status--warning";
      break;
    case "isento":
    case "dividendo_isento":
      irInfo.textContent = "Isento";
      irInfo.className = "tax-value status--success";
      break;
    case "acoes":
      irInfo.textContent = "15% sobre ganho capital";
      irInfo.className = "tax-value status--warning";
      break;
    default:
      irInfo.textContent = "Consulte legislação";
      irInfo.className = "tax-value status--info";
      break;
  }

  if (type.hasIOF) {
    iofInfo.textContent = "Aplicável nos primeiros 30 dias";
    iofInfo.className = "tax-value status--warning";
  } else {
    iofInfo.textContent = "Não aplicável";
    iofInfo.className = "tax-value status--success";
  }

  panel.classList.remove("hidden");
}

function hideInvestmentInfo() {
  const panel = document.getElementById("investment-info");
  if (panel) panel.classList.add("hidden");
}

function validateIndividualForm(data) {
  if (data.initialAmount < 0 || data.monthlyAmount < 0) {
    showToast("Os valores de aporte não podem ser negativos");
    return false;
  }

  if (data.period <= 0 || data.period > 50) {
    showToast("O prazo deve estar entre 1 e 50 anos");
    return false;
  }

  if (!data.type) {
    showToast("Selecione um tipo de investimento");
    return false;
  }

  if (data.rate <= 0) {
    showToast("A taxa deve ser maior que zero");
    return false;
  }

  if (data.initialAmount === 0 && data.monthlyAmount === 0) {
    showToast("Informe pelo menos um aporte (inicial ou mensal)");
    return false;
  }

  return true;
}

function validateComparativeForm(data) {
  if (data.initialAmount < 0 || data.monthlyAmount < 0) {
    showToast("Os valores de aporte não podem ser negativos");
    return false;
  }

  if (data.period <= 0 || data.period > 50) {
    showToast("O prazo deve estar entre 1 e 50 anos");
    return false;
  }

  if (data.initialAmount === 0 && data.monthlyAmount === 0) {
    showToast("Informe pelo menos um aporte (inicial ou mensal)");
    return false;
  }

  return true;
}

function displayIndividualResults(simulation, investmentType) {
  document.getElementById("individual-total-invested").textContent = formatCurrency(simulation.totalInvested);
  document.getElementById("individual-final-amount").textContent = formatCurrency(simulation.finalAmountNet);
  document.getElementById("individual-yield").textContent = `${simulation.yieldNet.toFixed(2)}%`;
  document.getElementById("individual-taxes").textContent = formatCurrency(simulation.totalTaxes);

  updateIndividualTable(simulation.yearlyData);
  updateIndividualChart(simulation.yearlyData, investmentType);

  document.getElementById("individual-results").classList.remove("hidden");
}

function updateIndividualTable(yearlyData) {
  const tbody = document.querySelector("#individual-table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  yearlyData.forEach((data) => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${data.year}</td>
      <td>${formatCurrency(data.invested)}</td>
      <td>${formatCurrency(data.interest)}</td>
      <td class="net-column">${formatCurrency(data.balanceNet)}</td>
      <td class="tax-column">${formatCurrency(data.taxes)}</td>
    `;
  });
}

function isTaxExempt(result) {
  return result.taxType === "isento" || result.taxType === "dividendo_isento";
}

function atualizarCardsMelhores(results) {
  const tbody = document.querySelector("#comparative-table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const visibleResults = rankingExpanded ? results : results.slice(0, 3);

  visibleResults.forEach((result, index) => {
    const investment = investmentTypes.find((inv) => inv.name === result.name);
    if (!investment) return;

    const riskInfo = riskLevels[investment.riskLevel];
    const taxIndicator = isTaxExempt(result)
      ? '<span class="status status--success">Isento IR</span>'
      : '<span class="status status--warning">Tribut. IR</span>';

    const institutionInfo = result.institution && result.institution !== "Geral" ? result.institution : "";
    const row = tbody.insertRow();

    row.innerHTML = `
      <td>${index + 1}º</td>
      <td>
        <div class="investment-cell">
          <div class="investment-main-row">
            <span class="type-indicator ${isTaxExempt(result) ? "type-indicator--exempt" : "type-indicator--taxed"}"></span>
            <span class="investment-name" title="${result.name}">${result.name}</span>
            ${taxIndicator}
          </div>
          ${institutionInfo ? `<div class="investment-meta">${institutionInfo}</div>` : ""}
        </div>
      </td>
      <td>
        <div class="risk-cell">
          <span class="risk-dot ${investment.riskLevel.replace(/_/g, "-")}"></span>
          <span class="risk-label">${riskInfo?.name || "-"}</span>
        </div>
      </td>
      <td class="net-column">${formatCurrency(result.finalAmountNet)}</td>
      <td>${result.yieldNet.toFixed(2)}%</td>
    `;

    if (index === 0) row.classList.add("rank-1");
    if (index === 1) row.classList.add("rank-2");
    if (index === 2) row.classList.add("rank-3");
  });

  const resultsCount = document.getElementById("results-count");
  if (resultsCount) {
    resultsCount.textContent = rankingExpanded
      ? `${results.length} investimentos`
      : `Mostrando 3 de ${results.length} investimentos`;
  }
}

function atualizarCardMelhorPerfil() {
  if (!selectedProfile || allResults.length === 0) {
    resetProfileCard();
    return;
  }

  const profileInfo = investorProfiles[selectedProfile];
  const allowedRisks = profileInfo.allowedRisks || [];
  const preferredRisks = profileInfo.preferredRisks || allowedRisks;

  const compatibleResults = allResults.filter((result) =>
    allowedRisks.includes(result.riskLevel)
  );

  if (compatibleResults.length === 0) {
    document.getElementById("best-profile-name").textContent = "Nenhum compatível";
    document.getElementById("best-profile-value").textContent = "R$ 0,00";
    document.getElementById("profile-description").textContent = "Nenhum investimento compatível com o perfil";
    return;
  }

  let prioritizedResults = compatibleResults.filter((result) =>
    preferredRisks.includes(result.riskLevel)
  );

  if (prioritizedResults.length === 0) {
    prioritizedResults = compatibleResults;
  }

  prioritizedResults.sort((a, b) => b.finalAmountNet - a.finalAmountNet);
  const bestForProfile = prioritizedResults[0];

  document.getElementById("best-profile-name").textContent = bestForProfile.name;
  document.getElementById("best-profile-value").textContent = formatCurrency(bestForProfile.finalAmountNet);
  document.getElementById("profile-description").textContent =
    `Maior resultado líquido entre as opções compatíveis com o perfil ${profileInfo.name.toLowerCase()}.`;
}

function applyCurrentFilter() {
  if (allResults.length === 0) return;

  let filteredResults = [...allResults];
  let titleSuffix = "";

  if (currentFilter === "profile" && selectedProfile) {
    const profileInfo = investorProfiles[selectedProfile];
    const allowedRisks = profileInfo.allowedRisks;
    filteredResults = allResults.filter((result) => allowedRisks.includes(result.riskLevel));
    titleSuffix = ` - Perfil ${profileInfo.name}`;
  }

  atualizarCardsMelhores(filteredResults);

  const tableTitle = document.getElementById("table-title");
  if (tableTitle) {
    tableTitle.textContent = `Ranking por Rentabilidade Líquida${titleSuffix}`;
  }
}

function displayComparativeResults() {
  if (bestGeneralOption) {
    document.getElementById("best-general-name").textContent = bestGeneralOption.name;
    document.getElementById("best-general-value").textContent = formatCurrency(bestGeneralOption.finalAmountNet);
  }

  rankingExpanded = false;

  const toggleButton = document.getElementById("toggle-ranking");
  if (toggleButton) toggleButton.textContent = "Exibir ranking completo";

  currentFilter = "all";
  atualizarCardMelhorPerfil();
  applyCurrentFilter();

  const resultsSection = document.getElementById("comparative-results");
  if (resultsSection) resultsSection.classList.remove("hidden");
}

function toggleRankingVisibility() {
  const button = document.getElementById("toggle-ranking");
  const rankingCard = document.getElementById("ranking-table-card");
  if (!button) return;

  rankingExpanded = !rankingExpanded;

  if (rankingExpanded) {
    button.textContent = "Recolher ranking";
    if (rankingCard) rankingCard.classList.remove("is-collapsed");
  } else {
    button.textContent = "Exibir ranking completo";
    if (rankingCard) rankingCard.classList.add("is-collapsed");
  }

  applyCurrentFilter();
}

function updateIndividualChart(yearlyData, investmentType) {
  const canvas = document.getElementById("individual-chart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (individualChart) {
    individualChart.destroy();
  }

  const labels = yearlyData.map((data) => `Ano ${data.year}`);
  const balanceData = yearlyData.map((data) => data.balanceNet);
  const investedData = yearlyData.map((data) => data.invested);

  individualChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Montante Líquido",
          data: balanceData,
          borderColor: "#1FB8CD",
          backgroundColor: "rgba(31, 184, 205, 0.1)",
          fill: true,
          tension: 0.4
        },
        {
          label: "Total Investido",
          data: investedData,
          borderColor: "#FFC185",
          backgroundColor: "rgba(255, 193, 133, 0.1)",
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `Evolução Líquida - ${investmentType}`
        },
        legend: {
          display: true,
          position: "bottom"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return formatCurrency(value);
            }
          }
        }
      }
    }
  });
}

function exportToCSV() {
  const table = document.getElementById("comparative-table");
  if (!table) return;

  const rows = Array.from(table.querySelectorAll("tr"));

  const csvContent = rows.map((row) => {
    const cols = Array.from(row.querySelectorAll("th, td"));
    return cols.map((col) => {
      const cleanText = col.textContent.trim().replace(/\s+/g, " ").replace(/"/g, '""');
      return `"${cleanText}"`;
    }).join(",");
  }).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "comparativo_investimentos_liquidos.csv");
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.classList.add("hidden"), 300);
    }, 3000);
  }
}

function initializeApp() {
  try {
    setupCurrencyMasks();
    setupTabNavigation();
    populateInvestmentTypes();
    setupInvestmentTypeHandler();
    setupProfileHandler();
    setupForms();
    setupComparativeInteractions();
    setupReadingHelperToggle();
    resetProfileCard();
  } catch (error) {
    console.error("Erro na inicialização:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}