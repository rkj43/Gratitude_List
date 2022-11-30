window.addEventListener('load', () => {
	gratitudes = JSON.parse(localStorage.getItem('gratitudes')) || [];
	const nameInput = document.querySelector('#name');
	const newgratitudeForm = document.querySelector('#new-gratitude-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newgratitudeForm.addEventListener('submit', e => {
		e.preventDefault();

		const gratitude = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		gratitudes.push(gratitude);

		localStorage.setItem('gratitudes', JSON.stringify(gratitudes));

		// Reset the form
		e.target.reset();

		Displaygratitudes()
	})

	Displaygratitudes()
})

function Displaygratitudes () {
	const gratitudeList = document.querySelector('#gratitude-list');
	gratitudeList.innerHTML = "";

	gratitudes.forEach(gratitude => {
		const gratitudeItem = document.createElement('div');
		gratitudeItem.classList.add('gratitude-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = gratitude.done;
		span.classList.add('bubble');
		if (gratitude.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('work');
		}
		content.classList.add('gratitude-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${gratitude.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		gratitudeItem.appendChild(label);
		gratitudeItem.appendChild(content);
		gratitudeItem.appendChild(actions);

		gratitudeList.appendChild(gratitudeItem);

		if (gratitude.done) {
			gratitudeItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			gratitude.done = e.target.checked;
			localStorage.setItem('gratitudes', JSON.stringify(gratitudes));

			if (gratitude.done) {
				gratitudeItem.classList.add('done');
			} else {
				gratitudeItem.classList.remove('done');
			}

			Displaygratitudes()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				gratitude.content = e.target.value;
				localStorage.setItem('gratitudes', JSON.stringify(gratitudes));
				Displaygratitudes()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			gratitudes = gratitudes.filter(t => t != gratitude);
			localStorage.setItem('gratitudes', JSON.stringify(gratitudes));
			Displaygratitudes()
		})

	})
}