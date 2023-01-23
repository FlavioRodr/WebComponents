// define a web component named 'dropdown-list'
class DropdownList extends HTMLElement {
    // define getter and setter for new property 'selectedOption' of type string
    get selectedOption() {
        return this.dataset.selectedOption;
    }
    set selectedOption(value) {
        this.dataset.selectedOption = value;
        // get selected option from map by using key as value
        const selectedOption = this._options.get(value);
        // create 'span' dom element with class set to 'selection-box', data-key set to key and innerHTML set to value
        const span = document.createElement('span');
        span.classList.add('selection-box');
        span.setAttribute('data-key', value);
        span.innerHTML = selectedOption;

        // clear selection box slot html content
        this._shadowRoot.querySelector('slot[name="selection-box"]').innerHTML = '';
        // append 'span' to selection box slot
        this._shadowRoot.querySelector('slot[name="selection-box"]').appendChild(span);        
        // get reference to selected li element
        const selectedLi = this._shadowRoot.querySelector(`li[data-key="${value}"]`);
        // add 'selected' class to selected li element
        selectedLi.classList.add('selected');
        // get reference to all unselected li elements
        const unselectedLis = this._shadowRoot.querySelectorAll(`li:not([data-key="${value}"])`);
        // remove 'selected' class from all unselected li elements
        unselectedLis.forEach(li => li.classList.remove('selected'));
    }

    // define getter and setter for new property 'options' 
    // 'options' will be a map of key value pairs
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
        // get options slot element
        const optionsSlot = this._shadowRoot.querySelector('slot[name="options"]');
        // hide options slot
        optionsSlot.setAttribute('hidden', '');
        // get referente to classList attribute
        const classList = optionsSlot.classList;
        // clear options slot
        optionsSlot.innerHTML = '';
        // create ul dom element
        const ul = document.createElement('ul');
        // append 'options' class to ul classList
        ul.classList.add('options');
        // iterate over map and create li elements
        for (const [key, value] of this._options) {
            const li = document.createElement('li');
            li.innerHTML = value;
            li.setAttribute('data-key', key);
            // get referente to classList attribute
            const classList = li.classList;
            // append 'option' class to classList
            classList.add('option');
            ul.appendChild(li);
        }
        // set click event on ul > li
        ul.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                // retrieve data-key attribute from li element
                const key = e.target.getAttribute('data-key');
                // set selected option
                this.selectedOption = key;
                // hide options slot
                optionsSlot.setAttribute('hidden', '');
                // if options slot is hidden, remove 'show' class from classList
                if (optionsSlot.hasAttribute('hidden')) {
                    classList.remove('show');
                }
                // if options slot is not hidden, add 'show' class to classList
                else {
                    classList.add('show');
                }                
            }
        });
        // append ul to options slot
        optionsSlot.appendChild(ul);

        // if selected-option attribute is defined, call selected option setter
        if (this.dataset.selectedOption !== undefined && this.dataset.selectedOption !== '') {
            this.selectedOption = this.dataset.selectedOption;
        }
    }

    constructor() {
        super();
        
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        // get dom template element by using id as selector
        const template = document.getElementById('dropdown-list');       
        // clone template content and append to shadow root
        const content = template.content.cloneNode(true);
        this._shadowRoot.appendChild(content);

        // define click event on selection box that will toggle the options slot
        this._shadowRoot.querySelector('slot[name="selection-box"]').addEventListener('click', () => {
            this._shadowRoot.querySelector('slot[name="options"]').toggleAttribute('hidden');
        });
    }

    // define lifecycle method attributeChangedCallback
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-selected-option' && oldValue !== newValue && this._options !== undefined) {
            // call selected option setter
            this.selectedOption = newValue;
        }
    }    

    static get observedAttributes() { return ['data-selected-option'] }
}

export { DropdownList };

