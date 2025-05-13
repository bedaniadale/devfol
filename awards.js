const awards = [
    {
      "icon": "medal",
      "award": "Most Outstanding Graduating Student per Program"
    },
    {
      "icon": "medal",
      "award": "Most Outstanding On-the-Job Trainee per Program"
    },
    {
      "icon": "medal",
      "award": "Dean's Lister (2022-2024)"
    },
    {
      "icon": "medal",
      "award": "President's Lister"
    },
    {
      "icon": "trophy",
      "award": "Recipient of HAFRD - Academic Scholarship"
    },
    {
      "icon": "target",
      "award": "Code Geeks' President (A.Y 2023-2024)"
    }
  ]

  function getIcon(name) {
    switch (name) {
      case 'medal': return '🎖️';
      case 'trophy': return '🏆';
      case 'target': return '🎯';
      default: return '🏅';
    }
  }

function loadAwards() { 

    let stackcards = ''; 


    awards.forEach((item)=> { 
        let card = `
           <div class="flex flex-col items-center bg-yellow-100 rounded-xl text-center leading-none p-4">
                <!-- icon -->
                <h1 class="text-5xl"> ${getIcon(item.icon)} </h1>
                <h3 class="text-sm sm:text-md text-gray-500 ">${item.award} </h3>
                    
            </div>
            `


        stackcards+=card; 

    })

    document.getElementById('awards').innerHTML = stackcards;

    

}

loadAwards(); 