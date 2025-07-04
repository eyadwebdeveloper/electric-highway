setTimeout(() => {
    document.getElementById('loading').classList.add('hide');
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 300);
}, 2500);

/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu');
        // Add show-icon to show and hide menu icon
        toggle.classList.toggle('show-icon');
    });
 };
 
 showMenu('nav-toggle','nav-menu');
 
 /*=============== SHOW DROPDOWN MENU ===============*/
 const dropdownItems = document.querySelectorAll('.dropdown__item');
 
 // 1. Select each dropdown item
 dropdownItems.forEach((item) =>{
     const dropdownButton = item.querySelector('.dropdown__button');
 
     // 2. Select each button click
     dropdownButton.addEventListener('click', () =>{
         // 7. Select the current show-dropdown class
         const showDropdown = document.querySelector('.show-dropdown');
         
         // 5. Call the toggleItem function
         toggleItem(item);
 
         // 8. Remove the show-dropdown class from other items
         if(showDropdown && showDropdown!== item){
             toggleItem(showDropdown);
         }
     })
 })
 
 // 3. Create a function to display the dropdown
 const toggleItem = (item) =>{
     // 3.1. Select each dropdown content
     const dropdownContainer = item.querySelector('.dropdown__container');
 
     // 6. If the same item contains the show-dropdown class, remove
     if(item.classList.contains('show-dropdown')){
         dropdownContainer.removeAttribute('style');
         item.classList.remove('show-dropdown');
     } else{
         // 4. Add the maximum height to the dropdown content and add the show-dropdown class
         dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px';
         item.classList.add('show-dropdown');
     };
 };
 
 /*=============== DELETE DROPDOWN STYLES ===============*/
 const mediaQuery = matchMedia('(min-width: 1118px)'),
       dropdownContainer = document.querySelectorAll('.dropdown__container');
 
 // Function to remove dropdown styles in mobile mode when browser resizes
 const removeStyle = () =>{
     // Validate if the media query reaches 1118px
     if(mediaQuery.matches){
         // Remove the dropdown container height style
         dropdownContainer.forEach((e) =>{
             e.removeAttribute('style');
         });
 
         // Remove the show-dropdown class from dropdown item
         dropdownItems.forEach((e) =>{
             e.classList.remove('show-dropdown');
         });
     };
 };
 
 addEventListener('resize', removeStyle);

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


document.getElementById('mode-switch').addEventListener('change', () => {
    checkMode();
});

function checkMode() {
    const themeCheckbox = document.getElementById('mode-switch');
    const body = document.querySelector('body');

    if (themeCheckbox.checked) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
}

document.addEventListener('DOMContentLoaded', function() {
        const monthlyBtn = document.getElementById('monthly');
        const annuallyBtn = document.getElementById('annually');
        
        monthlyBtn.addEventListener('click', function() {
            if (!monthlyBtn.classList.contains('active')) {
                monthlyBtn.classList.add('active');
                annuallyBtn.classList.remove('active');
                
                // Show monthly prices
                document.querySelectorAll('.amount.monthly').forEach(el => {
                    el.style.display = 'inline';
                });
                document.querySelectorAll('.amount.annually').forEach(el => {
                    el.style.display = 'none';
                });
                
                // Update period text if needed
                document.querySelectorAll('.period').forEach(el => {
                    el.innerHTML = '/month';
                });
            }
        });
        
        annuallyBtn.addEventListener('click', function() {
            if (!annuallyBtn.classList.contains('active')) {
                annuallyBtn.classList.add('active');
                monthlyBtn.classList.remove('active');
                
                // Show annual prices
                document.querySelectorAll('.amount.monthly').forEach(el => {
                    el.style.display = 'none';
                });
                document.querySelectorAll('.amount.annually').forEach(el => {
                    el.style.display = 'inline';
                });
                
                // Update period text if needed
                document.querySelectorAll('.period').forEach(el => {
                    el.innerHTML = '/month <span style="font-size: 15px">(billed annually)</span>';
                });
            }
        });
    });


         const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));



$('.testimonials-container').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:6000,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left'></i>",
             "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1,
            nav:false
        },
        600:{
            items:1,
            nav:true
        },
        768:{
            items:2
        },
    }
})