const previewContactSection = document.querySelector('.preview-contact');
const loader = document.querySelector('.loading-screen');
const nav = document.querySelector('.nav');
const container = document.querySelector('.container');
/* ##############  Main Buttons  ######################*/
const closeBtn = document.querySelector('.close')
const openNavBtn = document.querySelector('.add-contact-btn');
const addContactBtn = document.querySelector('.new');
const saveBtn = document.querySelector('.save');
const addBtn = document.querySelector('.add');
const editContactBtn = document.querySelector('.edit');
const deleteContactBtn = document.querySelector('.delete');
const search = document.querySelector('.search');
/* ##############  Inputs Display/Edit Contacts All Together  ######################*/
const allInputs = document.querySelectorAll('.edit-purpose');
const allInputsBottomOne = document.querySelectorAll('.bottom-one');
/* ##############  Inputs for Display/Edit Contacts One By One  ######################*/
const nameInput = document.querySelector('.name');
const mobileInput = document.querySelector('.mobile');
const emailInput = document.querySelector('.email');
const addressInput = document.querySelector('.address');
const noteInput = document.querySelector('.note');
/* ##############  Contacts  ######################*/
const contactList = document.querySelector('.contacts');
const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		loader.style.display = 'none';
		container.style.visibility = 'visible';
	},3000);
});
const renderContacts = (conts, list) => {
	/*  To Sort ContactList According to Alphabets */
	conts.sort((a, b) => {if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
		if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}});
	/*  Render Contacts */
	list.innerHTML = conts.map((cont,i) => {
		return `<li id=${i} class="contact">
	  		  <h3 id=${i}>${cont.name}</h3>
	  		  <p id=${i}>${cont.mobile}</p>
	  		</li>`
	}).join('');
	/*  For Preview of Contacts */
    const contactItems = document.querySelectorAll('.contact');
	contactItems.forEach(cntcs => {
	    cntcs.addEventListener('click',(e) => {
	    previewContactSection.classList.add('show-section');
	    displayContacts(e.target.id);
    });
  });
};
renderContacts(contacts,contactList);

const displayContacts = (e) => {
	nameInput.value = contacts[e].name;
	mobileInput.value = contacts[e].mobile;
	emailInput.value = contacts[e].email;
	addressInput.value = contacts[e].address;
	noteInput.value = contacts[e].note;
	saveBtn.id = e;
	deleteContactBtn.id = e;
}

const editContact = (e) => {
	allInputs.forEach((input) => {
		input.disabled = false;
	});
    saveBtn.classList.add('show-btn');
    editContactBtn.classList.add('hide-btn');
}

const saveContact = (e) => {
	allInputs.forEach((input) => {
		input.disabled = true;
	});
    saveBtn.classList.remove('show-btn');
    editContactBtn.classList.remove('hide-btn');
    const contacId = e.target.id;

    contacts[contacId].name = nameInput.value;
    contacts[contacId].mobile = mobileInput.value;
    contacts[contacId].email = emailInput.value;
    contacts[contacId].address = addressInput.value;
    contacts[contacId].note = noteInput.value;
    renderContacts(contacts,contactList);
}


const deleteContact = (e) => {
	contacts.splice(e.target.id, 1);
	localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts(contacts,contactList);
    previewContactSection.classList.remove('show-section');
}

const addContact = () => {
	const nameInputValue = document.querySelector('.new-name').value;
    const mobileInputValue = document.querySelector('.new-mobile').value;
    const emailInputValue = document.querySelector('.new-email').value;
    const addressInputValue = document.querySelector('.new-address').value;
    const noteInputValue = document.querySelector('.new-note').value;

    if (nameInput == '' || mobileInput == '') {
    	alert("Name and Mobile Cannot be Empty");
    } else {
        const newContact = {
    	    name: nameInputValue,
    	    mobile: mobileInputValue,
    	    email: emailInputValue,
    	    address: addressInputValue,
    	    note: noteInputValue
        }
        allInputsBottomOne.forEach((input) => {
		    input.value = '';
	    });
        contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts(contacts,contactList);
        nav.classList.remove('visible');
        addContactBtn.classList.toggle('fa-plus');
	    addContactBtn.classList.toggle('fa-angle-down');	
    }
}

addBtn.addEventListener('click', addContact);
editContactBtn.addEventListener('click', editContact);
saveBtn.addEventListener('click', saveContact);
deleteContactBtn.addEventListener('click', deleteContact);
/*##################  Search Function ####################*/
search.addEventListener('keyup', (e) => {
	let searchedWords = e.target.value.toLowerCase();
	if (searchedWords == "") { return } else {
	const filteredContacts = contacts.filter(contact => {
		return contact.name.toLowerCase().includes(searchedWords) 
		|| contact.mobile.toLowerCase().includes(searchedWords) 
		|| contact.email.toLowerCase().includes(searchedWords)
	});
	renderContacts(filteredContacts, contactList);
	}
});
/*############     Navs Open/Close     ############*/
closeBtn.addEventListener('click',() => {
	previewContactSection.classList.remove('show-section');
});
openNavBtn.addEventListener('click',() => {
	nav.classList.toggle('visible');
	addContactBtn.classList.toggle('fa-plus');
	addContactBtn.classList.toggle('fa-angle-down');
});