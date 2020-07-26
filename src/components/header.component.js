import { Component } from '../core/component'
export class HeaderComponent  extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        const btn = this.$el.querySelector('.js-header-start');
        let visited = localStorage.getItem('close') || false;

        _headerLocalSettings.call(this, visited);

        btn.addEventListener('click', _buttonHandler.bind(this), {once: true});
    }
}

function _buttonHandler() {
    this.hide(this.$el);

    visited = true;

    localStorage.setItem('close', visited);
}

function _headerLocalSettings(visited) {
    if(visited) {
        this.hide(this.$el);
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

