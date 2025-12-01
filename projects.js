
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
        "site": "umbra-app.com", 
        "role":['Full-Stack Developer', "UX/UI Designer"],
        "langs":['Laravel', 'Tailwind CSS', 'MySQL', 'Hostinger'],
    },
    { 
        "title":"Pina Management CMS",
        "desc": "Developed a custom CMS portal tailored for a real estate company, enabling efficient management of property listings, client records, and transactions. Focused on streamlining workflows and providing a user-friendly interface to improve daily operations.",
        "img": "works/pina.png",
        "site": "In progress", 
        "role":['Database Administrator', "Full-Stack Developer"],
        "langs":["React","Supabase"],
    },
    { 
        "title":"SPUR Landing Page",
       "desc": "Designed and built a responsive landing page to showcase the mobile app I developed, highlighting its key features and benefits. Ensured a modern, engaging layout that aligns with the app’s branding and drives user interest and downloads.",
        "img": "works/joinspur.png",
        "site": "joinspurapp.com", 
        "role":['UX/UI Designer', "Full-Stack Developer"],
        "langs":["Laravel", "Tailwind CSS", "MySQL", "Hostinger"],
    },
    {
        "title":"SPUR Mobile App",
        "desc":"Find your next game, running partner, or tennis match. SPUR is a location-based app that connects you with people who share your passion for sports and fitness. Match by skill, find local events, and build your squad.",
        "img":"works/spurapp.png",
        "site":"In progress",
        "role":['Mobile Developer', 'UX/UI Designer'],
        "langs":["React Native", "Javascript", "Firebase"],
    },
    { 
        "title":"The Zepatide",
      "desc": "Created a professional website to establish a strong brand identity for medical-grade products. Focused on a clean, trustworthy design that communicates product quality while enhancing credibility and customer engagement.",
        "img": "works/zepatide.png",
        "site": "thezepatide.com", 
        "role":['UX/UI Designer', "Front-end Developer"],
        "langs":["Laravel", "Tailwind CSS", "Hostinger"],
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
    }
   

]


function createRoles(arr){ 
    let stack = ''; 


    arr.forEach((item)=> { 
        let temp = ` 
         <span class="text-xs px-3 py-1 bg-gradient-to-r from-red-100 to-pink-100 text-red-600 rounded-full font-medium ">${item}</span>
        `
        stack+=temp; 
    })

    return stack; 

}

function createLanguages(arr) { 
    let stack = ''; 


    arr.forEach((item)=> { 
        let temp = ` 
        <span class="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium border border-gray-300">${item}</span>
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
    <article class="group flex flex-col project-card text-gray-800 overflow-hidden reveal-scale border border-gray-200">
      <!-- Image -->
      <div class="relative overflow-hidden">
        <img src="${item.img}" alt="${item.title}" loading="lazy" class="w-full h-64" />
      </div>

      <!-- Content -->
      <div class="flex flex-col p-6 gap-4">
        <h3 class="text-lg font-bold text-gray-900 line-clamp-1">${item.title}</h3>
        <p class="text-sm text-gray-600 line-clamp-3 leading-relaxed">${item.desc}</p>

        <div class="flex flex-wrap gap-2 mt-1">
          ${roles}
          ${langs}
        </div>

        <div class="mt-3 flex items-center justify-between">
          <a href="${integrateLink(item.site)}" target="${checkTarget(item.site)}" rel="noopener noreferrer" class="btn-modern inline-flex items-center gap-2 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-gray-700 px-4 py-2 rounded-full hover-lift">
            <span class="iconify" data-icon="mdi:link-variant" style="font-size: 1rem;"></span>
            <span class="truncate">${item.site === 'In progress' ? 'Coming Soon' : 'View Site'}</span>
          </a>
        </div>
      </div>
    </article>
        `
        
        sprojects+=project
    });

    document.getElementById('projects').innerHTML = sprojects
  

}

loadProjects(); 