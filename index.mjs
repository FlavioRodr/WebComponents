import { DropdownList } from './components/dropdown-list/dropdownlist.mjs';

// Get a DOM reference to the dropdown-list element 
const dropdownList = document.querySelector('dropdown-list');

// set the options property on the dropdown-list element with a JS Map
dropdownList.options = new Map([
    ['USA', 'United States'],
    ['CAN', 'Canada'],
    ['MEX', 'Mexico']
]);