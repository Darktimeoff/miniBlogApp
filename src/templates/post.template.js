export function  createHTML(date, fulltext, title, type, id, _findInArrObjProp) {
	const tag = type === 'news' ?    '<li class="tag tag-blue tag-rounded">Новость</li>' : '<li class="tag  tag-rounded">Заметки</li>';
    let button;
    
	if(_findInArrObjProp) {
        button = _findInArrObjProp(JSON.parse(localStorage.getItem('favorites')) || [], id)  ? 
	`<button сlass="button button-round button-primary button-small button-danger" data-id="${id}">Удалить</button>` 
	:  `<button сlass="button button-round button-primary button-small button-primary" data-id="${id}">Сохранить</button>`;
    }

	return `
	<div class="panel">
		<div class="panel-head">
			<p class="panel-title">${title}</p>
			<ul class="tags">
			${tag}
			</ul>
		</div>
		<div class="panel-body">
			<p class="multi-line">${fulltext}</p>
		</div>
		<div class="panel-footer w-panel-footer">
			<small>${date}</small>
			${button || ''}
		</div>
	</div>
	`
}