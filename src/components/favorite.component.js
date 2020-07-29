import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { createHTML } from '../templates/post.template'

export class FavoriteComponent extends Component{
    constructor(id, { loader }) {
        super(id)
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', _linkClickHandler.bind(this));
    }

    onShow() {
        const list =  JSON.parse(localStorage.getItem('favorites'));

        const html = _renderFavorites.call(this, list)
        this.$el.insertAdjacentHTML('afterbegin', html);
    }

    onHide() {
        this.$el.innerHTML = '';
    }
}

function _createHTML(id, title) {
    return `<li><a href ="#" data-id="${id}">${title}</a></li>`;
}

function _renderFavorites(list = []) {
    if(list.length) {
       return `<ul> ${list.map(({id, title}) => _createHTML(id, title)).join('')}</ul>`;
    }
    return `<p>Вы пока ничего не добавили избранные</p>`;
}

async function _linkClickHandler(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    if(id) {
        this.loader.show();

        this.$el.innerHTML = '';

        const post = await apiService.getPostById(id);
        console.log(post);
        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', createHTML(post.date, post.fulltext, post.title, post.type))
    }
}

