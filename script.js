let input = document.getElementById("input");
let operators = Array.from(document.getElementsByClassName("operator"));
let numbers = Array.from(document.getElementsByClassName("operand"));
let reset = document.getElementById("reset");
let calculate = document.getElementById("calculate");
let scientificOperators = Array.from(document.getElementsByClassName("scientific-operator"));
let operand1 = "";
let operand2 = "";
let operator = "";

function calculateResult(operand1, operator, operand2) {
  operand1 = parseFloat(operand1);
  operand2 = parseFloat(operand2);

  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      if (operand2 !== 0) {
        return operand1 / operand2;
      } else {
        throw new Error("La division par zéro n'est pas autorisée.");
      }
    case "square":
      return Math.pow(operand1, 2);
    case "cube":
      return Math.pow(operand1, 3);
    case "sqrt":
      return Math.sqrt(operand1);
    case "log":
      return Math.log(operand1);
    case "sin":
      return Math.sin(operand1);
    case "cos":
      return Math.cos(operand1);
    case "tan":
      return Math.tan(operand1);
    case "exp":
      return Math.exp(operand1);
    default:
      throw new Error("Opérateur inconnu : " + operator);
  }
}

// Ajout de gestionnaires d'événements aux boutons d'opérateurs
operators.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.value === ".") {
      if (operator) {
        if (!operand2.includes(".")) {
          operand2 += button.value;
        }
      } else {
        if (!operand1.includes(".")) {
          operand1 += button.value;
        }
      }
      input.value = operand1 + operator + operand2;
    } else {
      if (!operator) {
        operator = button.value;
        input.value = operand1 + operator;
      }
    }
  });
});

// Ajout de gestionnaires d'événements aux boutons numériques
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (operator) {
      operand2 += button.value;
    } else {
      operand1 += button.value;
    }
    input.value = operand1 + operator + operand2;
  });
});

// Ajout d'un gestionnaire d'événements au bouton de réinitialisation
reset.addEventListener("click", () => {
  operand1 = "";
  operand2 = "";
  operator = "";
  input.value = "";
});
// Ajout d'un gestionnaire d'événements au bouton de calcul
calculate.addEventListener("click", () => {
  if (operand1 && operand2 && operator) {
    let result = calculateResult(operand1, operator, operand2);
    input.value = result;
    operand1 = result.toString();
    operand2 = "";
    operator = "";
  }
});

// Ajout de gestionnaires d'événements aux boutons d'opérateurs scientifiques
scientificOperators.forEach((button) => {
  button.addEventListener("click", () => {
    if (!operator && operand1) {
      operator = button.value;
      let result = calculateResult(operand1, operator);
      input.value = result;
      operand1 = result.toString();
      operand2 = "";
      operator = "";
    }
  });
});

// Support des Parenthèses
document.getElementById("open-parenthesis").addEventListener("click", function () {
  document.getElementById("input").value += "(";
});

document.getElementById("close-parenthesis").addEventListener("click", function () {
  document.getElementById("input").value += ")";
});

// Lorsque l'utilisateur clique sur le bouton de calcul
document.getElementById("calculate").addEventListener("click", function () {
  const operation = document.getElementById("input").value;
  try {
    const result = eval(operation);
    document.getElementById("input").value = result;
  } catch (error) {
    console.error("Invalid operation");
  }
});

document.getElementById("copy").addEventListener("click", function () {
  var result = document.getElementById("input").value;
  var copyMessage = document.getElementById("copy-message");
  navigator.clipboard
    .writeText(result)
    .then(() => {
      // Succès - Afficher le message à côté du bouton
      copyMessage.style.display = "inline";

      // Masquer le message après quelques secondes (par exemple, 2 secondes)
      setTimeout(function () {
        copyMessage.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Erreur lors de la copie : ", err);
    });
});
