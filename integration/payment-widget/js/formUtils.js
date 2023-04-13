const BUTTON_SIZES = {
  selector: '#buttonSize',
  options: ['small', 'medium', 'large'],
};
const WIDGET_THEME = {
  selector: '#theme',
  options: ['light', 'dark'],
};
const WIDGET_VARIANT = {
  selector: '#variant',
  options: ['dialog', 'popup', 'inline'],
};
const QUOTE_EXPIRE_ANIMATION = {
  selector: '#quoteExpireAnimation',
  options: ['skew', 'throb', 'shake'],
};
const FIAT_CURRENCY = {
  selector: '#fromFiat',
  options: ['USD', 'EUR', 'GBP'],
};

// prefilling select components
[
  BUTTON_SIZES,
  WIDGET_THEME,
  WIDGET_VARIANT,
  QUOTE_EXPIRE_ANIMATION,
  FIAT_CURRENCY,
].forEach((s) => {
  const selector = document.querySelector(s.selector);
  if (selector) {
    s.options.forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt;
      option.text = opt;
      selector.appendChild(option);
    });
  }
});

// setting default values from the config
Object.keys(remunoConfig).forEach((field) => {
  const selector = document.getElementById(field);
  if (selector) {
    if (typeof remunoConfig[field] === 'boolean') {
      selector.checked = remunoConfig[field];
    } else if (typeof remunoConfig[field] === 'object') {
      selector.value = JSON.stringify(remunoConfig[field]);
    } else {
      selector.value = remunoConfig[field];
    }
  }
});
setInitialSummary();

// check is valid json
function stringToJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return {};
  }
}

// get template element type
function formatElement(type, name) {
  switch (type) {
    case 'i':
      return { type: 'image', name };
    case 'd':
      return { type: 'decimal', name };
    default:
      return { type: 'variable', name };
  }
}

// format breakline template to pass only one backslash
function formatBreakline(string) {
  return string.replace(/\\(.)/g, (match, special) => {
    switch (special) {
      case 'n':
        return '\n';
      case 'r':
        return '\r';
      case 't':
        return '\t';
      default:
        return `\\${special}`;
    }
  });
}

// set initial custom message on quote template input value
function setInitialSummary() {
  const selector = document.getElementById('summaryTemplate');
  selector.value = remunoConfig.summary.template;
  parseTemplate(remunoConfig.summary.template);
}

// setter for coins
function handleSelectCoin(coin) {
  const isInList = remunoConfig.selectedCoins.includes(coin);
  if (isInList) {
    remunoConfig.selectedCoins = remunoConfig.selectedCoins.filter(
      (c) => c !== coin,
    );
  } else {
    remunoConfig.selectedCoins.push(coin);
  }
  updateWidget();
}

// get coins and set options to choose
function setCoinsList() {
  const selector = document.getElementById('selectedCoinsContainer');
  fetch(
    `https://api.remuno.com/v1/merchants/${remunoConfig.merchantId}/coins`,
    { headers: { 'x-api-key': remunoConfig.apiKey } },
  )
    .then((res) => res.json())
    .then((data) => {
      selector.innerHTML = '';
      data?.forEach((coin) => {
        const input = `<div>
             <label class="form-check-label" for="coins-${coin.displayName}">${coin.displayName}</label>
             <input className="form-check-input" onchange="handleSelectCoin('${coin.code}', this.checked)" type="checkbox"
                    role="switch" id="coins-${coin.displayName}">
          </div>`;
        selector.innerHTML += input;
      });
    });
}

// setter for custom message on quote template
function handleChangeSummaryTemplate(value) {
  remunoConfig.summary.template = value;
  parseTemplate(value);
  updateWidget();
}

// setter for custom message on quote variables
function handleSummaryVariableChange(field, value) {
  console.log(remunoConfig.summary);
  remunoConfig.summary.variables[field] = value;
  updateWidget();
}

// parse custom message on quote template to create input for each variable
function parseTemplate(template) {
  if (template) {
    const elements = template.match(/{[a-z]*:[^\s}]+}|{[^\s}]+}/g);
    const formattedElements = elements?.map((el) => {
      const result = /{([^}]*)}/.exec(el);
      const [type, name] = result[1].split(':');
      return formatElement(type, name || type);
    });
    const fields = formattedElements.map((el) => el.name);
    const container = document.getElementById('summaryVariables');
    container.innerHTML = '';
    formattedElements.forEach((el) => {
      const input = `<label class="form-check-label" for="summary-${el.name}">${
        el.name
      }, type: ${el.type}</label>
          <input 
            type="text" 
            class="form-control"
            value="${remunoConfig.summary.variables[el.name] || ''}"
            onchange="handleSummaryVariableChange('${el.name}', this.value)"
            id="summary-${el.name}">`;
      container.innerHTML += input;
    });
    remunoConfig.summary.variables = Object.fromEntries(
      Object.entries(remunoConfig.summary.variables).filter(([key]) =>
        fields.includes(key),
      ),
    );
  }
}

function handleCloseModal() {
  document.querySelector('.modal').classList.remove('show');
  document.querySelector('.modal').style.display = 'none';
}

// setter for all values
function handleChange(field, value) {
  switch (field) {
    case 'apiKey':
    case 'merchantId':
      localStorage.setItem(field, value);
      remunoConfig[field] = value;
      if (remunoConfig.apiKey && remunoConfig.merchantId) {
        setCoinsList();
      }
      break;
    case 'isEnabledCustomDetails':
      const customDetails = document.getElementById('customDetails');
      if (customDetails) {
        customDetails.style.display = value ? 'block' : 'none';
      }
      break;
    case 'isEnabledSummary':
      const summary = document.getElementById('summaryContainer');
      if (summary) {
        summary.style.display = value ? 'block' : 'none';
      }
      break;
    case 'isSelectedCoinsEnabled':
      const selectedCoins = document.getElementById('selectedCoinsContainer');
      if (selectedCoins) {
        selectedCoins.style.display = value ? 'block' : 'none';
      }
      break;
    default:
      remunoConfig[field] = value;
  }
  updateWidget();
}
