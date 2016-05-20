// HTTP ajax Request
function theData(data){
	var theRequest = new XMLHttpRequest(); //new request
	theRequest.open("GET", data, false);
	theRequest.send(null);
	return theRequest.response;          
}

// Retrieves data from JSON file and stores it in variable myData
var myData = JSON.parse(theData('/api/nav.json'));
console.log(myData);

// Variable for the ul that the data is appended into
var list = document.getElementById('list')

// Loop creating elements for each set of data in JSON file 
for(i = 0; i < myData.items.length; i++) {
	var li = document.createElement('li'),
		a = document.createElement('a'), // Each section (about, contact, etc)
		aText = document.createTextNode(myData.items[i].label), // Title for each section
		div = document.createElement('div') // Div for sub-items (if any)

	a.setAttribute('class', 'dropDownButton') // Setting classes to all a's and div's (for window function)
	div.setAttribute('class', 'dropDown')

	// If there are sub-items
	if(myData.items[i].items.length > 0) {
		a.addEventListener('click', appear, this) // Each section with sub-items get's this function
		for(j = 0; j < myData.items[i].items.length; j++) { // For loop running through sub items
			var aText2 = document.createTextNode(myData.items[i].items[j].label), // Title for sub-section
				a2 = document.createElement('a')

			a2.href = myData.items[i].items[j].url // Sets link to sub-item link
			a2.appendChild(aText2)
			div.appendChild(a2) // Adds sub-item to div for that section
		}
	}
	else {
		a.href = myData.items[i].url // set's link for section without sub-items
	}

	// Appends sections to the list
	a.appendChild(aText)
	li.appendChild(a)
	if(myData.items[i].items.length > 0) { // Mobile View - Adds chevron
		var chevron = document.createElement('i')
		chevron.setAttribute('class', 'fa fa-chevron-down')
		a.appendChild(chevron)
	}
	li.appendChild(div)
	list.appendChild(li)

}

// The other two sections
var headerElement = document.getElementById('getPaid')
var bodyElement = document.getElementById('body')

// Sub-item drop down function when section is clicked
function appear() {
	if(this.nextSibling.style.display === 'block') { // Closes sub-item div if it's open
		this.nextSibling.style.display = 'none' // The sub-item div
		this.classList.toggle('background') // Class that changes background of section
		headerElement.classList.toggle('overlay') // Toggles class for dimming
		bodyElement.classList.toggle('overlay')
		this.lastChild.setAttribute('class', 'fa fa-chevron-down') // Switches direction of chevron for mobile view
	}
	else { // Opens sub-item div and closes another if there's one open
		var droppy = document.getElementsByClassName('dropDown') // each sub-item div
		for(i = 0; i < droppy.length; i++) { // for loop running through each
			if(droppy[i].style.display === 'block') { // if sub-item div is showing
				droppy[i].style.display = 'none'
				droppy[i].previousSibling.classList.toggle('background')
				headerElement.classList.toggle('overlay')
				bodyElement.classList.toggle('overlay')
				droppy[i].previousSibling.lastChild.setAttribute('class', 'fa fa-chevron-down') // Swtiches chevron direction
			}
		}
		this.nextSibling.style.display = 'block' // display's sub-item div from section that was clicked
		this.classList.toggle('background')
		headerElement.classList.toggle('overlay')
		bodyElement.classList.toggle('overlay')
		this.lastChild.setAttribute('class', 'fa fa-chevron-up')
	}
}

// Variables for hamburger, the "X", Huge logo, and copyright statement
var hamburger = document.getElementById('Layer_1'),
	close = document.getElementById('Layer_2'),
	huge = document.getElementById('huge'),
	copyright = document.getElementById('copyright'),
	mainSection = document.getElementById('mainSection'),
	bodySection = document.getElementById('bodySection'),
	navbar = document.getElementById('navbar')

// Adds functions to hamburger and "X" for opening and closing section list respectively
hamburger.addEventListener('click', mobileDrop)
close.addEventListener('click', mobileClose)

// Open
function mobileDrop() {
	hamburger.classList.toggle('displayBro') // Toggles display = block class
	huge.classList.toggle('displayBro')
	close.classList.toggle('displayBro')
	list.classList.toggle('displayBro')
	copyright.classList.toggle('displayBro')
	headerElement.classList.toggle('overlay2')
	bodyElement.classList.toggle('overlay2')
	mainSection.classList.toggle('lefty')
	bodySection.classList.toggle('lefty')
	// console.log(mainSection.classList)
}

//Close
function mobileClose() {
	hamburger.classList.toggle('displayBro')
	huge.classList.toggle('displayBro')
	close.classList.toggle('displayBro')
	list.classList.toggle('displayBro')
	copyright.classList.toggle('displayBro')
	headerElement.classList.toggle('overlay2')
	bodyElement.classList.toggle('overlay2')
	mainSection.classList.toggle('lefty')
	bodySection.classList.toggle('lefty')
}
// Closes sub-item list if user clicks anywhere outside of it
window.onclick = function(event) {
	if(!event.target.matches('.dropDownButton')) { // if user doesn't click on a section item
		// console.log("you got it!!!")
		var drops = document.getElementsByClassName("dropDown") // all sub-item div's
		
		for(k = 0; k < drops.length; k++) { // for loop running through sub-item div
			var openDropDown = drops[k]

			if(openDropDown.style.display === 'block') { // if sub-item div is showing
				openDropDown.style.display = 'none'
				openDropDown.previousSibling.classList.toggle('background')
				headerElement.classList.toggle('overlay')
				bodyElement.classList.toggle('overlay')
				openDropDown.previousSibling.lastChild.setAttribute('class', 'fa fa-chevron-down')
			}
		}
	}
}