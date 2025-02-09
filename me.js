  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
}

document.addEventListener("DOMContentLoaded", function() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
});