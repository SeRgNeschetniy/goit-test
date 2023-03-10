import users from './data/users.json';

const refs = {
  cardsList: document.querySelector('.cards-list'),
  cardBtnFollow: document.querySelector('.card-btn'),
};

let following = [];
let usersData = [];

function followerFormat(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function checkFollowing(id) {
  return following.includes(id) ? 'following' : 'follow';
}

const renderCards = () => {
  const followingLocal = JSON.parse(localStorage.getItem('following'));
  const usersLocal = JSON.parse(localStorage.getItem('users'));

  following = followingLocal ? followingLocal : [];
  usersData = usersLocal ? usersLocal : users;

  refs.cardsList.innerHTML = createUserList();
};

const createUserList = () => {
  return usersData
    .map(
      ({ id, user, tweets, followers, avatar }) =>
        `<li class="card" data-id=${id} data-state="follow">
            <div class="card-avatar">
                <div class="card-img">
                    <img src=${avatar}  alt="${user}" />
                </div>
            </div>
            <p class="card-tweets">${tweets} tweets</p>
            <p class="card-followers">${followerFormat(followers)} followers</p>
            <button type="button" class="card-btn" data-state=${checkFollowing(
              id
            )} data-id=${id}>${checkFollowing(id)}</button>
         </li>`
    )
    .join('');
};

const follow = e => {
  const target = e.target;
  if (target.classList.contains('card-btn')) {
    const id = Number(target.dataset.id);
    const user = usersData.find(el => el.id === id);

    if (following.includes(id)) {
      user.followers -= 1;
      following.splice(following.indexOf(id), 1);
    } else {
      user.followers += 1;
      following.push(id);
    }

    localStorage.setItem('users', JSON.stringify(usersData));
    localStorage.setItem('following', JSON.stringify(following));

    renderCards();
  }
};

document.body.addEventListener('click', follow);

renderCards();
