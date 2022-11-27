(() => {
    const apiAliveUrl = "https://data.kondratuka7.kyiv.ua/power.alive";
    const apiDeadUrl = "https://data.kondratuka7.kyiv.ua/power.dead";


    const drawContent = async() => {
       const alivePull = await fetch(apiAliveUrl);
       const aliveText = await alivePull.text();
       const aliveUnixTimestamp = parseInt(aliveText); 

       const deadPull = await fetch(apiDeadUrl);
       const deadText = await deadPull.text();
       const deadUnixTimestamp = parseInt(deadText);

       const powerIsAlive = aliveUnixTimestamp > deadUnixTimestamp; 

       const status = document.getElementById("power-status");
       status.innerText = powerIsAlive ? "світло є" : "світла немає";

       const lastChange = document.getElementById("last-change");
       if (powerIsAlive) {
          lastChange.innerText = deadUnixTimestamp > 0 ? `З’явилося після ${new Date(deadUnixTimestamp * 1000)}` : 'З’явилося невідомо коли';
       } else {
          lastChange.innerText = deadAliveTimestamp > 0 ? `Зникло після ${new Date(aliveUnixTimestamp * 1000)}` : 'З’явилося невідомо коли';
       }
       lastOn.innerText = new Date(unix_timestamp * 1000);
 
    } 

     document.addEventListener("DOMContentLoaded", drawContent);
})();
