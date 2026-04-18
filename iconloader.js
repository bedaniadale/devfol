

const _github   = `<img src="https://thesvg.org/icons/github/default.svg"   width="18" height="18" alt="GitHub"   loading="lazy" class="icon-theme-adapt" style="display:inline-block;">`;
const _linkedin = `<img src="https://thesvg.org/icons/linkedin/default.svg" width="18" height="18" alt="LinkedIn" loading="lazy" style="display:inline-block;">`;

document.querySelectorAll('#github').forEach(el => { el.innerHTML = _github; });
document.querySelectorAll('#linkedin').forEach(el => { el.innerHTML = _linkedin; });

