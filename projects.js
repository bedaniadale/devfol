
let projects = [ 
    { 
        "title":"Holy Angel University IDMO Employee Portal",
        "desc": "Employee Portal for Holy Angel University, streamlining HR processes and data management.",
        "img": "works/hauoieidmo.png",
        "site": "hau-oie-idmo.com", 
        "role":['Full-Stack Developer', "UX/UI Designer"],
        "langs":['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
    },
    { 
        "title":"Kayantabe",
        "desc": "A dynamic volunteerism web platform designed to connect passionate individuals with local community initiatives.",
        "img": "works/kayantabe.png",
        "site": "kayantabe.com", 
        "role":['Full-Stack Developer', "Project Lead"],
        "langs":['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
    },
    { 
        "title":"Umbra",
        "desc": "A web application that connects students and parents with nearby tutors. It offers a seamless platform for finding, booking, and managing tutoring sessions—designed to make learning more accessible and personalized.",
        "img": "works/umbra.png",
        "site": "In progress", 
        "role":['Full-Stack Developer', "UX/UI Designer"],
        "langs":['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
    },
    { 
        "title":"IMMFI",
        "desc": "Implemented a modern, user-friendly layout using updated design principles and front-end technologies. Focused on enhancing the user experience while maintaining brand identity across all pages.",
        "img": "works/immfi.png",
        "site": "immfi.org", 
        "role":['UX/UI Designer', "Front-end Developer"],
        "langs":["Wordpress", "Elementor"],
    },

    { 
        "title":"Connect4 by Dale",
        "desc": "A web application that connects students and parents with nearby tutors. It offers a seamless platform for finding, booking, and managing tutoring sessions—designed to make learning more accessible and personalized.",
        "img": "works/connect4.png",
        "site": "bedaniadale.github.io/daleconnect4", 
        "role":['Full-Stack Developer'],
        "langs":["HTML", "CSS", "Javascript"],
    },
    { 
        "title":"GitHub DevFinder",
        "desc": "A web application that connects students and parents with nearby tutors. It offers a seamless platform for finding, booking, and managing tutoring sessions—designed to make learning more accessible and personalized.",
        "img": "works/devfinder.png",
        "site": "bedaniadale.github.io/devfinder", 
        "role":['Full-Stack Developer'],
        "langs":["HTML", "CSS", "Javascript"],
    },
   

]


function createRoles(arr){ 
    let stack = ''; 


    arr.forEach((item)=> { 
        let temp = ` 
         <span class="text-xs px-2 py-1 bg-red-100 text-red-500 rounded-full">${item}</span>
        `
        stack+=temp; 
    })

    return stack; 

}

function createLanguages(arr) { 
    let stack = ''; 


    arr.forEach((item)=> { 
        let temp = ` 
        <span class="text-xs px-2 py-1 bg-gray-600 text-white rounded-full">${item}</span>
        `
        stack+=temp; 
    })

    return stack; 
}


function integrateLink(site) { 
    if(site === "In progress") {
        return '#home' 
    } 

    return `https://${site}`; 
}

function checkTarget(site) { 
     if(site === "In progress") {
        return '' 
    } 

    return `_blank`; 
}

function loadProjects() { 
    let sprojects = ''; 

    projects.forEach(item => {

        const roles = createRoles(item.role); 
        const langs = createLanguages(item.langs); 
        
        
        let project = `
    <article class="group flex flex-col bg-white text-gray-800 rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-gray-300 transition-all duration-300">
      <!-- Image -->
      <div class="relative overflow-hidden">
        <img src="${item.img}" alt="${item.title}" loading="lazy" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>

      <!-- Content -->
      <div class="flex flex-col p-4 gap-3">
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">${item.title}</h3>
        <p class="text-sm text-gray-600 line-clamp-3">${item.desc}</p>

        <div class="flex flex-wrap gap-2 mt-1">
          ${roles}
          ${langs}
        </div>

        <div class="mt-2 flex items-center justify-between">
          <a href="${integrateLink(item.site)}" target="${checkTarget(item.site)}" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
            <span class="iconify" data-icon="mdi:link-variant" style="font-size: 1.1rem;"></span>
            <span class="truncate">${item.site}</span>
          </a>
          <span class="text-xs text-gray-400">View site</span>
        </div>
      </div>
    </article>
        `
        
        sprojects+=project
    });

    document.getElementById('projects').innerHTML = sprojects
  

}

loadProjects(); 