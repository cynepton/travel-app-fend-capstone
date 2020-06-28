const pixabayAPIURL = `https://pixabay.com/api/?key=`;
const pixabayAPIKey = `17236736-80509b302fa2b0c65e5207a1d`;
const pixabayAPIImageType = `&image_type=photo`;
const pixabayAPIOrient = `&orientation=horizontal`;
const pixabayAPICateg = `&category=travel`;
const pixabayAPIPerPage = `&per_page=3`;
const pixabaySetOptions = `${pixabayAPIImageType}${pixabayAPIOrient}${pixabayAPICateg}${pixabayAPIPerPage}`;
const sampleFullUrl = `https://pixabay.com/api/?key=17236736-80509b302fa2b0c65e5207a1d&q=paris+france&image_type=photo&orientation=horizontal&category=travel&per_page=3`;