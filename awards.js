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
          <div class="flex flex-col items-center text-center gap-2 p-4 rounded-2xl border border-gray-100 bg-white/70 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-50 text-yellow-500 shrink-0 shadow-sm">
              <span class="text-sm">${getIcon(item.icon)}</span>
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-gray-800">${item.award}</h4>
            </div>
          </div>
            `

        stackcards+=card; 
    })

    document.getElementById('awards').innerHTML = stackcards;

    

}

loadAwards(); 