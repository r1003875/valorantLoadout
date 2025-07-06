class Agent {
    constructor(name, display_name) {
        this.name = name;
        this.image = `./images/agents/${name}.webp`;
        this.display_name = display_name;
    }
}

class Weapon {
    constructor(name, display_name, type) {
        this.name = name;
        this.image = `./images/weapons/${name}.webp`;
        this.display_name = display_name;
        this.type = type; // priamry or secondary
    }
}

class Armor {
    constructor(name, display_name) {
        this.name = name;
        this.image = `./images/armor/${name}.webp`;
        this.display_name = display_name;
    }
}

class Loadout {
    constructor(agent, primary, secondary, armor) {
        this.agent = agent;
        this.primary = primary;
        this.secondary = secondary;
        this.armor = armor;
    }
}

class Player {
    constructor(name, index) {
        this.name = name;
        this.index = index;
        this.loadout;
        this.owned_agents = agents;
    }
}

let astra = new Agent("astra", "Astra");
let breach = new Agent("breach", "Breach");
let brimstone = new Agent("brimstone", "Brimstone");
let chamber = new Agent("chamber", "Chamber");
let clove = new Agent("clove", "Clove");
let cypher = new Agent("cypher", "Cypher");
let deadlock = new Agent("deadlock", "Deadlock");
let fade = new Agent("fade", "Fade");
let gekko = new Agent("gekko", "Gekko");
let harbor = new Agent("harbor", "Harbor");
let iso = new Agent ("iso", "Iso");
let jett = new Agent("jett", "Jett");
let kayo = new Agent("kayo", "KAY/O");
let killjoy = new Agent("killjoy", "Killjoy");
let neon = new Agent("neon", "Neon");
let omen = new Agent("omen", "Omen");
let phoenix = new Agent("phoenix", "Phoenix");
let raze = new Agent("raze", "Raze");
let reyna = new Agent("reyna", "Reyna");
let sage = new Agent("sage", "Sage");
let skye = new Agent("skye", "Skye");
let sova = new Agent("sova", "Sova");
let tejo = new Agent("tejo", "Tejo");
let viper = new Agent("viper", "Viper");
let vyse = new Agent("vyse", "Vyse");
let waylay = new Agent("waylay", "Waylay");
let yoru = new Agent("yoru", "Yoru");

let agents = [astra, breach, brimstone, chamber, clove, cypher, deadlock, fade, gekko, harbor, iso, jett, kayo, killjoy, neon, omen, phoenix, raze, reyna, sage, skye, sova, tejo, viper, vyse, waylay, yoru];
let selectedAgents = agents.map(agent => agent);

let ares = new Weapon("ares", "Ares", "primary");
let bucky = new Weapon("bucky", "Bucky", "primary");
let bulldog = new Weapon("bulldog", "Bulldog", "primary");
let classic = new Weapon("classic", "Classic", "secondary");
let frenzy = new Weapon("frenzy", "Frenzy", "secondary");
let ghost = new Weapon("ghost", "Ghost", "secondary");
let guardian = new Weapon("guardian", "Guardian", "primary");
let judge = new Weapon("judge", "Judge", "primary");
let marshal = new Weapon("marshal", "Marshal", "primary");
let odin = new Weapon("odin", "Odin", "primary");
let operator = new Weapon("operator", "Operator", "primary");
let outlaw = new Weapon("outlaw", "Outlaw", "primary");
let phantom = new Weapon("phantom", "Phantom", "primary");
let sheriff = new Weapon("sheriff", "Sheriff", "secondary");
let shorty = new Weapon("shorty", "Shorty", "secondary");
let spectre = new Weapon("spectre", "Spectre", "primary");
let stinger = new Weapon("stinger", "Stinger", "primary");
let vandal = new Weapon("vandal", "Vandal", "primary");

let none = new Weapon("none", "None", "none");

let primaryWeapons = [ares, bucky, bulldog, guardian, judge, marshal, odin, operator, outlaw, phantom, spectre, stinger, vandal, none];
let secondaryWeapons = [classic, frenzy, ghost, sheriff, shorty, none];

