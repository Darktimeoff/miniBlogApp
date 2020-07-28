import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';

export class PostsComponent extends Component{
    constructor(id) {
        super(id)
    }

    async onShow() {
        const data = await apiService.getPost();


        _createPosts.call(this, data);
    }

}

function _createPosts(data) {
    _clearPosts.call(this);

    TransformService.fbObjectToArray(data).forEach( ({ date, fulltext, title, type, id }) => {
        this.$el.insertAdjacentHTML('beforeend', _createHTML(date, fulltext, title, type, id));
    });
}

function _createHTML(date, fulltext, title, type, id) {
    return `
    <div class="panel" data-id="${id}">
        <div class="panel-head">
        <p class="panel-title">${title}</p>
        <ul class="tags">
            <li class="tag tag-blue tag-rounded">${type}</li>
        </ul>
        </div>
        <div class="panel-body">
        <p class="multi-line">${fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
        <small>${date}</small>
        </div>
    </div>
    `
}

function _clearPosts() {
    this.$el.innerHTML = '';
}