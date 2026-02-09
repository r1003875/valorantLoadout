class Agent {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

class Weapon {
    constructor(name, image, type) {
        this.name = name;
        this.image = image;
        this.type = type; // primary or secondary
    }
}

class Armor {
    constructor(name, image) {
        this.name = name;
        this.image = image;
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

async function fetchAgents() {
    const res = await fetch(
        "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
    );
    const json = await res.json();
    return json.data;
}

async function fetchWeapons() {
    const res = await fetch(
        "https://valorant-api.com/v1/weapons"
    );
    const json = await res.json();
    return json.data;
}

async function fetchGear() {
    const res = await fetch(
        "https://valorant-api.com/v1/gear"
    );
    const json = await res.json();
    return json.data;
}
console.log(fetchGear());
console.log(fetchWeapons());
let agents = [];
async function initAgents() {
    const agentData = await fetchAgents();

    for (let i = 0; i < agentData.length; i++) {
        let agent = new Agent(
            agentData[i].displayName,
            agentData[i].fullPortrait
        );
        agents.push(agent);
    }

}
initAgents();
let selectedAgents = agents.map(agent => agent);


let noneWeapons = new Weapon("None", 'images/weapons/none.webp' ,"none");
let primaryWeapons = [noneWeapons];
let secondaryWeapons = [noneWeapons];
async function initWeapons() {
    const weaponData = await fetchWeapons();

    for (let i = 0; i < weaponData.length; i++) {
        let weapon = new Weapon(
            weaponData[i].displayName,
            weaponData[i].displayIcon,
            weaponData[i].category
        );
        if (weaponData[i].category === "EEquippableCategory::Sidearm") {
            secondaryWeapons.push(weapon);
        } else {
            primaryWeapons.push(weapon);
        }
    }

}
initWeapons();

let noneArmor = new Armor("None", 'images/armor/none.webp');
let armors = [noneArmor];
async function initGear() {
    const gearData = await fetchGear();

    for (let i = 0; i < gearData.length; i++) {
        let armor = new Armor(
            gearData[i].displayName,
            gearData[i].displayIcon
        );
        armors.push(armor);
    }

}
initGear();

let players = [];

function pickAgent(playerOwnedAgents) {
    let randomIndex = Math.floor(Math.random() * playerOwnedAgents.length);
    return playerOwnedAgents[randomIndex];
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
    let thisPlayerAgents = player.owned_agents;
    agents.forEach(agent => {
        if(thisPlayerAgents.some(thisPlayerAgents => thisPlayerAgents.name === agent.name)) {
            let agentDiv = document.createElement("article");
            agentDiv.className = "agent";
            agentDiv.innerHTML = `
                    <div class="image" style="background-image:url(${agent.image})"></div>
                    <p class="name">${agent.name}</p>
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
                    <p class="name">${agent.name}</p>
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
    let chosenAgents = [];
    for(let i = 0; i < players.length; i++) {
        let chosenAgent = pickAgent(players[i].owned_agents);
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
        setTimeout(() => {continueGeneration()}, 2000);    
});

function resetLoadout() {
    document.querySelector(".player_selection_step").classList.remove("hidden");
    document.querySelector(".player_selection_step .container").classList.remove("hidden");
    document.querySelector(".loadout_step").classList.add("hidden");
    loadoutContainer.innerHTML = "";
    document.querySelector("#saveAgents")
    if (!document.querySelector("#saveAgents").checked) {
        for(let i = 0; i < players.length; i++) {
            players[i].owned_agents = agents;
        }
    }
    let animation = document.querySelector(".loading_animation_inner");
    animation.style.width = "0px";
    document.querySelector(".player1_agent_selection_step").innerHTML = "";
    currentSelectedPlayer = 0;
    highestSelectedPlayer = 0;
    let summary = document.querySelector(".summary_step .header");
    summary.innerHTML = `<h2>Summary</h2>`;
}

let resetBtn = document.querySelector("#reset_btn");
resetBtn.addEventListener("click", resetLoadout);

function continueGeneration() {
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
                        <p class="name">${players[i].loadout.agent.name}</p>
                    </div>
            `;
            playerDiv.appendChild(agentDiv);
            let primaryDiv = document.createElement("article");
            primaryDiv.className = "loadout";
            primaryDiv.innerHTML = `
                    <h3>Primary</h3>
                    <div class="weapon">
                        <div class="image" style="background-image:url(${players[i].loadout.primary.image})"></div>
                        <p class="name">${players[i].loadout.primary.name}</p>
                    </div>
            `;
            playerDiv.appendChild(primaryDiv);
            let secondaryDiv = document.createElement("article");
            secondaryDiv.className = "loadout";
            secondaryDiv.innerHTML = `
                    <h3>Secondary</h3>
                    <div class="weapon">
                        <div class="image" style="background-image:url(${players[i].loadout.secondary.image})"></div>
                        <p class="name">${players[i].loadout.secondary.name}</p>
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
                        <p class="name">${players[i].loadout.armor.name}</p>
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
        else if((players.every(player => player.name !== playerNames[i].value)) && playerNames[i].value != "" && !players.every(player => player.index !== i+1)){
            players.splice(i, 1, new Player(playerNames[i].value, i+1));            
        }
        else if(playerNames[i].value == "" && !players.every(player => player.index != i+1)){
            players.splice(i, 1);
        }
    }
        console.log(players);
    if(players.length < 1) {
        document.querySelector(".player_amount_error").classList.remove("hidden");
        return;
    }
    else {
        document.querySelector(".player_amount_error").classList.add("hidden");
        for(let i = 0; i < players.length; i++) {
            let containerDiv = document.createElement("div");
            if(i === 0) {
                containerDiv.className = `container`;
                containerDiv.setAttribute(`data-id`, `${i}`)
                containerDiv.setAttribute(`id`, `container${i}`);
            }
            else {
                containerDiv.className = `container hidden`;
                containerDiv.setAttribute(`data-id`, `${i}`);
                containerDiv.setAttribute(`id`, `container${i}`);
            }
            containerDiv.innerHTML = `
                    <div class="mega_header">
                        <div class="small_btn back_btn" id="back${i}_btn" data-id="${i}">
                            <div class="small_animation_div"></div>
                            <span class="big_screen">Back</span>
                            <span class="small_screen hidden"><</span>
                        </div>            
                        <div class="header">
                            <h2>${players[i].name}, choose your agents!</h2>
                        </div>
                        <div class="small_btn proceed_btn" id="proceed${i}_btn" data-id="${i}">
                            <div class="small_animation_div"></div>
                            <span class="big_screen">Next</span>
                            <span class="small_screen hidden">></span>
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
                    let summary = document.querySelector(".summary_step .header");
                    for(let i = 0; i < players.length; i++) {
                        let summaryDiv = document.createElement("div");
                        summaryDiv.className = "summary_player";
                        summaryDiv.innerHTML = `
                            <h3 class="player_names_display">${players[i].name}</h3>
                            <div class="agents"></div>
                        `;
                        summary.appendChild(summaryDiv);
                        for(let j = 0; j < players[i].owned_agents.length; j++) {
                            let agentDiv = document.createElement("article");
                            agentDiv.className = "agent_small";
                            agentDiv.innerHTML = `
                                <div class="image_small" style="background-image:url(${players[i].owned_agents[j].image})"></div>
                                <p class="name">${players[i].owned_agents[j].name}</p>
                            `;
                            summaryDiv.querySelector(".agents").appendChild(agentDiv);
                        }
                    }
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
                                        let selectedAgent = agents.find(agent => agent.name === agentName);
                                        if (selectedAgent && !players[currentSelectedPlayer].owned_agents.some(agent => agent.name === selectedAgent.name)) {
                                            players[currentSelectedPlayer].owned_agents.push(selectedAgent);
                                        }
                                    } else {
                                        players[currentSelectedPlayer].owned_agents = players[currentSelectedPlayer].owned_agents.filter(agent => agent.name !== agentName);
                                    }
                                });
                            } 
                    }
                } 
}

fetch("https://api.github.com/repos/r1003875/valorantLoadout/commits/main")
  .then(res => res.json())
  .then(data => {
    const date = new Date(data.commit.committer.date);
    document.querySelector("#last_updated").textContent =
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
  });


/* ToDo:
- add ability generation


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

- add unselect all agents button
- add control check for enough agents for possible team combo

*/