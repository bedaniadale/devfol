
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
            <div class="w-full flex flex-col items-center gap-6">
    <!-- Single Project Card - Horizontal Layout -->
    <div class="w-[90%] sm:w-[80%] lg:w-[70%] flex flex-col bg-white text-gray-800 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 border border-gray-300 hover:shadow-xl">
        <!-- Image Section -->
        <div class="overflow-hidden relative">
            <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105">
        </div>
        
        <!-- Project Content -->
        <div class="flex flex-col">
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-gray-800">${item.title}</h3>
                <p class="text-sm text-gray-600 mt-2">${item.desc}</p>
                
                <!-- Technology Badges -->
                <div class="flex flex-wrap gap-2 mt-4">
                    ${roles} 
                    ${langs}
                </div>
            </div>
            
            <!-- Project Links -->
            <div class="px-4 py-3 bg-gray-100 flex justify-between items-center mt-auto">
                <a href="${integrateLink(item.site)}" target="${checkTarget(item.site)}" class="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors duration-300">
                    <span class="iconify" data-icon="mdi:github" style="font-size: 1.25rem;"></span>
                    ${item.site}
                </a>
            </div>
        </div>
    </div>
</div>

        `
        
        sprojects+=project
    });

    document.getElementById('projects').innerHTML = sprojects
  

}

loadProjects(); 