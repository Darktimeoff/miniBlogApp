import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';
import { createHTML } from '../templates/post.template'


export class PostsComponent extends Component{
	constructor(id, { loader }) {
		super(id)
		this.loader = loader;
	}
	init() {
		this.$el.addEventListener('click', _buttonHandler.bind(this));
	}

	async onShow() {
		this.loader.show();
		const select = this.$el.querySelector('select')
		const data = await apiService.getPost();
		select.addEventListener('change', (e)=> _selectHandler.call(this, e, data));
		this.loader.hide();
		_renderPosts.call(this, data);
	}

	onHide() {
		_clearPosts.call(this);
	}

}

function _renderPosts(data) {
	TransformService.fbObjectToArray(data).forEach( ({ date, fulltext, title, type, id }) => {
		this.$el.querySelector('.posts-wrapper').insertAdjacentHTML('afterbegin', createHTML(date, fulltext, title, type, id, _findInArrObjProp));
	});
}



function _clearPosts() {
	this.$el.querySelector('.posts-wrapper').innerHTML = '';
}

function _buttonHandler(e) {
	const $el = e.target;
	const id = $el.dataset.id;
	if(id) {
		let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
		let title = $el.closest('.panel').querySelector('.panel-title');

		if( _findInArrObjProp(favorites, id)) {
			$el.textContent = 'Сохранить';
			$el.classList.add('button-primary');
			$el.classList.remove('button-danger');
			favorites = favorites.filter( obj => obj.id !== id );
		} else {
			$el.textContent = 'Удалить';
			$el.classList.remove('button-primary');
			$el.classList.add('button-danger');
			favorites.push({ id, title: title.textContent });
		}

		localStorage.setItem('favorites', JSON.stringify(favorites))
	}
}

function _findInArrObjProp(array, id) {
	return array.find(item => item.id === id);
}

function _selectHandler(e, data) {
	e.preventDefault();
	const sortValue = e.target.value;
	if(sortValue === 'all') {
		_clearPosts.call(this);
		console.log(data);
		_renderPosts.call(this, data);
	} else {
		const sortData = TransformService.fbObjectToArray(data).filter(obj => obj.type === sortValue);
		_clearPosts.call(this);
		_renderPosts.call(this, sortData);
	}
}