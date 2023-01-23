import { DropdownList } from './components/dropdown-list/dropdown-list.mjs';

addEventListener('DOMContentLoaded', async (event) => {
    // fetch 'dropdown-list.html' and append its contents to the body tag
    const init = fetch('components/dropdown-list/dropdown-list.html')
        .then(response => response.text())
        .then(html => html);

    var html = await init;

    // get reference to body tag
    const body = document.querySelector('body');
    // define DOM element from html string
    const template = document.createElement('div');
    // set template html content
    template.innerHTML = html;
    // append template to body
    body.appendChild(template.querySelector("template"));

    customElements.define('dropdown-list', DropdownList);

    // Get a DOM reference to the dropdown-list element 
    const dropdownList = document.querySelector('dropdown-list');

    // set the options property on the dropdown-list element with a JS Map
    dropdownList.options = new Map([
        ['USA', 'United States'],
        ['CAN', 'Canada'],
        ['MEX', 'Mexico']
    ]);
});
