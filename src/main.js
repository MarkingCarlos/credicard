import "./css/index.css"
import Imask from "imask"

const ccBgColor01 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) > path"
)
const ccBgColor02 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) > path"
)

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["white", "blue"],
    mastercard: ["orange", "red"],
    default: ["black", "white"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccBgColor01
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("default")

const segurityCode = document.querySelector("#security-code")
const segurityCodePattern = {
  mask: "000",
}
const segurityCodeMasked = Imask(segurityCode, segurityCodePattern)

const ccNumero = document.getElementById("card-number")
const NumeroPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, NumeroPattern) {
    var number = (NumeroPattern.value + appended).replace(/\D/g, "")
    const FoundMask = NumeroPattern.compiledMasks.find(({ regex }) =>
      number.match(regex)
    )

    return FoundMask
  },
}
const NumeroMasked = IMask(ccNumero, NumeroPattern)

NumeroMasked.on("accept", function () {
  const cardType = NumeroMasked.masked.currentMask.cardType
  setCardType(cardType)
  updateCardNumber(NumeroMasked.value)
})

function updateCardNumber(number) {
  const cardNumber = document.querySelector(".cc-number")
  cardNumber.innerText = number.length === 0 ? "0000 0000 0000 0000" : number
}

const ccNome = document.getElementById("card-holder")
ccNome.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    ccNome.value.length === 0 ? "Fulaninho de Tal" : ccNome.value
})

const ccExpiracao = document.getElementById("expiration-date")
const ExpiracaoPattern = {
  mask: "MM/YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const ExpiracaoMasked = IMask(ccExpiracao, ExpiracaoPattern)

ExpiracaoMasked.on("accept", function () {
  updateCardExpiry(ExpiracaoMasked.value)
})

function updateCardExpiry(expiry) {
  const cardExpiry = document.querySelector(".cc-extra .value")
  cardExpiry.innerText = expiry.length === 0 ? "00/00" : expiry
}

const addButton = document.getElementById("AddButton")
addButton.addEventListener("click", () => {})

segurityCodeMasked.on("accept", () => {
  updateSecurityCode(segurityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "000" : code
}
