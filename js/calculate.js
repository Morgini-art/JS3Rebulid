let minDmg;
let maxDmg;
let weight;
let energyLightAttack;
let speedLightAttack;
let strength, agility, energy;
let resultsBox;
let armor = false;
let armorInput = document.getElementById('armor');
let armorValue;

function calculate()
{
//    console.log('I calculate...');
    
    //Weapon
    minDmg = document.getElementById('min-dmg').value;
    maxDmg = document.getElementById('max-dmg').value;
    weight = document.getElementById('weight').value;
    energyLightAttack = document.getElementById('energy-light-attack').value;
    speedLightAttack = document.getElementById('speed-light-attack').value;
    armorValue = document.getElementById('armor').value;
    resultsBox = document.getElementById('resultsbox');
    //Weapon
    
    //Hero
    //x = document.getElementById('x').value;
    energy = document.getElementById('energy').value;
    agility = document.getElementById('agility').value;
    strength = document.getElementById('strength').value;
    //Hero  
    
    //Algorytmy
    speedLightAttack = eval(speedLightAttack);
    energyLightAttack = eval(energyLightAttack);
    var realminDmg = minDmg-(weight/strength-1);
    var realmaxDmg = maxDmg-(weight/strength-1);
    if(armor) {
        var realSpeedLightAttack = speedLightAttack+(weight*100/agility) + armorValue * 100 / strength;
    } else {
        var realSpeedLightAttack = speedLightAttack+(weight*100/agility);
    }
    var realEnergyLightAttack = energyLightAttack+(weight*2/energy);
    
    resultsbox.innerHTML = `<h3>Wynik:</h3>`+`MinDMG:`+realminDmg+`<br>MaxDMG:`+realmaxDmg+`<br>`+`Szybkość Lekkiego Ataku:`+realSpeedLightAttack+`<br>`+`Energia - Lekki Atak:`+realEnergyLightAttack;
//    console.log(speedLightAttack+1);
}

function changeArmor()
{
    var doneIcon = document.getElementById('doneicon');
    armorInput = document.getElementById('armor');
    if (armor === true) {
        armor = false;
        doneIcon.classList.add('armorno');
        armorInput.setAttribute('disabled', true);
    } else {
        armor = true;
        doneIcon.classList.remove('armorno');
        armorInput.removeAttribute('disabled');
    };
    console.log(armor);
}