let melee = new Weapon("melee", "Melee", "melee");

let lightArmor = new Armor("light_armor", "Light Armor");
let regenShield = new Armor("regen_shield", "Regen Shield");
let heavyArmor = new Armor("heavy_armor", "Heavy Armor");

let armors = [lightArmor, regenShield, heavyArmor];

let players = [];

function pickAgent() {
    let randomIndex = Math.floor(Math.random() * selectedAgents.length);
    return selectedAgents[randomIndex];
}

function pickPrimary() {
    let randomIndex = Math.floor(Math.random() * primaryWeapons.length);
    return primaryWeapons[randomIndex];
}

function pickSecondary() {
    let randomIndex = Math.floor(Math.random() * secondaryWeapons.length);
    return secondaryWeapons[randomIndex];
}

function pickArmor() {
    let randomIndex = Math.floor(Math.random() * armors.length);
    return armors[randomIndex];
}


function loadAgents(player){
    /*
    let agentContainer = document.querySelector(".agent_selection");
    agents.forEach(agent => {
        if(selectedAgents.some(selectedAgent => selectedAgent.name === agent.name)) {
            let agentDiv = document.createElement("article");
            agentDiv.className = "agent";
            agentDiv.innerHTML = `
                    <div class="image" style="background-image:url(${agent.image})"></div>
                    <p class="name">${agent.display_name}</p>
                    <div class="checkbox-wrapper-10">
                        <input class="tgl tgl-flip" id="${agent.name}_box" type="checkbox" checked value="${agent.name}"/>
                        <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="${agent.name}_box"></label>
                    </div>
            `;
            agentContainer.appendChild(agentDiv);        
        }
        else{
            let agentDiv = document.createElement("article");
            agentDiv.className = "agent";
            agentDiv.innerHTML = `
                    <div class="image" style="background-image:url(${agent.image})"></div>
                    <p class="name">${agent.display_name}</p>
                    <div class="checkbox-wrapper-10">
                        <input class="tgl tgl-flip" id="${agent.name}_box" type="checkbox" value="${agent.name}"/>
                        <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="${agent.name}_box"></label>
                    </div>
            `;
            agentContainer.appendChild(agentDiv);  
        }
            

    });
    */
    let thisPlayerAgents = player.owned_agents;
    agents.forEach(agent => {
        if(thisPlayerAgents.some(thisPlayerAgents => thisPlayerAgents.name === agent.name)) {
            let agentDiv = document.createElement("article");
            agentDiv.className = "agent";
            agentDiv.innerHTML = `
                    <div class="image" style="background-image:url(${agent.image})"></div>
                    <p class="name">${agent.display_name}</p>
                    <div class="checkbox-wrapper-10">
                        <input class="tgl tgl-flip" id="${agent.name}_box_player_${player.index}" type="checkbox" checked value="${agent.name}"/>
                        <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="${agent.name}_box_player_${player.index}"></label>
                    </div>
            `;
            document.querySelector(`.player${player.index}_agent_selection`).appendChild(agentDiv);  
        }
        else{
            let agentDiv = document.createElement("article");
            agentDiv.className = "agent";
            agentDiv.innerHTML = `
                    <div class="image" style="background-image:url(${agent.image})"></div>
                    <p class="name">${agent.display_name}</p>
                    <div class="checkbox-wrapper-10">
                        <input class="tgl tgl-flip" id="${agent.name}_box_player_${player.index}" type="checkbox" value="${agent.name}"/>
                        <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="${agent.name}_box_player_${player.index}"></label>
                    </div>
            `;
            document.querySelector(`.player${player.index}_agent_selection`).appendChild(agentDiv);
        }
            

    });
    
}



let loadoutContainer = document.querySelector(".allLoadouts");

