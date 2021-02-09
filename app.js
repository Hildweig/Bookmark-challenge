document.addEventListener('DOMContentLoaded', addEventListeners);
// Navigation

const menu_icon = document.querySelector('.navigation-menu-icon');
const close_icon = document.querySelector('.navigation-close-icon');
const navigation_icon = document.querySelector('nav');
const navigation_list = document.querySelector('.navigation-list');
const logo_icon_1 = document.getElementById('logo-1');
const logo_icon_2 = document.getElementById('logo-2');

// Tabs 

const features_list = document.querySelector('.features-list');
const feature_list_items = document.querySelectorAll('.features-list li');
const tabs_list = document.querySelectorAll('.tab');
const features_infos = document.querySelectorAll('.features-info');
const features_images =  document.querySelectorAll('.tab .col-1 img');

// Questions
const questions_list = document.querySelector('.questions');
// Section headers

const section_header_list = document.querySelectorAll('.section-header');


function handleNavigationIcon() {
    menu_icon.classList.toggle('hide');
    close_icon.classList.toggle('show');
    navigation_list.classList.toggle('show');
    logo_icon_1.classList.toggle('hide');
    logo_icon_2.classList.toggle('show');

    //fixing position of header and navigation icon when opened
    menu_icon.classList.toggle('fixed');
    close_icon.classList.toggle('fixed');
    logo_icon_2.classList.toggle('fixed');
}




//Change tab function 
function changeTab(e) {
    const index = e.getAttribute('data-list-item');
    //Change Tab list item
    feature_list_items.forEach(feature_item => {
        feature_item.classList.remove('active');
    });
     feature_list_items[index].classList.add('active');
    //change Tab content

    tabs_list.forEach((tab, index) => {
        tab.classList.remove('show');
        features_infos[index].classList.remove('pop');
        features_images[index].classList.remove('pop');
    });

    tabs_list[index].classList.add('show');
    features_infos[index].classList.add('pop');
    features_images[index].classList.add('pop');

}

// Expand animation for answers
function expand_collapse(element, className) {
    console.log(className);
    let question_element, 
        arrow, arrow_stroke;

    if(className === 'question') {
        console.log('HERE')
        question_element = element;
        console.log(element)
        arrow = question_element.children[1];
        console.log(arrow)
        arrow_stroke = arrow.children[0];
        console.log(arrow_stroke);
    }
    else {
        question_element = element.parentElement;
        arrow = element;
        arrow_stroke = arrow.children[0];
    
    }
    //change arrow
    arrow.classList.toggle('up');
    arrow_stroke.classList.toggle('up');
    const answer_element = question_element.nextElementSibling;
    const max_height_value = getComputedStyle(answer_element).getPropertyValue("max-height");


    if(max_height_value !== '0px') {
        answer_element.style.maxHeight = '0px';
        answer_element.classList.replace("show","hide");
        question_element.style.borderBottomWidth = '1px'
    }
    else {
        let answer_height = answer_element.scrollHeight;
        answer_element.style.maxHeight = answer_height + 'px';
        answer_element.classList.replace("hide","show");
        question_element.style.borderBottomWidth = '0px'

    }
}

// Adding all event listeners here

function addEventListeners() {
    navigation_icon.addEventListener('click', handleNavigationIcon);
    features_list.addEventListener('click', function(e) {
    changeTab(e.target);
});
    questions_list.addEventListener('click', function(e) {
        if(e.target.classList.contains('question'))
           expand_collapse(e.target, 'question');
        else if (e.target.classList.contains('arrow'))
           expand_collapse(e.target, 'arrow');
    });

     window.addEventListener('scroll', fade_down);
}

function fade_down() {
  
   const screen_height = window.innerHeight;
   let position_top,
       position_bottom; 

   section_header_list.forEach(section_header => {
        position_top = section_header.getBoundingClientRect().top ;

        if(position_top < screen_height ){
            section_header.classList.add('fade-down');
        }

   });
}


