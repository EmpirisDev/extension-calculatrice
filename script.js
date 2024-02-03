let input = document.getElementById("input"); // Sélection de l'élément d'entrée
let operators = Array.from(document.getElementsByClassName("operator")); // Sélection des boutons d'opérateurs
let numbers = Array.from(document.getElementsByClassName("operand")); // Sélection des boutons numériques
let reset = document.getElementById("reset"); // Sélection du bouton de réinitialisation
let calculate = document.getElementById("calculate"); // Sélection du bouton de calcul

// Variables pour stocker les opérandes et l'opérateur
let operand1 = "";
let operand2 = "";
let operator = "";

// Ajout de gestionnaires d'événements aux boutons d'opérateurs
operators.forEach((button) => {
  button.addEventListener("click", () => {
    if (!operator) {
      operator = button.value;
      input.value = operand1 + operator;
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

// Fonction pour calculer le résultat
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
    default:
      throw new Error("Opérateur inconnu : " + operator);
  }
}

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

document.getElementById("copy").addEventListener("click", function () {
  var result = document.getElementById("input").value;
  navigator.clipboard
    .writeText(result)
    .then(() => {
      // Succès - Afficher le message
      document.getElementById("copy-message").style.display = "block";

      // Masquer le message après quelques secondes (par exemple, 2 secondes)
      setTimeout(function () {
        document.getElementById("copy-message").style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Erreur lors de la copie : ", err);
      // Gérer l'erreur si la copie échoue
    });
});
