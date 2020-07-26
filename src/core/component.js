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

    hide() {
        this.$el.classList.add('hide')
    }

    show() {
        this.$el.classList.remove('hide');
    }
}