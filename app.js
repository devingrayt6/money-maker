let capital = 5000;
let totalModifier = 0;
let clickModifier = 1;

//player details
let player = {
  stocks: 0,
  realestate: 0,
  venture: 0,
  education: 0,
}

//asset details
let modifiers =
  [
    {
      name: 'stock',
      cost: 23,
      modifier: 0.5,
      type: 'passive',
    },
    {
      name: 'real estate',
      cost: 42,
      modifier: 1.75,
      type: 'passive',
    },
    {
      name: 'venture',
      cost: 168,
      modifier: 5.6,
      type: 'passive',
    },
    {
      name: 'education',
      cost: 150,
      modifier: 1.75,
      type: 'active',
    },
  ]
//global variables for modifiers
let stockMod = modifiers[0];
let realestateMod = modifiers[1];
let ventureMod = modifiers[2];
let educationMod = modifiers[3];

//targets
let capitalElem = document.getElementById('capital');
let stockElem = document.getElementById('stock-cost');
let ventureElem = document.getElementById('venture-cost');
let educationElem = document.getElementById('education-cost');
let realestateElem = document.getElementById('realestate-cost');
let stockAssets = document.getElementById('stock-count');
let realestateAssets = document.getElementById('realestate-count');
let ventureAssets = document.getElementById('venture-count');
let educationAssets = document.getElementById('education-count');
let educationBtn = document.getElementById('education-btn');
let stockBtn = document.getElementById('stock-btn');
let ventureBtn = document.getElementById('venture-btn');
let realestateBtn = document.getElementById('realestate-btn');


//handel click modifier
function clickIncrement() {
  incrementMoney(clickModifier);
}


//increment money based on modifier (num)
function incrementMoney(num) {
  capital += num;
  drawGame();
}

//purchase asset
function purchaseAsset(asset) {

  switch (asset) {
    case 'stock':
      totalModifier += stockMod.modifier;
      capital -= stockMod.cost;
      player.stocks += 1;
      break;
    case 'real estate':
      totalModifier += realestateMod.modifier;
      capital -= realestateMod.cost;
      player.realestate += 1;
      break;
    case 'venture':
      totalModifier += ventureMod.modifier;
      capital -= ventureMod.cost;
      player.venture += 1;
      break;
    case 'education':
      clickModifier += educationMod.modifier;
      capital -= educationMod.cost;
      //upgrade next purchase option
      educationMod.cost = (educationMod.cost * 2.45) + 5;
      educationMod.modifier = (educationMod.modifier * 1.03) + .5;
      player.education += 1;
      break;
  }
  drawGame();
}

function drawGame() {
  //update capital
  capitalElem.textContent = capital.toFixed(2).toString();
  //draw asset costs
  stockElem.textContent = stockMod.cost.toFixed(2).toString();
  realestateElem.textContent = realestateMod.cost.toFixed(2).toString();
  ventureElem.textContent = ventureMod.cost.toFixed(2).toString();
  //education can only be used up to 4 times
  educationElem.textContent = educationMod.cost.toFixed(2).toString();

  if (educationMod.cost > capital) {
    educationBtn.disabled = true;
  } else {
    educationBtn.disabled = '';
  }
  if (educationMod.cost > 2500) {
    educationBtn.style.display = 'none'
  }

  if (stockMod.cost > capital) {
    stockBtn.disabled = true;
  } else {
    stockBtn.disabled = '';
  }
  if (ventureMod.cost > capital) {
    ventureBtn.disabled = true;
  } else {
    ventureBtn.disabled = '';
  }
  if (realestateMod.cost > capital) {
    realestateBtn.disabled = true;
  } else {
    realestateBtn.disabled = '';
  }

  //draw player assets and upgrades
  //stocks
  player.stocks > 0 ? stockAssets.innerHTML = `<button class="btn btn-info" title="stock investment | total of $${(player.stocks * stockMod.modifier).toFixed(2)} per second"><i
  class="fas fa-chart-line"></i> : ${player.stocks}</button>` : null;
  //realestate
  player.realestate > 0 ? realestateAssets.innerHTML = `<button class="btn btn-info" title="real estate investment | total of $${(player.realestate * realestateMod.modifier).toFixed(2)} per second"><i class="fas fa-building"></i> : ${player.realestate}</button>` : null;
  //venture
  player.venture > 0 ? ventureAssets.innerHTML = `<button class="btn btn-info" title="Venture Business investment | total of $${(player.venture * ventureMod.modifier).toFixed(2)} per second"><i class="fas fa-crown"></i> : ${player.venture}</button>` : null;
  //education
  player.education > 0 ? educationAssets.innerHTML = `<button class="btn btn-info" title="Further education | total of $${(player.education * educationMod.modifier).toFixed(2)} per second"><i class="fas fa-graduation-cap"></i> : ${player.education}</button>` : null;
}


setInterval(() => {
  incrementMoney(totalModifier);
}, 1000);

drawGame();