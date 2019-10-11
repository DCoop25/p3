function calculations() {
    
    //Passes string and returns float
    const team1TD = parseInt(document.querySelector('#teamOneTD').value)
    const team1FG = parseInt(document.querySelector('#teamOneFG').value)
    const team1SF = parseInt(document.querySelector('#teamOneSF').value)

    const team2TD = parseInt(document.querySelector('#teamTwoTD').value)
    const team2FG = parseInt(document.querySelector('#teamTwoFG').value)
    const team2SF = parseInt(document.querySelector('#teamTwoSF').value)
    
   const team1Total = (team1TD * 7) + (team1FG * 3) + (team1SF * 2);
   const team2Total = (team2TD * 7) + (team2FG * 3) + (team2SF * 2);

   if(team1Total > team2Total){
    document.querySelector('#WinningTeam').innerHTML =  "Team one!"

   }

   if(team1Total < team2Total){
    document.querySelector('#shortString').innerHTML =  "Team two!"

   }

   if (team1Total == team2Total){

    document.querySelector('#shortString').innerHTML =  "It's a....tie?"
   }

  
}

document.querySelector('#calculate-button').addEventListener('click', calculations)

function storage(){
    
    const teamOneTD= document.querySelector("#teamOneTD").value
    const teamOneFG = document.querySelector("#teamOneFG").value
    const teamOneSF = document.querySelector("#teamOneSF").value
    const teamTwoTD= document.querySelector("#teamTwoTD").value
    const teamTwoFG = document.querySelector("#teamTwoFG").value
    const teamTwoSF = document.querySelector("#teamTwoSF").value

    localStorage.setItem('Team one touchdown ',  teamOneTD)
    localStorage.setItem('Team one fieldgoal ',  teamOneFG)
    localStorage.setItem('Team one safety ',  teamOneSF)
    localStorage.setItem('Team two touchdown ',  teamTwoTD)
    localStorage.setItem('Team two fieldgoal ',  teamTwoFG)
    localStorage.setItem('Team two safety',  teamTwoSF)

   
}


const jokeURI = 'https://api.icndb.com/jokes/random?limitTo=[nerdy]'

// fetch information
const getJoke = async () => {
  try {
    const response = await fetch(jokeURI)
    const obj = await response.json()
    console.log(`FETCHED. Response JSON ${obj}`)
    const joke = obj.value.joke || 'No joke for you.'
    return joke
  } catch (error) { console.error(error) }
}

// interact with DOM
const updateWithJoke = async (event) => {
  try {
    document.querySelector('#result').innerHTML = ''
    const answer = await getJoke()
    document.querySelector('#result').innerHTML = answer
  } catch (error) { console.error(error) }
}


document.querySelector('#joke-button').addEventListener('click', getJoke)