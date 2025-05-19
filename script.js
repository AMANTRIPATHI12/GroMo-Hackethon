const form = document.getElementById('recForm');
const resultDiv = document.getElementById('result');

let rules = [];

fetch('rules.json')
  .then(response => response.json())
  .then(data => {
    rules = data;
  })
  .catch(err => {
    console.error('Error loading rules:', err);
  });

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const age = document.getElementById('age').value;
  const location = document.getElementById('location').value;
  const pastPurchase = document.getElementById('pastPurchase').value;

  if (!age || !location || !pastPurchase) {
    resultDiv.innerHTML = '<p style="color:#ff6b6b;">Please select all fields.</p>';
    return;
  }

  // Find matching rule
  // First try exact match
  let matched = rules.find(rule =>
    rule.age === age &&
    rule.location === location &&
    rule.pastPurchase === pastPurchase
  );

  // If no exact, try location 'Others'
  if (!matched) {
    matched = rules.find(rule =>
      rule.age === age &&
      rule.location === "Others" &&
      rule.pastPurchase === pastPurchase
    );
  }

  // If still no match, fallback to something general
  if (!matched) {
    matched = {
      suggest: "Savings Account",
      pitch: "Start saving early to build your financial future!"
    };
  }

  resultDiv.innerHTML = `
    <h3>Recommended Product: <span style="color:#bb86fc;">${matched.suggest}</span></h3>
    <p>${matched.pitch}</p>
  `;
});
