import { Component } from '../core/component';
import { Form } from '../core/form';
import { Validators } from '../core/validators';
import { apiService } from '../services/api.service'

export class CreateComponent extends Component{
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('submit', _submitHandler.bind(this));
    
        this.form = new Form(this.$el, {
            title: [Validators.required],
            fulltext: [Validators.required, Validators.minLength(10)]
        });
    }

    destroy() {
        this.$el.removeEventListener('submit', _submitHandler.bind(this));
        this.$el = null;
        this.form = null;
    }
}

async function _submitHandler(e) {
    e.preventDefault();

    if(this.form.isValid()) {
        const formData = {
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(),
            ...this.form.value()
        }

        const response = await apiService.createPost(formData);
        console.log(response);
        this.form.clear();
        alert('Запись создана в базе данных');
    } 
}