document.addEventListener('DOMContentLoaded', function() {
    
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');
    
  
    const menuIcon = '<span class="material-icons-sharp">menu</span>';
    const chevronIcon = '<span class="material-icons-sharp">chevron_right</span>';
    
  
    toggleButton.addEventListener('click', function() {
        const isCollapsed = sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded', isCollapsed);
        
        
        toggleButton.innerHTML = isCollapsed ? chevronIcon : menuIcon;
        
       
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    });
    
    
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
        toggleButton.innerHTML = chevronIcon;
    }
    document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const toggleButton = document.getElementById('sidebarToggle');
    
    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        content.classList.toggle('with-sidebar');
    });
});
});