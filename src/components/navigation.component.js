import { Component } from '../core/component'


export class NavigationComponent extends Component {
    constructor(id) {
        super(id);

        this.tabs = []
    }

    init() {
        const navigation = this.$el;
        const tabsNav = navigation.querySelectorAll('.tab');
        
        window.addEventListener('load', _anonymousSettings.bind(this));

        navigation.addEventListener('click', _tabClickHandler.bind(this))
    }

    registerTabs(tabs) {
        this.tabs = tabs;
    }

    static onAuth(signIn) {
        if(signIn == 'anonymous') {
            _anonymousSettings.call(this);
        } else {
            return;
        }
    }

    destroy() {
        navigation.removeEventListener('click', _tabClickHandler);
        localStorage.removeItem('activeTab');
        this.tabs = null;
        this.$el = null;
    }
}

function _tabClickHandler(e) {
    e.preventDefault();
    if(!e.target.classList.contains('tab')) return;

    const tabs = navigation.querySelectorAll('.tab');
    const tab = e.target;
    
    _hideAllActiveClass(tabs);
    _showActivClass(tab);
    _hideAllComponent.call(this);
    _showActiveComponent.call(this, tab.dataset.name);
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

function _setLocalNavigation(tabsNav) {
    const nameTab = localStorage.getItem('activeTab');
    if(nameTab) {
        _hideAllActiveClass(tabsNav);
        _showActivClass(navigation.querySelector(`[data-name=${nameTab}]`));
    }
}

function _showActiveComponent(name) {
    this.tabs.find(tabComp => tabComp.name === name).component.show();
}

function _hideAllComponent() {
    this.tabs.forEach(tab => tab.component.hide());
}

function _anonymousSettings() {
    if(localStorage.getItem('signIn') === 'anonymous') {
        document.querySelector('[data-name="create"]').classList.add('hide');
        document.querySelector('#create').classList.add('hide');
        _showActivClass(document.querySelector('[data-name="posts"]'));
        _showActiveComponent.call(this, 'posts');
    }
    else return;
}