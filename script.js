// دالة نسخ النص إلى الحافظة
function copyToClipboard(elementId) {
    var text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("تم نسخ النص: " + text);
    });
}

// إرسال النموذج
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("تم إرسال رسالتك بنجاح!");
    this.reset();
});
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});
