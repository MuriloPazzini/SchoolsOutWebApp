//constants
const baseUrl = 'https://schools-out-backend.herokuapp.com';

//funcs
function initHomeBookCarousel() {
	$('#home-book-loading-section').show();
	$('#home-book-carousel').hide();

	var settings = {
		"url": baseUrl + "/api/comics/all",
		"method": "GET",
		"timeout": 0,
	};

	$.ajax(settings).done(function (response) {
		response.forEach(book => {
			$('#home-book-carousel').append('<a class="carousel-item" href="' + window.location.href + '/books/' + book._id + '"><img src="' + book.pages[0].image + '"></a>');
		});
		$('#home-book-loading-section').hide();
		$('#home-book-carousel').show();
		$('#home-book-carousel').carousel();
	});
}

function initHomeQuizCarousel() {
	$('#home-quiz-carousel').hide();
	$('#home-quiz-loading-section').show();


	var settings = {
		"url": baseUrl + "/api/quiz/all",
		"method": "GET",
		"timeout": 0,
	};

	$.ajax(settings).done(function (response) {
		let imageIndex = 1;

		response.forEach(quiz => {
			let quizDescription = '<p>Algumas perguntas desse quiz:<br></p>';

			quizDescription += '<p>' + quiz.questions[0].description + '</p>';
			quizDescription += '<p>' + quiz.questions[1].description + '</p>';
			quizDescription += '<p>' + quiz.questions[2].description + '</p>';

			var carouselItem = `
			<div class="carousel-item">
				<div class="card medium" style="overflow: hidden">
					<div class="card-image waves-effect waves-block waves-light">
						<img class="activator" src="images/gallary/` + imageIndex + `.png" alt="office">
            	    </div>
					<div class="card-content">
						<span class="card-title activator grey-text text-darken-4">` + quiz.name + `
            	            <i class="material-icons right">more_vert</i>
						</span>
						<p><a href="` + window.location.href + '/quiz/' + quiz._id + `">This is a link</a></p>
						</div>
					<div class="card-reveal" style="display: none; transform: translateY(0px);">
						<span class="card-title grey-text text-darken-4">` + quiz.name + `
            	    		<i class="material-icons right">close</i>
							</span>
							` + quizDescription + `
					</div>
				</div>
			</div>
			`;

			$('#home-quiz-carousel').append(carouselItem);
			imageIndex++;
		});
		$('#home-quiz-loading-section').hide();
		$('#home-quiz-carousel').show();
		$('#home-quiz-carousel').height(450).carousel();
	});
}

function checkAuthState() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			$.get(
				"https://schools-out-backend.herokuapp.com/api/user/getById/" + user.uid,
				{},
				function (data) {
					$('#user-avatar')[0].src = data.photoUrl;
					$('#user-name')[0].text = data.nickname;
				}
			);
		}
		else {
			// No user is signed in.
		}
	});
}

//events
$(document).ready(function () {
	initHomeBookCarousel();
	initHomeQuizCarousel();
});

