function calculateFee() {
  const amount = parseFloat(document.getElementById("claimAmount").value);
  const arbitratorType = document.getElementById("arbitratorType").value;
  const extraExpenses = parseFloat(document.getElementById("extraExpenses").value) || 0;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid claim amount.");
    return;
  }

  let baseFee = 0;

  if (amount <= 500000) {
    baseFee = 45000;
  } else if (amount <= 2000000) {
    baseFee = 45000 + 0.035 * (amount - 500000);
  } else if (amount <= 10000000) {
    baseFee = 97500 + 0.03 * (amount - 2000000);
  } else if (amount <= 20000000) {
    baseFee = 337500 + 0.01 * (amount - 10000000);
  } else if (amount <= 200000000) {
    baseFee = 1237500 + 0.0075 * (amount - 10000000);
  } else {
    baseFee = 1987500 + 0.005 * (amount - 20000000);
    if (baseFee > 3000000) baseFee = 3000000;
  }

  let resultHTML = "";

  if (arbitratorType === "sole") {
    const soleFee = baseFee * 1.25;
    const total = soleFee + extraExpenses;
    const partyShare = total / 2;

    resultHTML = `
      <strong>Sole Arbitrator's Fee:</strong> ₹${soleFee.toLocaleString()}<br>
      <strong>Additional Expenses:</strong> ₹${extraExpenses.toLocaleString()}<br>
      <strong>Total (Fee + Expenses):</strong> ₹${total.toLocaleString()}<br>
      <strong>Each Party's Share:</strong> ₹${partyShare.toLocaleString()}
    `;
  } else {
    const totalTribunalFee = baseFee * 3;
    const total = totalTribunalFee + extraExpenses;
    const partyShare = total / 2;

    resultHTML = `
      <strong>Each Arbitrator's Fee:</strong> ₹${baseFee.toLocaleString()}<br>
      <strong>Total Tribunal Fee (3 Arbitrators):</strong> ₹${totalTribunalFee.toLocaleString()}<br>
      <strong>Additional Expenses:</strong> ₹${extraExpenses.toLocaleString()}<br>
      <strong>Total (Fee + Expenses):</strong> ₹${total.toLocaleString()}<br>
      <strong>Each Party's Share:</strong> ₹${partyShare.toLocaleString()}
    `;
  }

  document.getElementById("feeResult").innerHTML = resultHTML;
}

