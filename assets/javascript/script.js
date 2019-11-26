$(document).ready(function () {
  $('input:checkbox').click(function () {
    $('input:checkbox').not(this).prop('checked', false);
  });
});

function myFunction(name) {
  document.getElementById("main-h2").innerHTML = "FIND A SUITABLE " + name + " IN YOUR LOCATION";
  document.getElementById("btn-search").innerHTML = name + " Search";
  document.getElementById("doc").innerHTML = name + " in Mumbai";
  document.getElementById("doc2").innerHTML = name + " in Mumbai";
  document.getElementById("doc3").innerHTML = name + " in Mumbai";
  document.getElementById("doc4").innerHTML = name + " in Mumbai";
  document.getElementById("middle-para").innerHTML = "WE HAVE MORE THAN 10,000+ CERTIFIED " + name + " FOR YOU";
}

// animation 

// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
  a = 0,
  isBackspacing = false,
  isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|".  
var textArray = [
  "COMPARE: DOCTOR EXPEIENCE, TREATMENT COST, ADVANCED TECHNOLOGY & HOSPITAL SETUP",
  "COMPARE: DOCTOR EXPERIENCE, SPECILITY, TREATMENT COST, AVAILABILITY & CLINIC SETUP",
  "COMPARE: DOCTOR EXPERIENCE, SPECIALITY, TREATMENT COST & AVAILABILITY"
];

// Speed (in milliseconds) of typing.
var speedForward = 100, //Typing Speed
  speedWait = 1000, // Wait between typing and backspacing
  speedBetweenLines = 1000, //Wait between first and second lines
  speedBackspace = 25; //Backspace Speed

//Run the loop
typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = $("#" + id),
    aString = ar[a],
    eHeader = element.children("h1"), //Header element
    eParagraph = element.children("p"); //Subheader element

  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {

    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {

      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function () { typeWriter(id, ar); }, speedBetweenLines);

        // If character isn't a pipe, continue typing.
      } else {
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function () { typeWriter(id, ar); }, speedForward);
      }

      // If full string has been typed, switch to backspace mode.
    } else if (i == aString.length) {

      isBackspacing = true;
      setTimeout(function () { typeWriter(id, ar); }, speedWait);

    }

    // If backspacing is enabled
  } else {

    // If either the header or the paragraph still has text, continue backspacing
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {

      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function () { typeWriter(id, ar); }, speedBackspace);

      // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else {

      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      setTimeout(function () { typeWriter(id, ar); }, 50);

    }
  }
}