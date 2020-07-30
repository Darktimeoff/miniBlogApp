import { Component } from '../core/component'
import { AuthenticationService } from '../services/authentication.service';
import { Form } from '../core/form';
import { Validators } from '../core/validators';
import { NavigationComponent } from './navigation.component';

export class HeaderComponent  extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        const btnAnonymously = this.$el.querySelector('.auth-link');
        const formAuth = this.$el.querySelector('#auth');

        this.form = new Form(formAuth, {
            email: [Validators.required],
            password: [Validators.required, Validators.minLength(8)]
        });


        _headerLocalSettings.call(this);

        btnAnonymously.addEventListener('click', _buttonHandler.bind(this), {once: true});
        formAuth.addEventListener('submit', _authHandler.bind(this));
    }
    
    destroy() {
        localStorage.removeItem('visited');
    }

}

function _buttonHandler(e) {
    e.preventDefault();
    this.hide();
    document.body.style.overflow = '';

    NavigationComponent.onAuth('anonymous')
    
    localStorage.setItem('visited', true);
    localStorage.setItem('signIn', 'anonymous');
}

function _headerLocalSettings() {
    if(localStorage.getItem('visited')) {
        this.hide();
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

async function _authHandler(e) {
    e.preventDefault();
    if(this.form.isValid()) {
        const user = this.form.value()
        const token = await AuthenticationService.authWithEmailAndPassword(user.email, user.password);
        if(token) { this.hide();  NavigationComponent.onAuth('authorization'); localStorage.setItem('visited', true);}
    }
}