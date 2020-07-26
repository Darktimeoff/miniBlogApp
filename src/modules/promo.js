
export default function promo (buttonSelector, promoSelector) {
    const promoSection = document.querySelector(promoSelector);
    const buttonOpen = promoSection.querySelector(buttonSelector);
    let closePromo = localStorage.getItem('promoClose') || false;

    function open() {
        promoSection.classList.add('hide');
        document.body.style.overflow = '';
        closePromo = true;
        localStorage.setItem('promoClose', closePromo);
    }
    function openLoad() {
        if(closePromo) {document.body.style.overflow = ''; promoSection.classList.add('hide') }
        else document.body.style.overflow = 'hidden';
    }
    buttonOpen.addEventListener('click', open, {once: true});
    window.addEventListener('load', openLoad, {once: true});
}
