function showContent() {
    document.getElementById("content").innerHTML = "<h2>Prêt ?</h2>";
    setTimeout(() => {
        document.getElementById("content").innerHTML = "<p class=`countdown`>3</p>";
        setTimeout(() => {
            document.getElementById("content").innerHTML = "<p class=`countdown`>2</p>";
            setTimeout(() => {
                document.getElementById("content").innerHTML = "<p class=`countdown`>1</p>";
                setTimeout(() => {
                    document.getElementById("content").innerHTML = "<p class=`countdown`>Je vais bientôt avoir un job au lieu de stage de cette formation !!!!</p>";
                }, 1500);
            }, 1000);
        }, 1000);
    }, 1000);
}
showContent();