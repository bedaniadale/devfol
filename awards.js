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
          <div class="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 transition-all duration-200 ease-out hover:border-gray-300">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-900 shrink-0 border border-gray-200">
                <span class="text-xs">${getIcon(item.icon)}</span>
              </div>
              <h4 class="text-xs font-semibold text-gray-700 leading-snug text-left">${item.award}</h4>
            </div>
          </div>
            `

        stackcards+=card; 
    })

    document.getElementById('awards').innerHTML = stackcards;

    

}

loadAwards(); 