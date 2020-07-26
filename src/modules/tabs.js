export default function tabs(tabsParentSel) {
    const navigation = document.querySelector(tabsParentSel);

    setLocalSetings(navigation);

    navigation.addEventListener('click', showTabContent);
}

function showTabContent(e) {
    const tab = e.target;
    const idNameSection = '#' + tab.dataset.name; 
    hideActiveTab(navigation);
    showSection(tab, idNameSection);
}

function showSection(tab, selector) {
    const content =  document.querySelector(selector);
    content.classList.remove('hide');
    tab.classList.add('active');
    setTabToLocalStorage(selector);
}

function hideSection(tab, selector) {
    const content =  document.querySelector(selector);
    content.classList.add('hide');
    tab.classList.remove('active');
}

function hideActiveTab(navigation) {
    const tabs = navigation.querySelectorAll('.tab');
    for(let tab of tabs) {
        if(tab.classList.contains('active')) {
            hideSection(tab, '#' + tab.dataset.name)
            break;
        }
    }
}

function setTabToLocalStorage(selector) {
    localStorage.setItem('tab', selector);
}

function getTabFromLocalStorage() {
    return  localStorage.getItem('tab');
}

function setLocalSetings(navigation) {
    const tabSelector = getTabFromLocalStorage();
    if(tabSelector) {
        const tab = navigation.querySelector(`[data-name=${tabSelector.slice(1)}]`);
        hideActiveTab(navigation);
        showSection(tab, tabSelector);
        return true
    } 
    return
}
