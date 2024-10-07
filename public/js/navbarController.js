const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const btnLogout = document.getElementById("logoutBtn") ;

menuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('hidden');
});

document.addEventListener('click', function(event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnMenuBtn = menuBtn.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnMenuBtn && !navMenu.classList.contains('hidden') && window.innerWidth < 768) {
        navMenu.classList.add('hidden');
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        navMenu.classList.remove('hidden');
    } else {
        navMenu.classList.add('hidden');
    }
}) ;

async function logout() {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas cerrar la sesión?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        fetch("/logout", 
            {
                method: "POST"
            }
        ).then(response => {
            if(response.ok) {
                window.location.href = "/" ;
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al cerrar sesión...",
                    icon: "error",
                    customClass: {
                        confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
                    }
                });
            }
        }).catch(err => {
            Swal.fire({
                title: "Error",
                text: "Hubo un error al cerrar sesión...",
                icon: "error",
                customClass: {
                    confirmButton: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
                }
            });
        }) ;
    }
}

document.getElementById("oliFinanceLogo").onclick = () => {
    window.location.href = "/menu" ;
}

btnLogout.onclick = async () => {

    await logout() ;

} ;