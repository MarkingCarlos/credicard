import "./css/index.css"

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
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("mastercard")
