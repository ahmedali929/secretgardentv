
  function closeNewsletterPopup() {
    document.getElementById("newsletter-popup").classList.add("d-none");
    sessionStorage .setItem("newsletterDismissed", "true");
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      const dismissed = sessionStorage .getItem("newsletterDismissed");
      if (!dismissed) {
        document.getElementById("newsletter-popup").classList.remove("d-none");
      }
    }, 5000); // Show after 5 seconds
  });



  // function handleNewsletterSubmit(event) {
  //   event.preventDefault();
  //   var form = document.getElementById("newsletterForm");
  //   var inputs = form.querySelectorAll("input");
  //   for (var i = 0; i < inputs.length; i++) {
  //     if (inputs[i].type !== "hidden" && inputs[i].type !== "checkbox") {
  //       inputs[i].value = "";
  //     } else if (inputs[i].type === "checkbox") {
  //       inputs[i].checked = false;
  //     }
  //   }
  //   document.getElementById("newsletter-success").style.display = "block";
  // }


  function openNewsletterPopup() {
    document.getElementById("newsletter-popup").classList.remove("d-none");
  }


  function handleNewsletterSubmit(event) {
    event.preventDefault();

    // Hide intro and form
    document.getElementById("newsletter-intro").style.display = "none";
    document.getElementById("newsletter-fields").style.display = "none";

    // Show success message
    document.getElementById("newsletter-success").style.display = "block";
  }