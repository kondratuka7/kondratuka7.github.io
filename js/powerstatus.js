(() => {
    const apiAliveUrl = "https://data.kondratuka7.kyiv.ua/power.alive";
    const apiDeadUrl = "https://data.kondratuka7.kyiv.ua/power.dead";
    const apiPollUrl = "https://data.kondratuka7.kyiv.ua/power.date";

    const formatedTimestamp = (unixTimestamp)=> {
         if (unixTimestamp <  2000000000) {
             unixTimestamp = unixTimestamp * 1000;
         }
        const d = new Date(unixTimestamp);
        const date = d.toISOString().split('T')[0];
        const time = d.toTimeString().split(' ')[0];
        return `${date} ${time}`
    }

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
          lastChange.innerText = deadUnixTimestamp > 0 ? `З’явилося після ${formatedTimestamp(deadUnixTimestamp)}` : 'З’явилося невідомо коли';
       } else {
          lastChange.innerText = aliveUnixTimestamp > 0 ? `Зникло після ${formatedTimestamp(aliveUnixTimestamp)}` : 'Зникло невідомо коли';
       }

       const pollDate = await fetch(apiPollUrl);
       const pollText = await pollDate.text();
       const pollUnixTimestamp = parseInt(pollText);
       const lastPoll = document.getElementById("last-poll");
       lastPoll.innerText = pollUnixTimestamp > 0 ? `Остання перевірка була ${formatedTimestamp(pollUnixTimestamp)}` : '';
    } 
     document.addEventListener("DOMContentLoaded", drawContent);
     window.setInterval(drawContent, 60000);
})();
