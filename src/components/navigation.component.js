import { Component } from '../core/component'
export class NavigationComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        const navigation = this.$el;
        const tabs = navigation.querySelectorAll('.tab');

        _setLocalNavigation(tabs);

        navigation.addEventListener('click', _tabClickHandler.bind(this))
    }

    destroy() {
        navigation.removeEventListener('click', _tabClickHandler);
        localStorage.removeItem('activeTab');
    }
}

function _tabClickHandler(e) {
    e.preventDefault();
    if(!e.target.classList.contains('tab')) return;

    const tabs = navigation.querySelectorAll('.tab');
    const tab = e.target;

    _hideAllActiveClass(tabs);
    _showActivClass(tab);
}

function _hideAllActiveClass(tabs) {
    for(let tab of tabs) {
        if(tab.classList.contains('active')) { 
            _removeActiveClass(tab);
            break;
        }
    }
}

function _showActivClass(tab) {
    tab.classList.add('active');

    localStorage.setItem('activeTab', tab.dataset.name)
}

function _removeActiveClass(tab) {
    tab.classList.remove('active');
}

function _setLocalNavigation(tabs) {
    const nameTab = localStorage.getItem('activeTab');
    if(nameTab) {
        _hideAllActiveClass(tabs);
        _showActivClass(navigation.querySelector(`[data-name=${nameTab}]`))
    }
}