let generateBtn = document.querySelector("#generate_btn");
generateBtn.addEventListener("click", () => {
    /*
    if(selectedAgents.length === 0) {
        document.querySelector(".agent_amount_error").classList.remove("hidden");
        return;
    }
    else {
        document.querySelector(".agent_amount_error").classList.add("hidden");
        let chosenAgent = pickAgent();
        let chosenPrimary = pickPrimary();
        let chosenSecondary = pickSecondary();
        let  chosenArmor = pickArmor();
        //let chosenLoadout = new Loadout(chosenAgent, chosenPrimary, chosenSecondary);
        document.querySelector(".player1_agent_selection_step").classList.add("hidden");
        let animation = document.querySelector(".loading_animation_inner");
        document.querySelector(".generating_step").classList.remove("hidden");
        requestAnimationFrame(() => {animation.style.width = "400px";});
        setTimeout(() => {continueGeneration(chosenAgent, chosenPrimary, chosenSecondary, chosenArmor)}, 2000);
        }
        */
    let chosenAgents = [];
    for(let i = 0; i < players.length; i++) {
        let chosenAgent = pickAgent();
        if(chosenAgents.some(agent => agent.name === chosenAgent.name)) {
            i--;
            continue;
        }
        chosenAgents.push(chosenAgent);
        let chosenPrimary = pickPrimary();
        let chosenSecondary = pickSecondary();
        let  chosenArmor = pickArmor();   
        let chosenLoadout = new Loadout(chosenAgent, chosenPrimary, chosenSecondary, chosenArmor);    
        players[i].loadout = chosenLoadout;

    }
        document.querySelector(".player1_agent_selection_step").classList.add("hidden");
        let animation = document.querySelector(".loading_animation_inner");
        document.querySelector(".generating_step").classList.remove("hidden");
        requestAnimationFrame(() => {animation.style.width = "400px";});
        document.querySelector(".summary_step").classList.add("hidden");
        setTimeout(() => {continueGeneration(/*chosenAgent, chosenPrimary, chosenSecondary, chosenArmor*/)}, 2000);    
});

function resetLoadout() {
    document.querySelector(".player_selection_step").classList.remove("hidden");
    document.querySelector(".player_selection_step .container").classList.remove("hidden");
    //document.querySelector(".player1_agent_selection_step").classList.remove("hidden");
    document.querySelector(".loadout_step").classList.add("hidden");
    loadoutContainer.innerHTML = "";
    document.querySelector("#saveAgents")
    if (!document.querySelector("#saveAgents").checked) {
        for(let i = 0; i < players.length; i++) {
            players[i].owned_agents = agents;
        }
    }
    /*
    agentCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    */
    let animation = document.querySelector(".loading_animation_inner");
    animation.style.width = "0px";
    document.querySelector(".player1_agent_selection_step").innerHTML = "";
    //document.querySelector(".summary_step").innerHTML = "";
    currentSelectedPlayer = 0;
    highestSelectedPlayer = 0;
}

let resetBtn = document.querySelector("#reset_btn");
resetBtn.addEventListener("click", resetLoadout);

