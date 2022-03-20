//API for https://www.themoviedb.org/

const apiKey = "api_key=7a48faa7ccbe7dd4be58ab1dc8cec0d0";
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgBase = "https://image.tmdb.org/t/p/w500";

const searchUrl = baseUrl + "/search/movie?" + apiKey;

getMovies(apiUrl);

const main = document.getElementById('main');

const input = document.getElementById('input');
const form = document.getElementById('form');

function getMovies(url) {
	fetch(url).then(res => res.json()).then(data => {
		console.log(data.results);
		showMovies(data.results);
	})
}

function showMovies(data) {

	main.innerHTML = '';

	data.forEach(movie => {

		const { title, poster_path, vote_average, popularity } = movie;
		const movieE1 = document.createElement('div');
		movieE1.classList.add('container');

		movieE1.innerHTML = `
		<div class="rating" style="background-color: ${getColor(vote_average)};" >${vote_average}</div>
         <div class="poster"><img src="${imgBase + poster_path}" alt=""></div>
         <div class="title">${title}</div>
         <div class="type">Popularity : ${popularity}</div>
		`
		main.appendChild(movieE1);
	})

}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const search = input.value;

	if (search) {
		getMovies(searchUrl + '&query=' + search);
	}
	else {
		getMovies(apiUrl);
	}

	search = " ";
});

function getColor(vote) {
	if (vote >= 8) {
		return 'greenyellow'
	} else if (vote >= 5) {
		return "orange"
	} else {
		return 'red'
	}
}