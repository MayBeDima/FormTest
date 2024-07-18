const form = document.getElementById('form');
const agreement = form.querySelector('#agreement');
const success = form.querySelector('.success');

// Disabled submit btn

const submitBtn = form.querySelector('.form__btn');
agreement.addEventListener('change', (e) => {
  if (e.target.checked) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', 'disabled');
  }
})

// Validation NAME FIELD

const nameField = document.querySelector('.input-name-js');
const namePat = /^[А-Яа-яЁё]+$/;

function validName(inputMean, pat) {
  const errorText = inputMean.closest('.form__input-wrapper').querySelector('.error-text');
  if ((inputMean.value.length === 0)) {
    inputMean.classList.add('error');
    errorText.textContent = 'Поле обязательно для заполнения';
    return false;
  }
  else if (!pat.test(inputMean.value)) {
    inputMean.classList.add('error');
    errorText.textContent = 'Возможен ввод только русских букв';
    return false;
  }
  else {
    inputMean.classList.remove('error');
    errorText.textContent = '';
    return true;
  }
}
nameField.addEventListener('input', () => {
  validName(nameField, namePat);
})

// Validation EMAIL FIELD

const emailField = document.querySelector('.input-email-js');
const emailPat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function validEmail(inputMean, pat) {
  const errorText = inputMean.closest('.form__input-wrapper').querySelector('.error-text');
  if ((inputMean.value.length === 0)) {
    inputMean.classList.add('error');
    errorText.textContent = 'Поле обязательно для заполнения';
    return false;
  }
  else if (!pat.test(inputMean.value)) {
    inputMean.classList.add('error');
    errorText.textContent = 'Введите корректный e-mail';
    return false;
  }
  else {
    inputMean.classList.remove('error');
    errorText.textContent = '';
    return true;
  }
}
emailField.addEventListener('input', () => {
  validEmail(emailField, emailPat);
})

// Validation Phone field

const phoneField = document.querySelector('.input-phone-js');

function validPhone(inputMean) {
  const errorText = inputMean.closest('.form__input-wrapper').querySelector('.error-text');
  if ((inputMean.value.length === 0)) {
    inputMean.classList.add('error');
    errorText.textContent = 'Поле обязательно для заполнения';
    return false;
  }
  else if (inputMean.value.length < 18) {
    inputMean.classList.add('error');
    errorText.textContent = 'Введите номер целиком';
    return false;
  }
  else {
    inputMean.classList.remove('error');
    errorText.textContent = '';
    return true;
  }
}

phoneField.addEventListener('focus', () => {
  if (phoneField.value.length < 4) phoneField.value = '+7 ('
})

phoneField.addEventListener('input', () => {

  if (phoneField.value.includes('--')) {
    return
  }

  // not letter
  if (isNaN(+phoneField.value[phoneField.value.length - 1])) {
    phoneField.value = phoneField.value.slice(0, -1)
  }

  phoneField.value = phoneField.value.replace(/[^\0-9]/g, '');
  // mask
  if (phoneField.value.length === 8) {
    phoneField.value = phoneField.value.substring(0, phoneField.value.length - 1) + ') ' + phoneField.value.substring(phoneField.value.length - 1)
  }
  if (phoneField.value.length === 13) {
    phoneField.value = phoneField.value.substring(0, phoneField.value.length - 1) + '-' + phoneField.value.substring(phoneField.value.length - 1)
  }
  if (phoneField.value.length === 16) {
    phoneField.value = phoneField.value.substring(0, phoneField.value.length - 1) + '-' + phoneField.value.substring(phoneField.value.length - 1)
  }

  // max-length
  if (phoneField.value.length > 18) {
    phoneField.value = phoneField.value.slice(0, -1)
  }

  // min-length
  if (phoneField.value.length < 4) {
    phoneField.value = '+7 ('
  }

  validPhone(phoneField);
})

phoneField.addEventListener('blur', () => {
  if (phoneField.value.length === 4) phoneField.value = ''
  validPhone(phoneField);
})

// Validation CASH FIELD

const cashField = document.querySelector('.input-cash-js');

function validCash(inputMean) {
  const errorText = inputMean.closest('.form__input-wrapper').querySelector('.error-text');
  if ((inputMean.value.length === 0)) {
    inputMean.classList.add('error');
    errorText.textContent = 'Поле обязательно для заполнения';
    return false;
  }
  else {
    inputMean.classList.remove('error');
    errorText.textContent = '';
    return true;
  }
}
cashField.addEventListener('input', () => {
  if (cashField.value.indexOf(".") != '-1') {
    cashField.value = cashField.value.substring(0, cashField.value.indexOf(".") + 3);
  }
  validCash(cashField);
})

// Custom select
const industryField = document.querySelector('.input-select-js');
const selectList = document.querySelector('.select');
const selectItems = selectList.querySelectorAll('.select-item');

function validIndustry(inputMean) {
  const errorText = inputMean.closest('.form__input-wrapper').querySelector('.error-text');
  if ((inputMean.value.length === 0)) {
    inputMean.classList.add('error');
    errorText.textContent = 'Поле обязательно для заполнения';
    return false;
  }
  else {
    inputMean.classList.remove('error');
    errorText.textContent = '';
    return true;
  }
}

selectItems.forEach((e) => {
  e.addEventListener('click', () => {
    industryField.value = e.textContent;
  })
})

industryField.addEventListener('focus', () => {
  selectList.classList.add('active');
})

function closeSelect(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

industryField.addEventListener('blur', () => {
  closeSelect(100)
    .then(() => {
      selectList.classList.remove('active');
      validIndustry(industryField);
    })
})

// Send form

function serializeForm(formNode) {
  return new FormData(formNode);
}

function submit(data) {
  console.log(Array.from(data.entries()))
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // validation before submitting
  validName(nameField, namePat);
  validEmail(emailField, emailPat);
  validPhone(phoneField);
  validCash(cashField);
  validIndustry(industryField);

  const allValidElements = form.querySelectorAll('.form__input')
  const errFields = Array.from(allValidElements).filter((e) => e.classList.contains('error'));

  const data = serializeForm(form);

  if (!errFields.length) {
    submit(data)
    document.querySelectorAll('input').forEach((e) => {
      e.value = ''
    })
    document.querySelector('.form__checkbox').checked = false;
    submitBtn.setAttribute('disabled', 'disabled');
    success.classList.add('active')

    setTimeout(() => success.classList.remove('active'), 3000)
  }
})
