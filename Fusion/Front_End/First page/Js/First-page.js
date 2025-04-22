import { fetchNavbar, fetchFooter } from "./fetchTemplates.js";

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const navbarHTML = await fetchNavbar(); 
    const footerHTML = await fetchFooter();

    document.getElementById('navbar').innerHTML = navbarHTML; 
    document.getElementById('footer').innerHTML = footerHTML;
  } catch (error) {
    console.error('Error loading components:', error.message); 
  }
});