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

const ccCvc = document.getElementById("security-code")
const CvcPattern = {
  mask: "000",
}
const CvcMasked = IMask(ccCvc, CvcPattern)

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
    console.log(FoundMask)
    return FoundMask
  },
}
const NumeroMasked = IMask(ccNumero, NumeroPattern)

const ccNome = document.getElementById("card-holder")
const NomePattern = {
  mask: "A{1,30} A{1,30}",
}
const NomeMasked = IMask(ccNome, NomePattern)

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
