angular
  .module('unicerApp')
  .service('SideNavService', SideNavService);

function SideNavService() {

  var isVisible = true;
  var activeTab = 1;
  var lastActiveTab;

  return {
    isVisible: getVisibility,
    showNavigation: showNavigation,
    hideNavigation: hideNavigation,
    setActiveTab: setActiveTab,
    getActiveTab: getActiveTab,
    isActiveTab: isActiveTab,
    hide: hide,
    show: show
  }

  function getVisibility() {
    return isVisible;
  }
  function showNavigation() {
    isVisible = true;
  }
  function hideNavigation() {
    isVisible = false;
  }

  function setActiveTab(tab) {
    activeTab = tab;
  }
  function getActiveTab(){
    return activeTab;
  }
  function isActiveTab(tab){
    return activeTab === tab;
  }

  function hide(){
    lastActiveTab = activeTab;
    setActiveTab(null);
  }
  function show(){
    setActiveTab(lastActiveTab);
  }

}  