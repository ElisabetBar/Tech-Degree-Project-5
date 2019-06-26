let employees = [];


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function BuildAddress(employee) {
    var city = capitalize(employee.location.city);
    var state = capitalize(employee.location.state);
    let address = employee.location.street;
    address += ' ' + city + ', ' + state;
    address += ' ' + employee.location.postcode;
    return address;
}

function formatDOB(string) {
    var date = new Date(Date.parse(string.date));
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getYear();
    var dateOfBirth = month + '/' + day + '/' + year;
    return dateOfBirth;
}

function addEmployees(employees) {
	var directoryHTML = '';
	$.each( employees, function(i, employee) {
		var firstName = capitalize(employee.name.first);
		var lastName = capitalize(employee.name.last);
        var city = capitalize(employee.location.city);
        var email = employee.email;
		directoryHTML += '<div id=" '+ i + ' " class="card">';
		directoryHTML += '<img class="card-img" src=" ' + employee.picture.large + ' ">';
		directoryHTML += '<div class=card-info-container><h3 id="name" class="card-name cap">' + firstName + ' ' + lastName + '</h3>';
		directoryHTML += '<p class="card-text">' + email + '</p>';
		directoryHTML += '<p class="card-text cap">' + city + '</p></div></div>';
	});
	$('#gallery').html(directoryHTML);
}


function employeeClickEvent() {
    $('.card').click(function() {
        var id = $(this).attr('id');
        var idNumber = parseInt(id, 10);
        buildModal(idNumber);
    })
}

function buildModal(index) {
	let employee = employees[index];
	var firstName = capitalize(employee.name.first);
  	var lastName = capitalize(employee.name.last);
	let address = BuildAddress(employee);
	var dateOfBirth = formatDOB(employee.dob);
	let modalContainer = '<div class="modal-container">';
	modalContainer += '<div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn">X</button>';
	modalContainer += '<div class="modal-info-container"><img class="modal-img" src="' + employee.picture.large + ' ">';
	modalContainer += '<h3 id="name" class="modal-name cap">' + firstName + '  ' + lastName + '</h3>';
	modalContainer += '<p class="modal-text">' + employee.email + '</p>';
    modalContainer += '<p class="modal-text cap">' + employee.location.city + '</p>';
    modalContainer += '<hr><p class="modal-text">' + employee.cell.replace("-", " ") + '';
	modalContainer += '<p class="modal-text cap">' + address + '</p>';
	modalContainer += '<p class="modal-text">Birthday: ' + dateOfBirth + '</p></div>';
	modalContainer += '</div>';
	$('#employee-modal').append(modalContainer);
	$('.modal').css('display', 'block');
	onClose();
}

function onClose() {
	$('.modal-close-btn').click(function() {
		$('.modal').css('display', 'none');
		$('.modal-content').remove();
	})
}

$.ajax({
	url: 'https://randomuser.me/api/?results=12&nat=us',
	dataType: 'json',
	success: function(data) {
		employees = data.results;
		addEmployees(employees);
		employeeClickEvent();
	}
});