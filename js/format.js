export const money=value=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value);
export const title=value=>value.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());