function continueGeneration(/*chosenAgent, chosenPrimary, chosenSecondary, chosenArmor*/) {
        document.querySelector(".generating_step").classList.add("hidden");
        document.querySelector(".loadout_step").classList.remove("hidden");
        for(let i = 0; i < players.length; i++) {
            let playerDiv = document.createElement("div");
            playerDiv.className = "displayLoadout";
            playerDiv.innerHTML = `<h3 class="player_names_display">${players[i].name}</h3>`;
            let agentDiv = document.createElement("article");
            agentDiv.className = "loadout";
            agentDiv.innerHTML = `
                    <h3>Agent</h3>
                    <div class="agent">
                        <div class="image" style="background-image:url(${players[i].loadout.agent.image})"></div>
                        <p class="name">${players[i].loadout.agent.display_name}</p>
                    </div>
            `;
            playerDiv.appendChild(agentDiv);
            let primaryDiv = document.createElement("article");
            primaryDiv.className = "loadout";
            primaryDiv.innerHTML = `
                    <h3>Primary</h3>
                    <div class="weapon">
                        <div class="image" style="background-image:url(${players[i].loadout.primary.image})"></div>
                        <p class="name">${players[i].loadout.primary.display_name}</p>
                    </div>
            `;
            playerDiv.appendChild(primaryDiv);
            let secondaryDiv = document.createElement("article");
            secondaryDiv.className = "loadout";
            secondaryDiv.innerHTML = `
                    <h3>Secondary</h3>
                    <div class="weapon">
                        <div class="image" style="background-image:url(${players[i].loadout.secondary.image})"></div>
                        <p class="name">${players[i].loadout.secondary.display_name}</p>
                    </div>
            `;
            playerDiv.appendChild(secondaryDiv);
            let armorDiv = document.createElement("article");
            armorDiv.className = "loadout";
            armorDiv.innerHTML = `
                    <h3>Armor</h3>
                    <div class="armor">
                        <div class="image_background">
                            <div class="image" style="background-image:url(${players[i].loadout.armor.image});"></div>
                        </div>
                        <p class="name">${players[i].loadout.armor.display_name}</p>
                    </div>
            `;
            playerDiv.appendChild(armorDiv);   
            loadoutContainer.appendChild(playerDiv);               
        }

}
let currentSelectedPlayer = 0;
let highestSelectedPlayer = 0;
let nextBtn = document.querySelector("#next_btn");
nextBtn.addEventListener("click", () => {
    let playerNames = document.querySelectorAll(".player_name");
    for(let i = 0; i < playerNames.length; i++) {
        if(playerNames[i].value != "" && players.every(player => player.index !== i+1)){
            players.push(new Player(playerNames[i].value, i+1));
        }
        else if((players.every(player => player.name !== playerNames[i].value)) && !players.every(player => player.index !== i+1)){
            players.splice(i, 1, new Player(playerNames[i].value, i+1));
        }
        else if(playerNames[i].value != "" && !players.every(player => player.index !== i+1)){
            players.splice(i, 1);
        }
    }
    if(players.length < 1) {
        document.querySelector(".player_amount_error").classList.remove("hidden");
        return;
    }
    else {
        for(let i = 0; i < players.length; i++) {
            let containerDiv = document.createElement("div");
            if(i === 0) {
                containerDiv.className = `container data-id="${i}"`;
                containerDiv.setAttribute(`id`, `container${i}`);
            }
            else {
                containerDiv.className = `container data-id="${i} hidden"`;
                containerDiv.setAttribute(`id`, `container${i}`);
            }
            containerDiv.innerHTML = `
                    <div class="mega_header">
                        <div class="small_btn back_btn"id="back${i}_btn" data-id="${i}">
                            <div class="small_animation_div"></div>
                            <span>Back</span>
                        </div>            
                        <div class="header">
                            <h2>${players[i].name}, choose your agents!</h2>
                        </div>
                        <div class="small_btn proceed_btn"id="proceed${i}_btn" data-id="${i}">
                            <div class="small_animation_div"></div>
                            <span>Next</span>
                        </div> 
                    </div>
                    <p class="error hidden agent_amount_error">You haven't selected any agents!</p>            
                    <div class="player${players[i].index}_agent_selection agent_selection" id="agent_selection_${i}"></div>
            `
            document.querySelector(".player1_agent_selection_step").appendChild(containerDiv);
            loadAgents(players[i]);

            document.querySelector(".player1_agent_selection_step").classList.remove("hidden");
            document.querySelector(".player_selection_step").classList.add("hidden");


        }
            let back_btns = document.querySelectorAll(".back_btn");
            for(let l = 0; l < back_btns.length; l++) {
                back_btns[l].addEventListener("click", () => {
                if(back_btns[l].dataset.id == "0") {
                    document.querySelector(".player1_agent_selection_step").classList.add("hidden");
                    document.querySelector(".player1_agent_selection_step").innerHTML = "";
                    document.querySelector(".player_selection_step").classList.remove("hidden");
                    document.querySelector(".player_selection_step .container").classList.remove("hidden");
                    players = [];
                    currentSelectedPlayer = 0;
                }
                else {
                    document.querySelector(`#container${currentSelectedPlayer-1}`).classList.remove("hidden");
                    document.querySelector(`#container${currentSelectedPlayer}`).classList.add("hidden");
                    document.querySelector(`.container:nth-child(${parseInt(back_btns[l].dataset.id) + 1})`).classList.add("hidden");
                    currentSelectedPlayer--;
                    //document.querySelector(".player1_agent_selection_step").classList.remove("hidden");
                }
                });
            }
            let proceed_btns = document.querySelectorAll(".proceed_btn");
            for(let m = 0; m < proceed_btns.length; m++) {
                proceed_btns[m].addEventListener("click", () => {
                if(players[currentSelectedPlayer].owned_agents.length === 0) {
                    document.querySelector(".agent_amount_error").classList.remove("hidden");
                    return;
                } 
                else{document.querySelector(".agent_amount_error").classList.add("hidden");}  
                if(proceed_btns[m].dataset.id == players.length-1) {
                    document.querySelector(".player1_agent_selection_step").classList.add("hidden");
                    document.querySelector(".player1_agent_selection_step").innerHTML = "";
                    document.querySelector(".summary_step").classList.remove("hidden");
                    console.log(players);
                }
                else {
                    document.querySelector(`#container${currentSelectedPlayer+1}`).classList.remove("hidden");
                    document.querySelector(`#container${currentSelectedPlayer}`).classList.add("hidden");
                    document.querySelector(`.container:nth-child(${parseInt(proceed_btns[m].dataset.id) + 1})`).classList.add("hidden");
                    currentSelectedPlayer++;
                    highestSelectedPlayer++;
                    if(currentSelectedPlayer == highestSelectedPlayer) {
                        checkAgents();
                    }
                    
                    //document.querySelector(".player1_agent_selection_step").classList.remove("hidden");
                }
                });
            }     
            checkAgents();
    }
});

