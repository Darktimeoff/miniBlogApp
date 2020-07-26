export  class Component {
    localSettings = {
    }

    constructor(id) {
        this.$el = document.getElementById(id);
        this.init();
    }

    init() {}

    getLocalSettings() {
        return this.localSettings;
    }

    hide(el) {
        el.classList.add('hide')
    }

    show(el) {
        el.classList.remove('hide');
    }
}