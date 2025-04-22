//FetchNavbar
export const fetchNavbar = async () => { 
    try {
        const response = await fetch('./../nav&foot/nav.html'); 
        if (!response.ok) {
            throw new Error("Failed to fetch Navbar!");
        }
        return await response.text();
    } catch (error) {
        console.error('Navbar error:', error);
        return;
    }
};

//FetchFooter
export const fetchFooter = async () => {
    try {
        const response = await fetch('./../nav&foot/foot.html');
        if (!response.ok) {
            throw new Error("Failed to fetch footer");
        }
        return await response.text();
    } catch (error) {
        console.error('Footer error:', error);
        return;
    }
};