function  checkAgents(){
                     for(let g = 0; g< players.length; g++) {
                    if(g === currentSelectedPlayer){
                            let agentCheckboxes = document.querySelectorAll(`#container${currentSelectedPlayer} .agent input[type='checkbox']`);
                            for(let k = 0; k < agentCheckboxes.length; k++) {
                                agentCheckboxes[k].addEventListener("change", (e) => {
                                    let agentName = e.target.value;
                                    if (e.target.checked) {
                                        /*
                                        for (let j = 0; j < agents.length; j++) {
                                            if (agents[j].name === agentName) {
                                                players[currentSelectedPlayer].owned_agents.push(agents[j]);
                                            }}*/
                                        let selectedAgent = agents.find(agent => agent.name === agentName);
                                        if (selectedAgent && !players[currentSelectedPlayer].owned_agents.some(agent => agent.name === selectedAgent.name)) {
                                            players[currentSelectedPlayer].owned_agents.push(selectedAgent);
                                        }
                                    } else {
                                        //players[currentSelectedPlayer].owned_agents = players[currentSelectedPlayer].owned_agents.filter(agent => agent.name !== agentName);
                                        players[currentSelectedPlayer].owned_agents = players[currentSelectedPlayer].owned_agents.filter(agent => agent.name !== agentName);
                                    }
                                });
                            } 
                    }
                } 
}




/* ToDo:
add ability generation
add team generation


            let agentCheckboxes = document.querySelectorAll(`#container${i} .agent input[type='checkbox']`);
            for(let k = 0; k < agentCheckboxes.length; k++) {
                agentCheckboxes[k].addEventListener("change", (e) => {
                    let agentName = e.target.value;
                    if (e.target.checked) {
                        for (let j = 0; j < agents.length; j++) {
                            if (agents[j].name === agentName) {
                                players[i].owned_agents.push(agents[j]);
                            }}
                    } else {
                        players[i].owned_agents = players[i].owned_agents.filter(agent => agent.name !== agentName);
                    }
                    console.log(players[i].name, players[i].owned_agents);
                });
            }
*/