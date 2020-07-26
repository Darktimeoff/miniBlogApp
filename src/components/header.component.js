import { Component } from '../core/component'
export class HeaderComponent  extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        const btn = this.$el.querySelector('.js-header-start');

        _headerLocalSettings.call(this);

        btn.addEventListener('click', _buttonHandler.bind(this), {once: true});
    }
    
    destroy() {
        localStorage.removeItem('visited');
    }
}

function _buttonHandler() {
    this.hide();

    localStorage.setItem('visited', true);
}

function _headerLocalSettings() {
    if(localStorage.getItem('visited')) {
        this.hide(this.$el);
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

