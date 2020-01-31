let capital = 0;
let totalModifier = 0;

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
      cost: 32,
      modifier: 0.75,
      type: 'passive',
    },
    {
      name: 'venture',
      cost: 68,
      modifier: 1,
      type: 'passive',
    },
    {
      name: 'education',
      cost: 50,
      modifier: 1.5,
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
let realestateElem = document.getElementById('realestate-cost');
let playerAssets = document.getElementById('user-assets');

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
      totalModifier += educationMod.modifier;
      capital -= educationMod.cost;
      //upgrade next purchase option
      educationMod.cost = (stockMod.cost * 2.45) + 5;
      educationMod.modifier = (stockMod.modifier * 1.03) + .5;
      player.education += 1;
      break;
  }
  console.log(totalModifier);
  drawGame();
}

function drawGame() {
  //update capital
  capitalElem.textContent = capital.toFixed(2).toString();
  //draw asset costs
  stockElem.textContent = stockMod.cost.toFixed(2).toString();
  realestateElem.textContent = realestateMod.cost.toFixed(2).toString();
  //draw player assets and upgrades
  //stocks
  player.stocks > 0 ? playerAssets.innerHTML = `<button class="btn btn-info" title="stock investment | total of $${player.stocks * stockMod.modifier} per second"><i
  class="fas fa-chart-line"></i> : ${player.stocks}</button>` : null;
  //realestate
  player.realestate > 0 ? playerAssets.innerHTML = `<button class="btn btn-info" title="real estate investment | total of $${player.realestate * realestateMod.modifier} per second"><i class="fas fa-building"></i> : ${player.stocks}</button>` : null;
}


setInterval(() => {
  incrementMoney(totalModifier);
}, 1000);

drawGame();